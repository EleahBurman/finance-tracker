"use client"

import { createContext, useState, useEffect } from "react";

//firebase imports
import { db } from "@/library/firebase";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

export const financeContext = createContext({
  income: [],
  expenses: [],
  addIncomeItem: async () =>{},
  removeIncomeItem: async () =>{},
  addExpenseItem: async () =>{},
  addCategory: async () =>{},
});

export default function FinanceContextProvider({children}){
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  
  const addCategory = async (category) =>{
    try {
      const collectionRef = collection(db, "expenses");
      const docSnap = await addDoc(collectionRef, {
        ...category,
        items:[],
      })
      setExpenses(prevExpenses =>{
        return [
          ...prevExpenses,
          {
            id: docSnap.id,
            ...category,
            items: [],
          }
        ]
      })
    } catch (error){
      throw error;
    }
  }
  const addExpenseItem= async (expenseCategoryId, newExpense)=>{
    const docRef = doc(db, "expenses", expenseCategoryId);
    try{
      await updateDoc(docRef, {...newExpense});
      //update state
      setExpenses(prevState =>{
        const updatedExpenses = [...prevState];
        const foundIndex = updatedExpenses.findIndex(expense=>{
          return expense.id === expenseCategoryId
        });

        updatedExpenses[foundIndex] = {id:expenseCategoryId, ...newExpense};
        return updatedExpenses;
      })
    }catch(error){
      console.error("Error updating document: ", error.message);
      throw error;
    }
  }
  const addIncomeItem = async (newIncome) => { 
    const collectionRef = collection(db, "income");
    
    try{
      const docSnap = await addDoc(collectionRef, newIncome)
      //update state
      setIncome((prevIncome) => {
        return [
          ...prevIncome,
          {
          id: docSnap.id,
          ...newIncome
          },
        ];
      });

    }catch(error){
      console.error("Error adding document: ", error.message)
      throw error
    }
  }
  const removeIncomeItem = async (incomeId) => {
    const docRef= doc(db, "income", incomeId);
    
    try{
      await deleteDoc(docRef);
      // Update the income state to remove the deleted item
      setIncome(prevIncome => prevIncome.filter(i => i.id !== incomeId));

    } catch(error){
      console.error("Error deleting document: ", error.message)
      throw error
    }
  }

  const values = { income, expenses, addIncomeItem, removeIncomeItem, addExpenseItem, addCategory}
  
  useEffect(() => {
    const getIncomeData = async () =>{
      const collectionRef= collection(db, "income")
      const docsSnap = await getDocs(collectionRef);
      const data = docsSnap.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        };
      });

      setIncome(data);
    };

    const getExpensesData = async () =>{
      const collectionRef = collection(db, "expenses")
      const docsSnap = await getDocs(collectionRef);
      
      const data = docsSnap.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        };
      });
      setExpenses(data);
    }
    getIncomeData();
    getExpensesData();
  }, []);

  return (<financeContext.Provider value={values}>{children}</financeContext.Provider>)
}
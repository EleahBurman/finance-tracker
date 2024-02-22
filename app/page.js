"use client"; // This is a client component 👈🏽

//import react
import { useState, useRef, useEffect } from "react";

//import components
import ExpenseItem from "@/components/ExpenseItem";
import Modal from "@/components/Modal";

//import utils
import { currencyFormatter } from "@/library/utils";

//firebase imports
import { db } from "@/library/firebase";
import { collection, addDoc, getDocs, toMillis } from "firebase/firestore";

const DUMMY_EXPENSES = [
  {
    id: 1,
    title: "Entertainment",
    color: "yellow",
    amount: 500,
  },
  {
    id: 2,
    title: "Groceries",
    color: "blue",
    amount: 1000,
  },
  {
    id: 3,
    title: "Travel",
    color: "green",
    amount: 5000,
  },
  {
    id: 4,
    title: "Clothes",
    color: "pink",
    amount: 300,
  }
]

export default function Home() {
  //use state variables
  const [income, setIncome] = useState([]);
  console.log("look here", income)
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  //use ref variables
  const amountRef = useRef();
  const descriptionRef = useRef();

  //handler functions
  const addIncomeHandler = async (e) => {
    e.preventDefault();
    const newIncome = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date()
    }
    const collectionRef = collection(db, "income");
    try{
      const docSnap = await addDoc(collectionRef, newIncome)
    }catch(error){
      console.error("Error adding document: ", error.message)
    }
    
  }

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
    getIncomeData();
  }, []);
  
  return (
    <>
      {/* Add Income Modal */}
      < Modal show={showAddIncomeModal} onClose={setShowAddIncomeModal}>
        <form 
          onSubmit={addIncomeHandler}
          className="input-group">
          <div className="input-group">
            <label htmlFor="amount">Income Amount</label>
            <input 
              type="number"
              name="amount"
              ref={amountRef}
              min={0.01} 
              step={0.01} 
              placeholder="Enter income amount" 
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="description">Description</label>
            <input 
              type="text" 
              name="description"
              ref={descriptionRef}
              placeholder="Enter income description" 
              required
            />
          </div>

          <button 
            type="submit"
            className="btn btn-primary"
          >Add entry</button>
        </form>

        <div className="flex flex-col gap-4 mt-6">
          <h3 className="text-2xl font-bold">Income History</h3>
        {income.map((i) => {
          return(
            <div className="flex item-center justify-between"key={i.id}>
              <div>
                <p className="font-semibold">{i.description}</p>
                <small className="text-xs">{i.createdAt.toISOString()}</small>
              </div>
              <p className="flex items-center gap-2">{currencyFormatter(i.amount)}</p>
            </div>
          )
        })}
        </div>
      </Modal>
      
      {/* Expenses */}
      <main className="container max-w-2xl px-6 mx-auto">
        <section className="py-3">
          <small className="text-gray-400 text-md">
            My Balance
          </small>
          <h2 className="text-4xl font-bold">
            { currencyFormatter(10000)}
          </h2>
        </section>
        <section className="flex items-center gap-2 py-3">
          <button className="btn btn-primary" >+ Expenses</button>
          <button 
            className="btn btn-primary-outline" 
            onClick={()=>{ setShowAddIncomeModal(true)}}>+ Income</button>
        </section>
        {/* Expense List */}
        <section className="py-6">
          <h3 className="text-2xl">My Expenses</h3>
          <div className="flex flex-col gap-4 mt-6">
            {DUMMY_EXPENSES.map((expense) => { return (
              <ExpenseItem
                key={expense.id}
                color={expense.color}
                title={expense.title}
                amount={expense.amount}
              />
            )
          })}
          </div>
        </section>
      </main>
    </>
  );
}

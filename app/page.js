"use client"; // This is a client component 👈🏽

//import react
import { useState } from "react";

//import components
import ExpenseItem from "@/components/ExpenseItem";


//import utils
import { currencyFormatter } from "@/library/utils";

//firebase imports
import { db } from "@/library/firebase";
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";

//icons
import{FaRegTrashAlt} from 'react-icons/fa'
import AddIncomeModal from "@/components/modals/AddIncomeModal";


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

  
  return (
    <>
      {/* Add Income Modal */}
      < AddIncomeModal 
        show={showAddIncomeModal} 
        onClose={setShowAddIncomeModal} 
        />
      
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

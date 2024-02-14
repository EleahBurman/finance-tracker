"use client"; // This is a client component 👈🏽

import { useState } from "react";

//import components
import ExpenseItem from "@/components/ExpenseItem";

//import utils
import { currencyFormatter } from "@/library/utils";

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
  const [modalIsOpen, setModalIsOpen] = useState(true);

  return (
    <>
      {/* Modal */}
      {modalIsOpen && (
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="container mx-auto max-w-2xl h-[80vh] rounded-3xl bg-slate-800 py-6 px-4">
            <button 
              className="w-10 h-10 mb-4 font-bold rounded-full bg-slate-600"
              onClick={()=>{ setModalIsOpen(false)}}>X</button>
            <h3>I am a modal</h3>
          </div>
        </div>
      )}
      
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
          <button className="btn btn-primary">+ Expenses</button>
          <button className="btn btn-primary-outline">+ Income</button>
        </section>
        {/* Expense List */}
        <section className="py-6">
          <h3 className="text-2xl">My Expenses</h3>
          <div className="flex flex-col gap-4 mt-6">
            {DUMMY_EXPENSES.map((expense) => { return (
              <ExpenseItem 
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

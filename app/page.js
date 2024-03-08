"use client"; // This is a client component 👈🏽

//import react
import { useState, useContext, useEffect } from "react";

//import components
import ExpenseItem from "@/components/ExpenseItem";

//import context
import { financeContext } from "@/library/store/finance-context";

//import utils
import { currencyFormatter } from "@/library/utils";

//icons
import AddIncomeModal from "@/components/modals/AddIncomeModal";

//chart
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  //use state variables
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [balance, setBalance] = useState(0);
  //use context
  const { expenses, income } = useContext(financeContext);
  
  useEffect(() => {
    const newBalance = 
    income.reduce((total,i)=>{
      return total + i.amount
    }, 0)-
    expenses.reduce((total, e)=>{
      return total + e.total
    }, 0);
    setBalance(newBalance);
  }, [income, expenses])
  ;
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
            { currencyFormatter(balance)}
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
            {expenses.map((expense) => { return (
              <ExpenseItem
                key={expense.id}
                color={expense.color}
                title={expense.title}
                total={expense.total}
              />
            )
          })}
          </div>
        </section>

        {/* Chart Section */}
        <section className="py-6">
          <h3 className="text-2xl">Stats</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut
              data={{
                labels: expenses.map((expense) => expense.title),
                datasets: [{
                  label: "Expenses",
                  data: expenses.map((expense) => expense.total),
                  backgroundColor: expenses.map((expense) => expense.color),
                  borderColor: ["#18181b"],
                  borderWidth: 5,
                }],
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}

//modal import
import Modal from '@/components/Modal'

//react imports
import { useState, useContext } from 'react';
import { financeContext } from '@/library/store/finance-context';

function AddExpensesModal({show, onClose}){
  const [expenseAmount, setExpenseAmount]= useState("");
  const [selectedCategory, setSelectedCategory]= useState(null);
  const { expenses } = useContext(financeContext);
  
  return(
    <Modal show={show} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <label>Enter an amount...</label>
        <input 
          type="number"
          min={0.01}
          step={0.01}
          placeholder="Enter expense amount"
          value={expenseAmount}
          onChange={(e)=>{setExpenseAmount(e.target.value)}}
          required
        />
      </div>

      {/* Add expense categories */}
      <div className="flex flex-col gap-4 mt-6">
        {expenses.map((expense)=>{ 
          return(
            <button
              key={expense.id}
              onClick={()=>{setSelectedCategory(expense.id)}}
            >
              <div style={{
                boxShadow: expense.id === selectedCategory ? "1px 1px 4px" : "none"
              }}className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl">
                <div className="flex items-center gap-2">
                  {/*Colored Circle*/}
                  <div 
                    className="w-[25px] h-[25px] rounded-full" 
                    style={{backgroundColor: expense.color}}
                  />
                  <h4 className="capitalize">{expense.title}</h4>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </Modal>
  );
}

export default AddExpensesModal
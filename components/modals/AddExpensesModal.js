//modal import
import Modal from '@/components/Modal'

//react imports
import { useState } from 'react';

function AddExpensesModal({show, onClose}){
  const [expenseAmount, setExpenseAmount]= useState("");
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
    </Modal>
  );
}

export default AddExpensesModal
//react imports
import { useRef, useEffect, useContext } from 'react';
import { currencyFormatter } from '@/library/utils';

import { financeContext } from '@/library/store/finance-context';

//component imports
import Modal from "@/components/Modal";

//icons
import{FaRegTrashAlt} from 'react-icons/fa'

function AddIncomeModal({show, onClose}){
  const amountRef = useRef();
  const descriptionRef = useRef();
  const {income, addIncomeItem, removeIncomeItem}= useContext(financeContext);

  //handler functions
  const addIncomeHandler = async (e) => {
    e.preventDefault();

    const newIncome = {
      amount: +amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date()
    }

    try {
      await addIncomeItem(newIncome)
      //reset form
      amountRef.current.value = "";
      descriptionRef.current.value = "";
    } catch (error) { 
      console.log("Error adding income: ", error.message)
    }

  }

  //delete income
  const deleteIncomeEntryHandler = async (incomeId) => {

    try {
      await removeIncomeItem(incomeId)
    } catch (error) {
      console.log("Error deleting income: ", error.message)
    }
  }

  return (
    < Modal 
      show={show} 
      onClose={onClose}
    >
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
          />
        </div>

        <div className="input-group">
          <label htmlFor="description">Description</label>
          <input 
            type="text" 
            name="description"
            ref={descriptionRef}
            placeholder="Enter income description" 
          />
        </div>

        <button 
          type="submit"
          className="btn btn-primary"
        >Add entry</button>
      </form>

      <div className="flex flex-col gap-4 mt-6">
        <h3 className="text-2xl font-bold">Income History</h3>
      {income && income.map((i) => {
        return(
          <div className="flex item-center justify-between"key={i.id}>
            <div>
              <p className="font-semibold">{i.description}</p>
              <small className="text-xs">{i.createdAt.toISOString()}</small>
            </div>
            <p className="flex items-center gap-2">
              {currencyFormatter(i.amount)}
              <button onClick={()=>{deleteIncomeEntryHandler(i.id)}}>
                <FaRegTrashAlt />
              </button>
            </p>
          </div>
        )
      })}
      </div>
    </Modal>
  )
}

export default AddIncomeModal;
//react imports
import { useRef, useEffect } from 'react';
import { currencyFormatter } from '@/library/utils';

//component imports
import Modal from "@/components/Modal";

//firebase imports
import { db } from "@/library/firebase";
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";

//icons
import{FaRegTrashAlt} from 'react-icons/fa'

function AddIncomeModal({show, onClose, income}){

  const amountRef = useRef();
  const descriptionRef = useRef();

  //handler functions
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
      //update state
      setIncome((prevIncome) => {
        return [...prevIncome,{
          id: docSnap.id,
          ...newIncome
        }]
      });

      //reset form
      amountRef.current.value = "";
      descriptionRef.current.value = "";
    }catch(error){
      console.error("Error adding document: ", error.message)
    }
    
  }

  //delete income
  const deleteIncomeEntryHandler = async (incomeId) => {
    const docRef= doc(db, "income", incomeId);
    
    try{
      await deleteDoc(docRef);
      // Update the income state to remove the deleted item
      setIncome(prevIncome => prevIncome.filter(i => i.id !== incomeId));

    } catch(error){
      console.error("Error deleting document: ", error.message)
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
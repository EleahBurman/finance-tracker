import Modal from '@/components/Modal'

function AddExpensesModal({show, onClose}){
  return(
    <Modal show={show} onClose={onClose}>
      <h3>Hello, I am an expense modal</h3>
    </Modal>
  );
}

export default AddExpensesModal
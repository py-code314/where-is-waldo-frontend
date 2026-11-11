/* ---------------------- Styles ---------------------------------- */
import styles from './GameCompleteModal.module.css'

const GameCompleteModal = ({modalRef}) => {
  return (<>
    <dialog className={styles.modal} ref={modalRef}>
    Game over
    </dialog>
  </>);
}
 
export default GameCompleteModal;
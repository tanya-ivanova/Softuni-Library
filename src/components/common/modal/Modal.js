import { useContext } from "react";
import { LanguageContext } from "../../../contexts/LanguageContext";
import {languages} from '../../../languages/languages';
import styles from './Modal.module.css';

const Modal = (props) => {
    const {language} = useContext(LanguageContext);

    return (
      <div className={styles.modal}>
        <p>{props.text}</p>
        <button onClick={props.onClose}>
            {languages.cancel[language]}
        </button>
        <button onClick={props.onConfirm}>
            {languages.confirm[language]}
        </button>
      </div>
    );
}
  
  export default Modal;
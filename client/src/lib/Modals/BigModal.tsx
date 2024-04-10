import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./Modal.module.scss";

type MODAL_PROPS = {
  children: any;
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
};

function BigModal(props: MODAL_PROPS) {
  // const [modalClasses, setModalClasses] = useState([
  //   styles.modalBg,
  // ]);

  // useEffect(() => {
  //   if (props.modal) {
  //     setModalClasses([...modalClasses, "flex-to-center", "active"]);
  //   } else {
  //     setModalClasses([...modalClasses.slice(0, 1)]);
  //   }
  // }, [props.modal]);

  return (
    <div
      className={props.modal ? [styles.modalBg, "active flex-to-center"].join(' ') : styles.modalBg}
      onClick={() => props.setModal(false)}
    >
      <div
        className={[styles.bigModal, "flex-to-center"].join(" ")}
        onClick={(e) => e.stopPropagation()}
      >
        {props.children}
      </div>
    </div>
  );
}

export default BigModal;

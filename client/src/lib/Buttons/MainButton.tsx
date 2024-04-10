import { ButtonHTMLAttributes } from "react";
import styles from "./Buttons.module.scss";

function MainButton(props: ButtonHTMLAttributes<T>) {
  return (
    <button {...props} className={[styles.default].join(" ")}>
      {props.children}
    </button>
  );
}

export default MainButton;

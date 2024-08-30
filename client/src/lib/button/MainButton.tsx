import { ButtonHTMLAttributes } from "react";

function MainButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button {...props} className={`main-button ${props.className}`}>
            {props.children}
        </button>
    );
}

export default MainButton;
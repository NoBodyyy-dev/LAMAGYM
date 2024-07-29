import { ButtonHTMLAttributes } from "react";

function MainButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button {...props} className="main-button">
            {props.children}
        </button>
    );
}

export default MainButton;
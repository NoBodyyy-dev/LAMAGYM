import {ButtonHTMLAttributes} from "react";

const SmallButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button {...props} className={`button__small ${props.className}`}></button>
    );
};

export default SmallButton;
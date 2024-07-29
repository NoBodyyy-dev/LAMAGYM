import {InputHTMLAttributes} from "react";

function MainInput(props: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className="main-input"
        />
    );
}

export default MainInput;
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/stateHooks.ts";
import {FieldData} from "../../store/types/userTypes"
import {loginFunc, signUpFunc} from "../../store/actions/userActions.ts"
import AuthField from "./AuthField.tsx";
import RegisterField from "./RegisterField.tsx";
import MainButton from "../../lib/button/MainButton.tsx";

export interface FieldRegisterData extends FieldData {
    confirmPassword: string
}

const Auth = () => {
    const dispatch = useAppDispatch();
    const {isLoading, curUser, isSuccess, error} = useAppSelector((state) => state.user);
    const navigate = useNavigate();

    const [isAuthField, setIsAuthField] = useState<boolean>(true)
    const [fieldAuthData, setFieldAuthData] = useState<FieldData>({
        username: "",
        email: "",
        password: ""
    })
    const [fieldRegisterData, setFieldRegisterData] = useState<FieldRegisterData>({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const signUpUser = () => {
        if (fieldRegisterData.confirmPassword === fieldRegisterData.password) {
            dispatch(signUpFunc({
                username: fieldRegisterData.username,
                email: fieldRegisterData.email,
                password: fieldRegisterData.password
            }))
        }
    }

    useEffect(() => {
        if (localStorage.getItem("token") && curUser?._id) navigate("/")
    }, [curUser?._id, localStorage.getItem("token")]);

    return (
        <div className="auth">
            {isAuthField
                ? <AuthField fieldData={fieldAuthData} setFieldData={setFieldAuthData}/>
                : <RegisterField fieldData={fieldRegisterData} setFieldData={setFieldRegisterData}/>}
            <div className="auth__change">
                <div className="auth__change__block">
                    <span className="auth__change-text">
                        {isAuthField ? "Нет аккаунта?" : "Есть аккаунт?"}
                    </span>
                    <span
                        className="auth__change-text underline"
                        onClick={() => setIsAuthField((param) => !param)}
                    >
                        {isAuthField ? "Зарегистрироваться" : "Войти"}
                    </span>
                </div>
            </div>
            <MainButton
                className="auth-submit"
                onClick={(e) => {
                    e.preventDefault()
                    dispatch(isAuthField ? loginFunc(fieldAuthData) : signUpUser)
                }}
            >{isAuthField ? "Войти" : "Зарегистрироваться"}</MainButton>
        </div>
    );
};

export default Auth;
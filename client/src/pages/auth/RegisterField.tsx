import {Dispatch, SetStateAction} from 'react';
import {FieldRegisterData} from "./Auth.tsx";
import MainInput from "../../lib/inputs/MainInput.tsx";
import {useInput} from "../../hooks/fieldHooks.ts";

type Props = {
    fieldData: FieldRegisterData,
    setFieldData: Dispatch<SetStateAction<FieldRegisterData>>
}

const RegisterField = (props: Props) => {
    return (
        <form className="auth__form">
            <MainInput
                type="text"
                value={props.fieldData.username}
                className="auth__form-input"
                placeholder="Введите имя"
                onChange={(e) =>
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    useInput(e, props.fieldData, props.setFieldData, "username")}
            />
            <MainInput
                type="text"
                value={props.fieldData.email}
                className="auth__form-input"
                placeholder="Введите почту"
                onChange={(e) =>
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    useInput(e, props.fieldData, props.setFieldData, "email")}
            />
            <MainInput
                type="password"
                value={props.fieldData.password}
                className="auth__form-input"
                placeholder="Введите пароль"
                onChange={(e) =>
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    useInput(e, props.fieldData, props.setFieldData, "password")}
            />
            <MainInput
                type="password"
                value={props.fieldData.confirmPassword}
                className="auth__form-input"
                placeholder="Подтвердите пароль"
                onChange={(e) =>
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    useInput(e, props.fieldData, props.setFieldData, "confirmPassword")}
            />
        </form>
    );
};

export default RegisterField;
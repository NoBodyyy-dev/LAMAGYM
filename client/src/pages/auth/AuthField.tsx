import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { FieldData } from "../../store/types/userTypes";
import MainInput from "../../lib/inputs/MainInput.tsx";
import { useInput } from "../../hooks/fieldHooks.ts";

type Props = {
  fieldData: FieldData;
  setFieldData: Dispatch<SetStateAction<FieldData>>;
};

const AuthField = (props: Props) => {
  const change = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = /[а-яА-Я&*()^%$#]/g;
    if (regex.test(e.target.value)) {
      props.setFieldData({
        ...props.fieldData,
        username: e.target.value,
      });
    }
  };

  return (
    <form className="auth__form">
      <MainInput
        type="text"
        value={props.fieldData.username}
        className="auth__form-input"
        placeholder="Введите имя"
        onChange={(e) => {
          const regex = /[а-яА-Я&*()^%$#]/g;
          if (!regex.test(e.target.value)) {
            props.setFieldData({
              ...props.fieldData,
              username: e.target.value,
            });
          }
        }}
      />
      <MainInput
        type="email"
        value={props.fieldData.email}
        className="auth__form-input"
        placeholder="Введите почту"
        onChange={(e) =>
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useInput(e, props.fieldData, props.setFieldData, "email")
        }
      />
      <MainInput
        type="password"
        value={props.fieldData.password}
        className="auth__form-input"
        placeholder="Введите пароль"
        onChange={(e) =>
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useInput(e, props.fieldData, props.setFieldData, "password")
        }
      />
    </form>
  );
};

export default AuthField;

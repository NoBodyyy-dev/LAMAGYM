import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { FieldRegisterData } from "./Auth.tsx";
import MainInput from "../../lib/inputs/MainInput.tsx";
import { useInput } from "../../hooks/fieldHooks.ts";
import uploadImage from "../../hooks/uploadImage.ts";

type Props = {
  fieldData: FieldRegisterData;
  setFieldData: Dispatch<SetStateAction<FieldRegisterData>>;
};

const RegisterField = (props: Props) => {
  const [uploadFile, setUploadFile] = useState("");

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const uploadPhoto = await uploadImage(file);
    setUploadFile(uploadPhoto);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    props.setFieldData((pr) => {
      return { ...pr, image: uploadPhoto.url };
    });
  };

  const clearUpload = (e) => {
    e.stopPropagation();
    e.preventDefault();
    props.setFieldData((pr) => {
      return { ...pr, image: "" };
    });
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
        type="text"
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
      <MainInput
        type="password"
        value={props.fieldData.confirmPassword}
        className="auth__form-input"
        placeholder="Подтвердите пароль"
        onChange={(e) =>
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useInput(e, props.fieldData, props.setFieldData, "confirmPassword")
        }
      />
      <label className="auth__form-file" htmlFor={"file-register"}>
        <p>
          {uploadFile.original_filename
            ? uploadFile.original_filename
            : "Загрузить фото"}
        </p>
        <input
          type="file"
          id="file-register"
          className="hide"
          accept="image/jpeg, image/png, image/jpg"
          onChange={handleUpload}
        />
      </label>
    </form>
  );
};

export default RegisterField;

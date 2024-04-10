import { Button, Checkbox, Form, Input } from "antd";
import { useAppDispatch } from "../../hooks/stateHooks";
import { loginFunc } from "../../store/users/userActions";
import { USER_LOGIN_DATA } from "../../store/users/USER_TYPES";
import "../../styles/auth.scss";

const AuthField = (props: {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();

  const onFinishAuth = (values: USER_LOGIN_DATA) => {
    dispatch(loginFunc(values));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinishAuth}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {" "}
        Авторизация
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
          <p onClick={() => props.setIsAuth((param) => !param)}>Регистрация</p>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AuthField;

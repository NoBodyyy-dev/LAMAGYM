import { Button, Checkbox, Form, Input } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/stateHooks";
import { loginFunc, signUpFunc } from "../../store/users/userActions";
import { USER_LOGIN_DATA } from "../../store/users/USER_TYPES";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth.scss";
import AuthField from "./AuthField";

function Auth() {
  const dispatch = useAppDispatch();
  const { isSuccess, error, curUser } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState(true);

  useEffect(() => {
    if (isSuccess && curUser && localStorage.getItem("token")) {
      navigate("/");
    }
  }, [isSuccess, error]);

  const onFinishAuth = (values: USER_LOGIN_DATA) => {
    dispatch(loginFunc(values));
  };

  const onFinishLogin = (values: USER_LOGIN_DATA) => {
    dispatch(signUpFunc(values));
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
    <div className="auth">
      kminchelle <br /> 0lelplR <br />
      <Link to="/">Вернуться обратно</Link>
      {isAuth ? (
        <AuthField setIsAuth={setIsAuth} />
      ) : (
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinishLogin}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {" "}
          Регистрация
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
            <p onClick={() => setIsAuth((param) => !param)}>Регистрация</p>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}

export default Auth;

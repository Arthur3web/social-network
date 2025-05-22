import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Form, Input, Button, Card, Typography, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { rootStore } from "../stores/RootStore";

const { Text, Link } = Typography;

const Login = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleLogin = async () => {
  //   try {
  //     await rootStore.authStore.login(email, password);
  //     // редирект на главную или другую страницу после логина
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Login failed", error);
  //   }
  // };

  return (
    <Row justify="center" align="middle">
      <Col>
        <Card
          title={
            <Text style={{ color: "#9333EA", fontSize: 24 }}>
              Authorization
            </Text>
          }
          style={{ width: 400 }}
        >
          <Form layout="vertical" /*onFinish={handleLogin}*/>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Row justify="space-between" align="middle">
                <Text>
                  Don't have an account?{" "}
                  <Link /*href={REGISTRATION_ROUTE}*/ style={{ color: "red" }}>
                    Register
                  </Link>
                </Text>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Row>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
});

export default Login;

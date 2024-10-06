import { Form, Input, Button, Row, Col, notification } from "antd";
import { useNavigate } from "react-router";
import { login } from "../../api.js";

export default function Login() {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const response = await login(values);
            console.log('Success:', response);
            notification.success({
                message: 'Logged in'
            });
            navigate("/");
        } catch (error) {
            console.error('Error:', error);
            notification.error({
                message: 'Wrong username or password'
            });
        }
    };

    return (
        <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
            <Col span={4}>
                <h1>Login</h1>
                <Form
                    name="basic"
                    layout="vertical"
                    initialValues={{ username: "", password: "" }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                    <Row justify="space-between">
                        <Col>
                            <Button type="primary" htmlType="submit">Login</Button>
                        </Col>
                        <Col>
                            <Button type="primary" onClick={() => navigate("/register")} >Register</Button>
                        </Col>
                    </Row>
                </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}
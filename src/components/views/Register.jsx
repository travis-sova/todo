import { Form, Input, Button, Row, Col, notification } from "antd";
import { useNavigate } from "react-router";
import { register } from "../../api.js"; // Assuming you have a register function in your API

export default function Register() {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const response = await register(values); // Call the register function
            console.log('Success:', response);
            notification.success({
                message: 'Registered successfully'
            });
            navigate("/"); // Navigate to login page after successful registration
        } catch (error) {
            console.error('Error:', error);
            notification.error({
                message: 'Registration failed'
            });
        }
    };

    return (
        <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }}>
            <Col span={4}>
                <h1>Register</h1>
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
                        label="First name"
                        name="firstname"
                        rules={[{ required: true, message: 'Please input your first name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Last name"
                        name="lastname"
                        rules={[{ required: true, message: 'Please input your last name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="newPassword"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Register</Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}
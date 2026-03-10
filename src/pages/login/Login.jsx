import { useState } from "react";
import { Form, Input, Button, Card, Typography, Space, message } from "antd";
import { UserOutlined, LockOutlined, BankOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services";
import "./style.css";

const { Title, Text } = Typography;

export const LoginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            console.log('Attempting login with:', values.email);
            const response = await authService.login(values.email, values.password);
            console.log('Login response:', response);

            if (response && response.token) {
                message.success('Login successful!');
                setTimeout(() => {
                    navigate("/");
                }, 100);
            } else {
                console.error('No token in response:', response);
                message.error('Invalid response from server');
            }
        } catch (error) {
            console.error('Login error:', error);
            const errorMsg = error.response?.data?.error || error.message || 'Login failed';
            message.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-background"></div>
            <Card className="login-card">
                <Space direction="vertical" size="large" style={{ width: "100%", textAlign: "center" }}>
                    <div className="login-logo">
                        <div className="login-logo-icon">
                            <BankOutlined style={{ fontSize: 40, color: "white" }} />
                        </div>
                        <Title level={2} style={{ marginTop: 16, marginBottom: 0 }}>
                            Jinka City Administration
                        </Title>
                        <Text type="secondary">ጅንካ ከተማ አስተዳደር</Text>
                    </div>

                    <div>
                        <Title level={4}>Admin Panel Login</Title>
                        <Text type="secondary">Enter your credentials to access the system</Text>
                    </div>

                    <Form
                        name="login"
                        onFinish={onFinish}
                        layout="vertical"
                        size="large"
                        style={{ textAlign: "left" }}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your email!",
                                },
                                {
                                    type: "email",
                                    message: "Please enter a valid email!",
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="Email"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block loading={loading}>
                                Sign In
                            </Button>
                        </Form.Item>

                        <div style={{ textAlign: "center" }}>
                            <a href="#" style={{ color: "#1e5a8e" }}>
                                Forgot password?
                            </a>
                        </div>
                    </Form>

                    <div className="login-footer">
                        <Text type="secondary" style={{ fontSize: 12 }}>
                            © 2026 Jinka City Administration. All rights reserved.
                        </Text>
                    </div>
                </Space>
            </Card>
        </div>
    );
};

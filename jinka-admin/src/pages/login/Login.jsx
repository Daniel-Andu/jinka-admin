import React from "react";
import { Form, Input, Button, Card, Typography, Space } from "antd";
import { UserOutlined, LockOutlined, BankOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./style.css";

const { Title, Text } = Typography;

export const LoginPage = () => {
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log("Login:", values);
        // Here you would normally call your API
        // For now, just navigate to dashboard
        navigate("/");
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
                            <Button type="primary" htmlType="submit" block>
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

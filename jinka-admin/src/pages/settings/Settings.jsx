import React from "react";
import { Card, Form, Input, Button, Switch, Select, Space, Divider } from "antd";
import {
    UserOutlined,
    LockOutlined,
    BellOutlined,
    GlobalOutlined,
    SaveOutlined,
} from "@ant-design/icons";

export const SettingsPage = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log("Settings saved:", values);
    };

    return (
        <div>
            <div className="page-header">
                <h1>Settings</h1>
            </div>

            <Card bordered={false} style={{ borderRadius: 12, marginBottom: 24 }}>
                <h3 style={{ marginBottom: 16 }}>
                    <UserOutlined /> Profile Settings
                </h3>
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Full Name" name="fullName" initialValue="Admin User">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email" initialValue="admin@jinka.gov.et">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Phone" name="phone" initialValue="+251-467-775-XXXX">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Department" name="department" initialValue="administration">
                        <Select>
                            <Select.Option value="administration">Administration</Select.Option>
                            <Select.Option value="civil">Civil Registry</Select.Option>
                            <Select.Option value="planning">Urban Planning</Select.Option>
                            <Select.Option value="health">Health Services</Select.Option>
                            <Select.Option value="finance">Finance</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Card>

            <Card bordered={false} style={{ borderRadius: 12, marginBottom: 24 }}>
                <h3 style={{ marginBottom: 16 }}>
                    <LockOutlined /> Security Settings
                </h3>
                <Form layout="vertical">
                    <Form.Item label="Current Password" name="currentPassword">
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label="New Password" name="newPassword">
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label="Confirm New Password" name="confirmPassword">
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary">Change Password</Button>
                    </Form.Item>
                </Form>
            </Card>

            <Card bordered={false} style={{ borderRadius: 12, marginBottom: 24 }}>
                <h3 style={{ marginBottom: 16 }}>
                    <BellOutlined /> Notification Settings
                </h3>
                <Space direction="vertical" style={{ width: "100%" }} size="large">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                            <div style={{ fontWeight: 500 }}>Email Notifications</div>
                            <div style={{ fontSize: 13, color: "#6b7280" }}>
                                Receive email notifications for important updates
                            </div>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                            <div style={{ fontWeight: 500 }}>Push Notifications</div>
                            <div style={{ fontSize: 13, color: "#6b7280" }}>
                                Receive push notifications in your browser
                            </div>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                            <div style={{ fontWeight: 500 }}>SMS Notifications</div>
                            <div style={{ fontSize: 13, color: "#6b7280" }}>
                                Receive SMS for critical alerts
                            </div>
                        </div>
                        <Switch />
                    </div>
                </Space>
            </Card>

            <Card bordered={false} style={{ borderRadius: 12, marginBottom: 24 }}>
                <h3 style={{ marginBottom: 16 }}>
                    <GlobalOutlined /> System Settings
                </h3>
                <Form layout="vertical">
                    <Form.Item label="Language" name="language" initialValue="en">
                        <Select>
                            <Select.Option value="en">English</Select.Option>
                            <Select.Option value="am">አማርኛ (Amharic)</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Timezone" name="timezone" initialValue="africa/addis_ababa">
                        <Select>
                            <Select.Option value="africa/addis_ababa">
                                Africa/Addis Ababa (EAT)
                            </Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Date Format" name="dateFormat" initialValue="DD/MM/YYYY">
                        <Select>
                            <Select.Option value="DD/MM/YYYY">DD/MM/YYYY</Select.Option>
                            <Select.Option value="MM/DD/YYYY">MM/DD/YYYY</Select.Option>
                            <Select.Option value="YYYY-MM-DD">YYYY-MM-DD</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Card>

            <div style={{ textAlign: "right" }}>
                <Space>
                    <Button>Cancel</Button>
                    <Button type="primary" icon={<SaveOutlined />}>
                        Save All Changes
                    </Button>
                </Space>
            </div>
        </div>
    );
};

import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button, Switch, Select, Space, Avatar, Upload, message } from "antd";
import {
    UserOutlined,
    LockOutlined,
    BellOutlined,
    GlobalOutlined,
    SaveOutlined,
    CameraOutlined,
} from "@ant-design/icons";

export const SettingsPage = () => {
    const [form] = Form.useForm();
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        // Load profile image from localStorage
        const savedImage = localStorage.getItem('profileImage');
        if (savedImage) {
            setProfileImage(savedImage);
        }
    }, []);

    const onFinish = (values) => {
        console.log("Settings saved:", values);
        message.success("Settings saved successfully!");
    };

    const handleImageUpload = (info) => {
        if (info.file.status === 'done' || info.file) {
            // Get the file and create a preview URL
            const file = info.file.originFileObj || info.file;
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageData = e.target.result;
                setProfileImage(imageData);
                // Save to localStorage so it persists
                localStorage.setItem('profileImage', imageData);
                message.success("Profile photo updated!");
                // Trigger a custom event to update header
                window.dispatchEvent(new Event('profileImageUpdated'));
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadProps = {
        beforeUpload: (file) => {
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
                message.error('You can only upload image files!');
                return false;
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('Image must be smaller than 2MB!');
                return false;
            }
            return false; // Prevent auto upload
        },
        onChange: handleImageUpload,
        showUploadList: false,
    };

    return (
        <div>
            <div className="page-header">
                <h1>Settings</h1>
            </div>

            <Card bordered={false} style={{ borderRadius: 12, marginBottom: 24 }}>
                <h3 style={{ marginBottom: 24 }}>
                    <UserOutlined /> Profile Settings
                </h3>

                {/* Profile Photo Section */}
                <div style={{ display: "flex", alignItems: "center", marginBottom: 32, gap: 24 }}>
                    <Avatar
                        size={120}
                        src={profileImage}
                        icon={!profileImage && <UserOutlined />}
                        style={{
                            backgroundColor: profileImage ? "transparent" : "#1e5a8e",
                            border: "4px solid #e5e7eb"
                        }}
                    />
                    <div>
                        <div style={{ marginBottom: 8, fontWeight: 500 }}>Profile Photo</div>
                        <div style={{ marginBottom: 12, fontSize: 13, color: "#6b7280" }}>
                            Upload a new profile photo (Max 2MB, JPG/PNG)
                        </div>
                        <Upload {...uploadProps}>
                            <Button icon={<CameraOutlined />}>
                                Change Photo
                            </Button>
                        </Upload>
                    </div>
                </div>

                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Full Name" name="fullName" initialValue="Admin User">
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item label="Email" name="email" initialValue="admin@jinka.gov.et">
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item label="Phone" name="phone" initialValue="+251-467-775-XXXX">
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item label="Department" name="department" initialValue="administration">
                        <Select size="large">
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
                        <Input.Password size="large" />
                    </Form.Item>
                    <Form.Item label="New Password" name="newPassword">
                        <Input.Password size="large" />
                    </Form.Item>
                    <Form.Item label="Confirm New Password" name="confirmPassword">
                        <Input.Password size="large" />
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
                        <Select size="large">
                            <Select.Option value="en">English</Select.Option>
                            <Select.Option value="am">አማርኛ (Amharic)</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Timezone" name="timezone" initialValue="africa/addis_ababa">
                        <Select size="large">
                            <Select.Option value="africa/addis_ababa">
                                Africa/Addis Ababa (EAT)
                            </Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Date Format" name="dateFormat" initialValue="DD/MM/YYYY">
                        <Select size="large">
                            <Select.Option value="DD/MM/YYYY">DD/MM/YYYY</Select.Option>
                            <Select.Option value="MM/DD/YYYY">MM/DD/YYYY</Select.Option>
                            <Select.Option value="YYYY-MM-DD">YYYY-MM-DD</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Card>

            <div style={{ textAlign: "right" }}>
                <Space>
                    <Button size="large">Cancel</Button>
                    <Button type="primary" icon={<SaveOutlined />} size="large" onClick={() => form.submit()}>
                        Save All Changes
                    </Button>
                </Space>
            </div>
        </div>
    );
};

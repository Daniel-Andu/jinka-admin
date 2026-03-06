import React from "react";
import { List, Avatar, Badge, Card, Input, Button, Space } from "antd";
import {
    UserOutlined,
    SearchOutlined,
    SendOutlined,
} from "@ant-design/icons";

export const MessageList = () => {
    const messages = [
        {
            id: 1,
            sender: "Abebe Kebede",
            subject: "Building Permit Inquiry",
            preview: "I would like to inquire about the status of my building permit application...",
            time: "10 minutes ago",
            unread: true,
        },
        {
            id: 2,
            sender: "Tigist Haile",
            subject: "Health Certificate Request",
            preview: "Could you please provide information about obtaining a health certificate...",
            time: "1 hour ago",
            unread: true,
        },
        {
            id: 3,
            sender: "Dawit Tesfaye",
            subject: "Tax Payment Confirmation",
            preview: "I have completed my tax payment and would like to receive confirmation...",
            time: "3 hours ago",
            unread: false,
        },
        {
            id: 4,
            sender: "Almaz Tadesse",
            subject: "Event Registration",
            preview: "I am interested in registering for the upcoming city council meeting...",
            time: "Yesterday",
            unread: false,
        },
    ];

    return (
        <div>
            <div className="page-header">
                <h1>Messages</h1>
            </div>

            <Card bordered={false} style={{ borderRadius: 12 }}>
                <Input
                    placeholder="Search messages..."
                    prefix={<SearchOutlined />}
                    style={{ marginBottom: 16 }}
                />

                <List
                    itemLayout="horizontal"
                    dataSource={messages}
                    renderItem={(item) => (
                        <List.Item
                            style={{
                                background: item.unread ? "#f0f9ff" : "white",
                                padding: "16px",
                                borderRadius: 8,
                                marginBottom: 8,
                                cursor: "pointer",
                            }}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Badge dot={item.unread}>
                                        <Avatar icon={<UserOutlined />} size={48} />
                                    </Badge>
                                }
                                title={
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span style={{ fontWeight: item.unread ? 600 : 400 }}>
                                            {item.sender}
                                        </span>
                                        <span style={{ fontSize: 12, color: "#6b7280" }}>
                                            {item.time}
                                        </span>
                                    </div>
                                }
                                description={
                                    <div>
                                        <div style={{ fontWeight: item.unread ? 600 : 400, marginBottom: 4 }}>
                                            {item.subject}
                                        </div>
                                        <div style={{ color: "#6b7280" }}>{item.preview}</div>
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    );
};

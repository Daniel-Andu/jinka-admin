import React, { useState } from "react";
import { List, Avatar, Badge, Card, Input, Modal, Typography } from "antd";
import {
    UserOutlined,
    SearchOutlined,
    CloseOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

export const MessageList = () => {
    const [searchText, setSearchText] = useState("");
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const messages = [
        {
            id: 1,
            sender: "Abebe Kebede",
            subject: "Building Permit Inquiry",
            preview: "I would like to inquire about the status of my building permit application...",
            fullMessage: "Dear Admin,\n\nI would like to inquire about the status of my building permit application submitted on February 15, 2026. The application reference number is BP-2026-0234.\n\nI have completed all the required documentation and paid the necessary fees. Could you please provide an update on when I can expect the permit to be approved?\n\nThank you for your assistance.\n\nBest regards,\nAbebe Kebede",
            time: "10 minutes ago",
            unread: true,
        },
        {
            id: 2,
            sender: "Tigist Haile",
            subject: "Health Certificate Request",
            preview: "Could you please provide information about obtaining a health certificate...",
            fullMessage: "Hello,\n\nCould you please provide information about obtaining a health certificate for my restaurant business? I need to know:\n\n1. Required documents\n2. Processing time\n3. Fees involved\n4. Where to submit the application\n\nI would appreciate a prompt response as I need to complete this process soon.\n\nThank you,\nTigist Haile",
            time: "1 hour ago",
            unread: true,
        },
        {
            id: 3,
            sender: "Dawit Tesfaye",
            subject: "Tax Payment Confirmation",
            preview: "I have completed my tax payment and would like to receive confirmation...",
            fullMessage: "Dear Tax Department,\n\nI have completed my annual business tax payment on March 5, 2026. The transaction reference is TX-2026-5678.\n\nPlease send me an official confirmation receipt for my records.\n\nThank you,\nDawit Tesfaye",
            time: "3 hours ago",
            unread: false,
        },
        {
            id: 4,
            sender: "Almaz Tadesse",
            subject: "Event Registration",
            preview: "I am interested in registering for the upcoming city council meeting...",
            fullMessage: "Good day,\n\nI am interested in registering for the upcoming city council meeting scheduled for March 15, 2026. As a local business owner, I would like to participate in the discussion about the new business development zones.\n\nPlease let me know the registration process.\n\nRegards,\nAlmaz Tadesse",
            time: "Yesterday",
            unread: false,
        },
    ];

    const filteredMessages = messages.filter(msg =>
        msg.sender.toLowerCase().includes(searchText.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchText.toLowerCase()) ||
        msg.preview.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleMessageClick = (message) => {
        setSelectedMessage(message);
        setIsDetailOpen(true);
    };

    const handleCloseDetail = () => {
        setIsDetailOpen(false);
        setSelectedMessage(null);
    };

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
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    allowClear
                />

                <List
                    itemLayout="horizontal"
                    dataSource={filteredMessages}
                    renderItem={(item) => (
                        <List.Item
                            style={{
                                background: item.unread ? "#f0f9ff" : "white",
                                padding: "16px",
                                borderRadius: 8,
                                marginBottom: 8,
                                cursor: "pointer",
                            }}
                            onClick={() => handleMessageClick(item)}
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

            <Modal
                title={null}
                open={isDetailOpen}
                onCancel={handleCloseDetail}
                footer={null}
                width={700}
                closeIcon={<CloseOutlined />}
            >
                {selectedMessage && (
                    <div>
                        <div style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: 16, marginBottom: 16 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                                <Avatar icon={<UserOutlined />} size={48} />
                                <div style={{ flex: 1 }}>
                                    <Title level={5} style={{ margin: 0 }}>{selectedMessage.sender}</Title>
                                    <Text type="secondary" style={{ fontSize: 12 }}>{selectedMessage.time}</Text>
                                </div>
                            </div>
                            <Title level={4} style={{ margin: 0 }}>{selectedMessage.subject}</Title>
                        </div>

                        <div style={{ marginBottom: 24, whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
                            {selectedMessage.fullMessage}
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

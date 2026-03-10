import { useState, useEffect } from "react";
import { List, Avatar, Card, Input, Modal, Typography, message as antMessage, Spin, Button, Space, Popconfirm } from "antd";
import {
    UserOutlined,
    SearchOutlined,
    CloseOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { messageService } from "../../services";

const { Text, Title } = Typography;

export const MessageList = () => {
    const [searchText, setSearchText] = useState("");
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch messages from backend
    const fetchMessages = async () => {
        setLoading(true);
        try {
            const response = await messageService.getAll();
            console.log('Messages from backend:', response);
            setMessages(response.data || response || []);
            antMessage.success('Messages loaded from database');
        } catch (error) {
            console.error('Error fetching messages:', error);
            antMessage.error('Failed to load messages from backend');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    // Delete message
    const handleDelete = async (id) => {
        try {
            await messageService.delete(id);
            antMessage.success('Message deleted successfully');
            fetchMessages();
        } catch (error) {
            console.error('Error deleting message:', error);
            antMessage.error('Failed to delete message');
        }
    };

    const filteredMessages = messages.filter(msg =>
        (msg.name || '').toLowerCase().includes(searchText.toLowerCase()) ||
        (msg.email || '').toLowerCase().includes(searchText.toLowerCase()) ||
        (msg.subject || '').toLowerCase().includes(searchText.toLowerCase()) ||
        (msg.message || '').toLowerCase().includes(searchText.toLowerCase())
    );

    const handleMessageClick = (message) => {
        setSelectedMessage(message);
        setIsDetailOpen(true);
    };

    const handleCloseDetail = () => {
        setIsDetailOpen(false);
        setSelectedMessage(null);
    };

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div>
            <div className="page-header">
                <h1>Messages</h1>
                <p style={{ color: '#666', marginTop: 8 }}>
                    {loading ? 'Loading...' : messages.length === 0
                        ? 'No messages yet. Messages will appear here when customers submit the contact form.'
                        : `Connected to backend database (${messages.length} messages)`}
                </p>
            </div>

            <Card style={{ borderRadius: 12 }}>
                <Input
                    placeholder="Search messages..."
                    prefix={<SearchOutlined />}
                    style={{ marginBottom: 16 }}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    allowClear
                />

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <Spin size="large" />
                    </div>
                ) : filteredMessages.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                        No messages found
                    </div>
                ) : (
                    <List
                        itemLayout="horizontal"
                        dataSource={filteredMessages}
                        renderItem={(item) => (
                            <List.Item
                                style={{
                                    background: "white",
                                    padding: "16px",
                                    borderRadius: 8,
                                    marginBottom: 8,
                                    cursor: "pointer",
                                    border: "1px solid #f0f0f0",
                                }}
                                onClick={() => handleMessageClick(item)}
                                actions={[
                                    <Popconfirm
                                        title="Delete this message?"
                                        description="This action cannot be undone."
                                        onConfirm={(e) => {
                                            e.stopPropagation();
                                            handleDelete(item.id);
                                        }}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button
                                            type="text"
                                            danger
                                            icon={<DeleteOutlined />}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </Popconfirm>
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Avatar icon={<UserOutlined />} size={48} />
                                    }
                                    title={
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <span style={{ fontWeight: 500 }}>
                                                {item.name}
                                            </span>
                                            <span style={{ fontSize: 12, color: "#6b7280" }}>
                                                {formatDate(item.created_at)}
                                            </span>
                                        </div>
                                    }
                                    description={
                                        <div>
                                            <div style={{ marginBottom: 4, color: "#1e5a8e" }}>
                                                {item.email}
                                            </div>
                                            <div style={{ fontWeight: 500, marginBottom: 4 }}>
                                                {item.subject || 'No Subject'}
                                            </div>
                                            <div style={{ color: "#6b7280" }}>
                                                {item.message ? item.message.substring(0, 100) + (item.message.length > 100 ? '...' : '') : ''}
                                            </div>
                                        </div>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                )}
            </Card>

            <Modal
                title={null}
                open={isDetailOpen}
                onCancel={handleCloseDetail}
                footer={[
                    <Space key="actions">
                        <Popconfirm
                            title="Delete this message?"
                            description="This action cannot be undone."
                            onConfirm={() => {
                                handleDelete(selectedMessage.id);
                                handleCloseDetail();
                            }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger icon={<DeleteOutlined />}>
                                Delete
                            </Button>
                        </Popconfirm>
                        <Button onClick={handleCloseDetail}>
                            Close
                        </Button>
                    </Space>
                ]}
                width={700}
                closeIcon={<CloseOutlined />}
            >
                {selectedMessage && (
                    <div>
                        <div style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: 16, marginBottom: 16 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                                <Avatar icon={<UserOutlined />} size={48} />
                                <div style={{ flex: 1 }}>
                                    <Title level={5} style={{ margin: 0 }}>{selectedMessage.name}</Title>
                                    <Text type="secondary" style={{ fontSize: 12 }}>{selectedMessage.email}</Text>
                                    <br />
                                    <Text type="secondary" style={{ fontSize: 12 }}>{formatDate(selectedMessage.created_at)}</Text>
                                </div>
                            </div>
                            <Title level={4} style={{ margin: 0 }}>{selectedMessage.subject || 'No Subject'}</Title>
                        </div>

                        <div style={{ marginBottom: 24, whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
                            {selectedMessage.message}
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

import { useState, useEffect } from "react";
import { Table, Space, Button, Input, Card, message, Popconfirm, Modal, Form } from "antd";
import {
    DeleteOutlined,
    SearchOutlined,
    MailOutlined,
    SendOutlined,
} from "@ant-design/icons";
import { newsletterService, subscribersService } from "../../services";

export const SubscribersList = () => {
    const [searchText, setSearchText] = useState("");
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [newsletterOpen, setNewsletterOpen] = useState(false);
    const [newsletterForm] = Form.useForm();

    const fetchSubscribers = async () => {
        setLoading(true);
        try {
            const response = await subscribersService.getAll();
            console.log('Subscribers from backend:', response);
            setSubscribers(response.data || response || []);
            message.success('Subscribers loaded from database');
        } catch (error) {
            console.error('Error fetching subscribers:', error);
            message.error('Failed to load subscribers');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await subscribersService.delete(id);
            message.success('Subscriber deleted successfully');
            fetchSubscribers();
        } catch (error) {
            console.error('Error deleting subscriber:', error);
            message.error('Failed to delete subscriber');
        }
    };

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

    const columns = [
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            render: (email) => (
                <Space>
                    <MailOutlined style={{ color: '#2E8B57' }} />
                    <span>{email}</span>
                </Space>
            ),
        },
        {
            title: "Subscribed Date",
            dataIndex: "created_at",
            key: "created_at",
            render: (date) => formatDate(date),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Popconfirm
                    title="Delete this subscriber?"
                    description="This action cannot be undone."
                    onConfirm={() => handleDelete(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                    />
                </Popconfirm>
            ),
        },
    ];

    const filteredData = subscribers.filter(item =>
        (item.email || '').toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div>
            <div className="page-header">
                <h1>Newsletter Subscribers</h1>
                <p style={{ color: '#666', marginTop: 8 }}>
                    {loading ? 'Loading...' : subscribers.length === 0
                        ? 'No subscribers yet. Subscribers will appear when users sign up for the newsletter.'
                        : `Manage newsletter subscribers (${subscribers.length} subscribers)`}
                </p>
            </div>

            <Card style={{ borderRadius: 12 }}>
                <Space style={{ marginBottom: 16, width: "100%", justifyContent: "space-between" }}>
                    <Input
                        placeholder="Search subscribers..."
                        prefix={<SearchOutlined />}
                        style={{ width: 300 }}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        allowClear
                    />
                    <Button
                        type="primary"
                        icon={<SendOutlined />}
                        onClick={() => setNewsletterOpen(true)}
                        disabled={loading}
                    >
                        Send Newsletter
                    </Button>
                </Space>

                {filteredData.length === 0 && !loading ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                        No subscribers found
                    </div>
                ) : (
                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        rowKey="id"
                        loading={loading}
                        scroll={{ x: true }}
                        pagination={{
                            pageSize: 10,
                            showTotal: (total) => `Total ${total} subscribers`,
                        }}
                    />
                )}
            </Card>

            <Modal
                title="Send Newsletter"
                open={newsletterOpen}
                onCancel={() => {
                    setNewsletterOpen(false);
                    newsletterForm.resetFields();
                }}
                okText="Send"
                confirmLoading={sending}
                onOk={async () => {
                    try {
                        const values = await newsletterForm.validateFields();
                        setSending(true);
                        const resp = await newsletterService.send({
                            subject: values.subject,
                            message: values.message,
                            testEmail: values.testEmail || undefined,
                        });
                        const sent = resp?.sent ?? resp?.data?.sent;
                        message.success(`Newsletter sent${sent ? ` (${sent} recipients)` : ""}`);
                        setNewsletterOpen(false);
                        newsletterForm.resetFields();
                    } catch (err) {
                        if (err?.errorFields) return;
                        const msg = err?.response?.data?.error || err?.message || "Failed to send newsletter";
                        message.error(msg);
                    } finally {
                        setSending(false);
                    }
                }}
                width={720}
            >
                <Form form={newsletterForm} layout="vertical">
                    <Form.Item
                        label="Subject"
                        name="subject"
                        rules={[{ required: true, message: "Please enter an email subject" }]}
                    >
                        <Input placeholder="Newsletter subject" />
                    </Form.Item>
                    <Form.Item
                        label="Message"
                        name="message"
                        rules={[{ required: true, message: "Please enter a message" }]}
                    >
                        <Input.TextArea rows={6} placeholder="Write your newsletter message..." />
                    </Form.Item>
                    <Form.Item
                        label="Send test email (optional)"
                        name="testEmail"
                        rules={[
                            { type: "email", message: "Please enter a valid email address" },
                        ]}
                    >
                        <Input placeholder="example@gmail.com (sends only to this email)" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

import { useState, useEffect } from "react";
import { Table, Space, Button, Input, Card, message, Popconfirm } from "antd";
import {
    DeleteOutlined,
    SearchOutlined,
    MailOutlined,
} from "@ant-design/icons";
import { subscribersService } from "../../services";

export const SubscribersList = () => {
    const [searchText, setSearchText] = useState("");
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(false);

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
                    <MailOutlined style={{ color: '#1e5a8e' }} />
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
                        pagination={{
                            pageSize: 10,
                            showTotal: (total) => `Total ${total} subscribers`,
                        }}
                    />
                )}
            </Card>
        </div>
    );
};

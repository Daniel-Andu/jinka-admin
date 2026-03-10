import { useState, useEffect } from "react";
import { Table, Space, Button, Tag, Input, Card, message, Modal, Form, DatePicker, Switch } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
    PlusOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";
import { announcementService } from "../../services";
import dayjs from 'dayjs';

const { confirm } = Modal;
const { TextArea } = Input;

export const AnnouncementList = () => {
    const [searchText, setSearchText] = useState("");
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAnnouncement, setEditingAnnouncement] = useState(null);
    const [form] = Form.useForm();

    // Fetch announcements from backend
    const fetchAnnouncements = async () => {
        setLoading(true);
        try {
            const response = await announcementService.getAll();
            console.log('Announcements from backend:', response);
            setAnnouncements(response.data || response || []);
            message.success('Announcements loaded from database');
        } catch (error) {
            console.error('Error fetching announcements:', error);
            message.error('Failed to load announcements');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    // Delete announcement
    const handleDelete = (record) => {
        confirm({
            title: 'Are you sure you want to delete this announcement?',
            icon: <ExclamationCircleOutlined />,
            content: `Announcement: ${record.title}`,
            okText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            async onOk() {
                try {
                    await announcementService.delete(record.id);
                    message.success('Announcement deleted successfully');
                    fetchAnnouncements();
                } catch (error) {
                    console.error('Error deleting announcement:', error);
                    message.error('Failed to delete announcement');
                }
            },
        });
    };

    // Open modal for create/edit
    const openModal = (announcement = null) => {
        setEditingAnnouncement(announcement);
        if (announcement) {
            form.setFieldsValue({
                ...announcement,
                published_at: announcement.published_at ? dayjs(announcement.published_at) : null,
            });
        } else {
            form.resetFields();
        }
        setIsModalOpen(true);
    };

    // Handle form submit
    const handleSubmit = async (values) => {
        try {
            const data = {
                ...values,
                published_at: values.published_at ? values.published_at.format('YYYY-MM-DD HH:mm:ss') : null,
                is_active: values.is_active ? 1 : 0, // Convert boolean to number for MySQL
            };

            if (editingAnnouncement) {
                await announcementService.update(editingAnnouncement.id, data);
                message.success('Announcement updated successfully');
            } else {
                await announcementService.create(data);
                message.success('Announcement created successfully');
            }
            setIsModalOpen(false);
            form.resetFields();
            fetchAnnouncements();
        } catch (error) {
            console.error('Error saving announcement:', error);
            message.error('Failed to save announcement');
        }
    };

    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Published Date",
            dataIndex: "published_at",
            key: "published_at",
            render: (date) => date ? dayjs(date).format('YYYY-MM-DD HH:mm') : '-',
        },
        {
            title: "Status",
            dataIndex: "is_active",
            key: "is_active",
            render: (is_active) => (
                <Tag color={is_active ? "green" : "orange"}>
                    {is_active ? "Active" : "Inactive"}
                </Tag>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => openModal(record)}
                    />
                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record)}
                    />
                </Space>
            ),
        },
    ];

    const filteredData = announcements.filter(item =>
        (item.title || '').toLowerCase().includes(searchText.toLowerCase()) ||
        (item.content || '').toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div>
            <div className="page-header">
                <h1>Announcements</h1>
                <p style={{ color: '#666', marginTop: 8 }}>
                    {loading ? 'Loading...' : `Connected to backend database (${announcements.length} announcements)`}
                </p>
            </div>

            <Card bordered={false} style={{ borderRadius: 12 }}>
                <Space style={{ marginBottom: 16, width: "100%", justifyContent: "space-between" }}>
                    <Input
                        placeholder="Search announcements..."
                        prefix={<SearchOutlined />}
                        style={{ width: 300 }}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        allowClear
                    />
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => openModal()}
                    >
                        Add Announcement
                    </Button>
                </Space>

                <Table
                    columns={columns}
                    dataSource={filteredData}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                        pageSize: 10,
                        showTotal: (total) => `Total ${total} announcements`,
                    }}
                />
            </Card>

            <Modal
                title={editingAnnouncement ? "Edit Announcement" : "Create Announcement"}
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false);
                    form.resetFields();
                }}
                footer={null}
                width={700}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{ is_active: true }}
                >
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please enter title' }]}
                    >
                        <Input placeholder="Announcement title" />
                    </Form.Item>

                    <Form.Item
                        name="content"
                        label="Content"
                        rules={[{ required: true, message: 'Please enter content' }]}
                    >
                        <TextArea rows={6} placeholder="Announcement content" />
                    </Form.Item>

                    <Form.Item
                        name="featured_image"
                        label="Featured Image URL"
                    >
                        <Input placeholder="https://example.com/image.jpg" />
                    </Form.Item>

                    <Form.Item
                        name="published_at"
                        label="Published Date"
                    >
                        <DatePicker showTime style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="is_active"
                        label="Active"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>

                    <Form.Item>
                        <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                            <Button onClick={() => {
                                setIsModalOpen(false);
                                form.resetFields();
                            }}>
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit">
                                {editingAnnouncement ? 'Update' : 'Create'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export const AnnouncementCreate = () => {
    return (
        <div>
            <div className="page-header">
                <h1>Create New Announcement</h1>
            </div>
            <Card bordered={false} style={{ borderRadius: 12 }}>
                <p>Use the main Announcements page to create announcements</p>
            </Card>
        </div>
    );
};

export const AnnouncementEdit = () => {
    return (
        <div>
            <div className="page-header">
                <h1>Edit Announcement</h1>
            </div>
            <Card bordered={false} style={{ borderRadius: 12 }}>
                <p>Use the main Announcements page to edit announcements</p>
            </Card>
        </div>
    );
};

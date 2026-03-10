import { useState, useEffect } from "react";
import { Table, Space, Button, Tag, Input, Card, message, Modal, Form, Switch } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
    PlusOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";
import { servicesService } from "../../services";

const { confirm } = Modal;

export const CityServicesList = () => {
    const [searchText, setSearchText] = useState("");
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [form] = Form.useForm();

    const fetchServices = async () => {
        setLoading(true);
        try {
            const response = await servicesService.getAll();
            console.log('City services from backend:', response);
            setServices(response.data || response || []);
            message.success('City services loaded from database');
        } catch (error) {
            console.error('Error fetching city services:', error);
            message.error('Failed to load city services');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleDelete = (record) => {
        confirm({
            title: 'Are you sure you want to delete this service?',
            icon: <ExclamationCircleOutlined />,
            content: `Service: ${record.title}`,
            okText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            async onOk() {
                try {
                    await servicesService.delete(record.id);
                    message.success('Service deleted successfully');
                    fetchServices();
                } catch (error) {
                    console.error('Error deleting service:', error);
                    message.error('Failed to delete service');
                }
            },
        });
    };

    const openModal = (service = null) => {
        setEditingService(service);
        if (service) {
            form.setFieldsValue(service);
        } else {
            form.resetFields();
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (values) => {
        try {
            // Convert boolean to number for MySQL
            const data = {
                ...values,
                is_active: values.is_active ? 1 : 0
            };

            if (editingService) {
                await servicesService.update(editingService.id, data);
                message.success('Service updated successfully');
            } else {
                await servicesService.create(data);
                message.success('Service created successfully');
            }
            setIsModalOpen(false);
            form.resetFields();
            fetchServices();
        } catch (error) {
            console.error('Error saving service:', error);
            message.error('Failed to save service');
        }
    };

    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            ellipsis: true,
        },
        {
            title: "Icon",
            dataIndex: "icon",
            key: "icon",
        },
        {
            title: "Link",
            dataIndex: "link",
            key: "link",
            ellipsis: true,
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

    const filteredData = services.filter(item =>
        (item.title || '').toLowerCase().includes(searchText.toLowerCase()) ||
        (item.description || '').toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div>
            <div className="page-header">
                <h1>City Services</h1>
                <p style={{ color: '#666', marginTop: 8 }}>
                    {loading ? 'Loading...' : `Manage city services (${services.length} services)`}
                </p>
            </div>

            <Card style={{ borderRadius: 12 }}>
                <Space style={{ marginBottom: 16, width: "100%", justifyContent: "space-between" }}>
                    <Input
                        placeholder="Search services..."
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
                        Add Service
                    </Button>
                </Space>

                <Table
                    columns={columns}
                    dataSource={filteredData}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                        pageSize: 10,
                        showTotal: (total) => `Total ${total} services`,
                    }}
                />
            </Card>

            <Modal
                title={editingService ? "Edit Service" : "Create Service"}
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
                        label="Service Title"
                        rules={[{ required: true, message: 'Please enter service title' }]}
                    >
                        <Input placeholder="e.g., Birth Certificate" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please enter description' }]}
                    >
                        <Input.TextArea rows={3} placeholder="Service description" />
                    </Form.Item>

                    <Form.Item
                        name="icon"
                        label="Icon"
                    >
                        <Input placeholder="Icon name (e.g., FileTextOutlined)" />
                    </Form.Item>

                    <Form.Item
                        name="link"
                        label="Link"
                    >
                        <Input placeholder="/services/birth-certificate" />
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
                                {editingService ? 'Update' : 'Create'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

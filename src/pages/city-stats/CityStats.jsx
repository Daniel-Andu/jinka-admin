import { useState, useEffect } from "react";
import { Table, Space, Button, Tag, Input, Card, message, Modal, Form, Switch, InputNumber } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
    PlusOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";
import { cityStatsService } from "../../services";

const { confirm } = Modal;

export const CityStatsList = () => {
    const [searchText, setSearchText] = useState("");
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStat, setEditingStat] = useState(null);
    const [form] = Form.useForm();

    const fetchStats = async () => {
        setLoading(true);
        try {
            const response = await cityStatsService.getAll();
            console.log('City stats from backend:', response);
            setStats(response.data || response || []);
            message.success('City stats loaded from database');
        } catch (error) {
            console.error('Error fetching city stats:', error);
            message.error('Failed to load city stats');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const handleDelete = (record) => {
        confirm({
            title: 'Are you sure you want to delete this city stat?',
            icon: <ExclamationCircleOutlined />,
            content: `Stat: ${record.stat_key}`,
            okText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            async onOk() {
                try {
                    await cityStatsService.delete(record.id);
                    message.success('City stat deleted successfully');
                    fetchStats();
                } catch (error) {
                    console.error('Error deleting city stat:', error);
                    message.error('Failed to delete city stat');
                }
            },
        });
    };

    const openModal = (stat = null) => {
        setEditingStat(stat);
        if (stat) {
            form.setFieldsValue(stat);
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

            if (editingStat) {
                await cityStatsService.update(editingStat.id, data);
                message.success('City stat updated successfully');
            } else {
                await cityStatsService.create(data);
                message.success('City stat created successfully');
            }
            setIsModalOpen(false);
            form.resetFields();
            fetchStats();
        } catch (error) {
            console.error('Error saving city stat:', error);
            message.error('Failed to save city stat');
        }
    };

    const columns = [
        {
            title: "Order",
            dataIndex: "order_number",
            key: "order_number",
            width: 80,
            sorter: (a, b) => a.order_number - b.order_number,
        },
        {
            title: "Key",
            dataIndex: "stat_key",
            key: "stat_key",
        },
        {
            title: "Value",
            dataIndex: "value",
            key: "value",
        },
        {
            title: "Icon",
            dataIndex: "icon",
            key: "icon",
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

    const filteredData = stats.filter(item =>
        (item.stat_key || '').toLowerCase().includes(searchText.toLowerCase()) ||
        (item.value || '').toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div>
            <div className="page-header">
                <h1>City Statistics</h1>
                <p style={{ color: '#666', marginTop: 8 }}>
                    {loading ? 'Loading...' : `Manage homepage city statistics (${stats.length} stats)`}
                </p>
            </div>

            <Card style={{ borderRadius: 12 }}>
                <Space style={{ marginBottom: 16, width: "100%", justifyContent: "space-between" }}>
                    <Input
                        placeholder="Search stats..."
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
                        Add City Stat
                    </Button>
                </Space>

                <Table
                    columns={columns}
                    dataSource={filteredData}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                        pageSize: 10,
                        showTotal: (total) => `Total ${total} stats`,
                    }}
                />
            </Card>

            <Modal
                title={editingStat ? "Edit City Stat" : "Create City Stat"}
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false);
                    form.resetFields();
                }}
                footer={null}
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{ is_active: true, order_number: 0 }}
                >
                    <Form.Item
                        name="stat_key"
                        label="Stat Key"
                        rules={[{ required: true, message: 'Please enter stat key' }]}
                    >
                        <Input placeholder="e.g., population, area, departments" />
                    </Form.Item>

                    <Form.Item
                        name="value"
                        label="Value"
                        rules={[{ required: true, message: 'Please enter value' }]}
                    >
                        <Input placeholder="e.g., 195,000+, 250 km²" />
                    </Form.Item>

                    <Form.Item
                        name="icon"
                        label="Icon"
                    >
                        <Input placeholder="Icon name (e.g., UserOutlined)" />
                    </Form.Item>

                    <Form.Item
                        name="order_number"
                        label="Display Order"
                    >
                        <InputNumber min={0} style={{ width: '100%' }} />
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
                                {editingStat ? 'Update' : 'Create'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

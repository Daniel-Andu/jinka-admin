import React, { useState, useEffect } from "react";
import { Table, Space, Button, Tag, Input, Card, Avatar, message, Modal, Form, Select, Spin } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
    PlusOutlined,
    BankOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";
import { departmentService } from "../../services";

const { confirm } = Modal;

export const DepartmentList = () => {
    const [searchText, setSearchText] = useState("");
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDepartment, setEditingDepartment] = useState(null);
    const [form] = Form.useForm();

    // Fetch departments from backend
    const fetchDepartments = async () => {
        setLoading(true);
        try {
            const response = await departmentService.getAll();
            console.log('Departments from backend:', response);
            setDepartments(response.data || response || []);
            message.success('Departments loaded from database');
        } catch (error) {
            console.error('Error fetching departments:', error);
            message.error('Failed to load departments from backend');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    // Delete department
    const handleDelete = (record) => {
        confirm({
            title: 'Are you sure you want to delete this department?',
            icon: <ExclamationCircleOutlined />,
            content: `Department: ${record.name || record.title}`,
            okText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            async onOk() {
                try {
                    await departmentService.delete(record.id);
                    message.success('Department deleted successfully');
                    fetchDepartments();
                } catch (error) {
                    console.error('Error deleting department:', error);
                    message.error('Failed to delete department');
                }
            },
        });
    };

    // Open modal for create/edit
    const openModal = (department = null) => {
        setEditingDepartment(department);
        if (department) {
            form.setFieldsValue(department);
        } else {
            form.resetFields();
        }
        setIsModalOpen(true);
    };

    // Handle form submit
    const handleSubmit = async (values) => {
        try {
            // Convert boolean to number for MySQL
            const data = {
                ...values,
                is_active: values.is_active ? 1 : 0
            };

            if (editingDepartment) {
                await departmentService.update(editingDepartment.id, data);
                message.success('Department updated successfully');
            } else {
                await departmentService.create(data);
                message.success('Department created successfully');
            }
            setIsModalOpen(false);
            form.resetFields();
            fetchDepartments();
        } catch (error) {
            console.error('Error saving department:', error);
            message.error('Failed to save department');
        }
    };

    const columns = [
        {
            title: "Department",
            dataIndex: "name",
            key: "name",
            render: (text, record) => (
                <Space>
                    <Avatar icon={<BankOutlined />} style={{ backgroundColor: record.color || '#1e5a8e' }} />
                    <span>{text || record.title}</span>
                </Space>
            ),
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

    const filteredData = departments.filter(item =>
        (item.name || item.title || '').toLowerCase().includes(searchText.toLowerCase()) ||
        (item.description || '').toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div>
            <div className="page-header">
                <h1>Departments</h1>
                <p style={{ color: '#666', marginTop: 8 }}>
                    {loading ? 'Loading...' : `Connected to backend database (${departments.length} departments)`}
                </p>
            </div>

            <Card bordered={false} style={{ borderRadius: 12 }}>
                <Space style={{ marginBottom: 16, width: "100%", justifyContent: "space-between" }}>
                    <Input
                        placeholder="Search departments..."
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
                        Add Department
                    </Button>
                </Space>

                <Table
                    columns={columns}
                    dataSource={filteredData}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                        pageSize: 10,
                        showTotal: (total) => `Total ${total} departments`,
                    }}
                />
            </Card>

            <Modal
                title={editingDepartment ? "Edit Department" : "Create Department"}
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false);
                    form.resetFields();
                }}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{ is_active: true }}
                >
                    <Form.Item
                        name="name"
                        label="Department Name"
                        rules={[{ required: true, message: 'Please enter department name' }]}
                    >
                        <Input placeholder="e.g., Civil Registry" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                    >
                        <Input.TextArea rows={3} placeholder="Department description" />
                    </Form.Item>

                    <Form.Item
                        name="icon"
                        label="Icon"
                    >
                        <Input placeholder="Icon name (e.g., BankOutlined)" />
                    </Form.Item>

                    <Form.Item
                        name="is_active"
                        label="Status"
                        valuePropName="checked"
                    >
                        <Select>
                            <Select.Option value={true}>Active</Select.Option>
                            <Select.Option value={false}>Inactive</Select.Option>
                        </Select>
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
                                {editingDepartment ? 'Update' : 'Create'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export const DepartmentCreate = () => {
    return (
        <div>
            <div className="page-header">
                <h1>Create New Department</h1>
            </div>
            <Card bordered={false} style={{ borderRadius: 12 }}>
                <p>Department creation form will be connected to your API</p>
            </Card>
        </div>
    );
};

export const DepartmentEdit = () => {
    return (
        <div>
            <div className="page-header">
                <h1>Edit Department</h1>
            </div>
            <Card bordered={false} style={{ borderRadius: 12 }}>
                <p>Department edit form will be connected to your API</p>
            </Card>
        </div>
    );
};

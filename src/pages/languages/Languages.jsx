import { useState, useEffect } from "react";
import { Table, Space, Button, Tag, Input, Card, message, Modal, Form, Switch } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
    PlusOutlined,
    ExclamationCircleOutlined,
    GlobalOutlined,
} from "@ant-design/icons";
import { languagesService } from "../../services";

const { confirm } = Modal;

export const LanguagesList = () => {
    const [searchText, setSearchText] = useState("");
    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLanguage, setEditingLanguage] = useState(null);
    const [form] = Form.useForm();

    const fetchLanguages = async () => {
        setLoading(true);
        try {
            const response = await languagesService.getAll();
            console.log('Languages from backend:', response);
            setLanguages(response.data || response || []);
            message.success('Languages loaded from database');
        } catch (error) {
            console.error('Error fetching languages:', error);
            message.error('Failed to load languages');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLanguages();
    }, []);

    const handleDelete = (record) => {
        confirm({
            title: 'Are you sure you want to delete this language?',
            icon: <ExclamationCircleOutlined />,
            content: `Language: ${record.name}`,
            okText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            async onOk() {
                try {
                    await languagesService.delete(record.id);
                    message.success('Language deleted successfully');
                    fetchLanguages();
                } catch (error) {
                    console.error('Error deleting language:', error);
                    message.error('Failed to delete language');
                }
            },
        });
    };

    const openModal = (language = null) => {
        setEditingLanguage(language);
        if (language) {
            form.setFieldsValue(language);
        } else {
            form.resetFields();
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (values) => {
        try {
            // Convert booleans to numbers for MySQL
            const data = {
                ...values,
                is_default: values.is_default ? 1 : 0,
                is_active: values.is_active ? 1 : 0
            };

            if (editingLanguage) {
                await languagesService.update(editingLanguage.id, data);
                message.success('Language updated successfully');
            } else {
                await languagesService.create(data);
                message.success('Language created successfully');
            }
            setIsModalOpen(false);
            form.resetFields();
            fetchLanguages();
        } catch (error) {
            console.error('Error saving language:', error);
            message.error('Failed to save language');
        }
    };

    const columns = [
        {
            title: "Language",
            key: "language",
            render: (_, record) => (
                <Space>
                    <GlobalOutlined style={{ fontSize: 20, color: '#1e5a8e' }} />
                    <div>
                        <div style={{ fontWeight: 500 }}>{record.name}</div>
                        <div style={{ fontSize: 12, color: '#999' }}>{record.code}</div>
                    </div>
                </Space>
            ),
        },
        {
            title: "Code",
            dataIndex: "code",
            key: "code",
        },
        {
            title: "Default",
            dataIndex: "is_default",
            key: "is_default",
            render: (is_default) => (
                is_default ? <Tag color="blue">Default</Tag> : '-'
            ),
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
                        disabled={record.is_default}
                    />
                </Space>
            ),
        },
    ];

    const filteredData = languages.filter(item =>
        (item.name || '').toLowerCase().includes(searchText.toLowerCase()) ||
        (item.code || '').toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div>
            <div className="page-header">
                <h1>Languages</h1>
                <p style={{ color: '#666', marginTop: 8 }}>
                    {loading ? 'Loading...' : `Manage system languages (${languages.length} languages)`}
                </p>
            </div>

            <Card style={{ borderRadius: 12 }}>
                <Space style={{ marginBottom: 16, width: "100%", justifyContent: "space-between" }}>
                    <Input
                        placeholder="Search languages..."
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
                        Add Language
                    </Button>
                </Space>

                <Table
                    columns={columns}
                    dataSource={filteredData}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                        pageSize: 10,
                        showTotal: (total) => `Total ${total} languages`,
                    }}
                />
            </Card>

            <Modal
                title={editingLanguage ? "Edit Language" : "Create Language"}
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
                    initialValues={{ is_active: true, is_default: false }}
                >
                    <Form.Item
                        name="name"
                        label="Language Name"
                        rules={[{ required: true, message: 'Please enter language name' }]}
                    >
                        <Input placeholder="e.g., English, አማርኛ" />
                    </Form.Item>

                    <Form.Item
                        name="code"
                        label="Language Code"
                        rules={[{ required: true, message: 'Please enter language code' }]}
                    >
                        <Input placeholder="e.g., en, am" maxLength={10} />
                    </Form.Item>

                    <Form.Item
                        name="is_default"
                        label="Set as Default"
                        valuePropName="checked"
                    >
                        <Switch />
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
                                {editingLanguage ? 'Update' : 'Create'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

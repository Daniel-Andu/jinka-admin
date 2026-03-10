import { useState, useEffect } from "react";
import { Table, Space, Button, Tag, Input, Card, message, Modal, Form, Switch, Image, Upload } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
    PlusOutlined,
    ExclamationCircleOutlined,
    PictureOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import { heroSliderService, uploadService } from "../../services";

const { confirm } = Modal;

export const HeroSliderList = () => {
    const [searchText, setSearchText] = useState("");
    const [sliders, setSliders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSlider, setEditingSlider] = useState(null);
    const [form] = Form.useForm();
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const fetchSliders = async () => {
        setLoading(true);
        try {
            const response = await heroSliderService.getAll();
            console.log('Hero sliders from backend:', response);
            setSliders(response.data || response || []);
            message.success('Hero sliders loaded from database');
        } catch (error) {
            console.error('Error fetching hero sliders:', error);
            message.error('Failed to load hero sliders');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSliders();
    }, []);

    const handleDelete = (record) => {
        confirm({
            title: 'Are you sure you want to delete this hero slider?',
            icon: <ExclamationCircleOutlined />,
            content: `Slider: ${record.title}`,
            okText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            async onOk() {
                try {
                    await heroSliderService.delete(record.id);
                    message.success('Hero slider deleted successfully');
                    fetchSliders();
                } catch (error) {
                    console.error('Error deleting hero slider:', error);
                    message.error('Failed to delete hero slider');
                }
            },
        });
    };

    const openModal = (slider = null) => {
        setEditingSlider(slider);
        if (slider) {
            form.setFieldsValue(slider);
            setImageUrl(slider.image || "");
        } else {
            form.resetFields();
            setImageUrl("");
        }
        setIsModalOpen(true);
    };

    const handleImageUpload = async (file) => {
        try {
            setUploading(true);
            const response = await uploadService.upload(file, 'hero-sliders');
            const uploadedUrl = `http://localhost:5001/${response.filePath}`;
            setImageUrl(uploadedUrl);
            form.setFieldsValue({ image: uploadedUrl });
            message.success('Image uploaded successfully');
            return false; // Prevent default upload behavior
        } catch (error) {
            console.error('Error uploading image:', error);
            message.error('Failed to upload image');
            return false;
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (values) => {
        try {
            // Convert boolean to number for MySQL
            const data = {
                ...values,
                is_active: values.is_active ? 1 : 0
            };

            if (editingSlider) {
                await heroSliderService.update(editingSlider.id, data);
                message.success('Hero slider updated successfully');
            } else {
                await heroSliderService.create(data);
                message.success('Hero slider created successfully');
            }
            setIsModalOpen(false);
            form.resetFields();
            fetchSliders();
        } catch (error) {
            console.error('Error saving hero slider:', error);
            message.error('Failed to save hero slider');
        }
    };

    const columns = [
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            width: 100,
            render: (image) => (
                image ? (
                    <Image
                        src={image}
                        alt="Hero"
                        width={80}
                        height={50}
                        style={{ objectFit: 'cover', borderRadius: 4 }}
                        fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                        preview={{
                            mask: 'Preview'
                        }}
                    />
                ) : (
                    <div style={{ width: 80, height: 50, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                        <PictureOutlined style={{ fontSize: 24, color: '#999' }} />
                    </div>
                )
            ),
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Subtitle",
            dataIndex: "subtitle",
            key: "subtitle",
            ellipsis: true,
        },
        {
            title: "Button",
            key: "button",
            render: (_, record) => (
                record.button_text ? (
                    <div>
                        <div style={{ fontWeight: 500 }}>{record.button_text}</div>
                        <div style={{ fontSize: 12, color: '#999' }}>{record.button_link}</div>
                    </div>
                ) : '-'
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
                    />
                </Space>
            ),
        },
    ];

    const filteredData = sliders.filter(item =>
        (item.title || '').toLowerCase().includes(searchText.toLowerCase()) ||
        (item.subtitle || '').toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div>
            <div className="page-header">
                <h1>Hero Sliders</h1>
                <p style={{ color: '#666', marginTop: 8 }}>
                    {loading ? 'Loading...' : `Manage homepage hero sliders (${sliders.length} sliders)`}
                </p>
            </div>

            <Card style={{ borderRadius: 12 }}>
                <Space style={{ marginBottom: 16, width: "100%", justifyContent: "space-between" }}>
                    <Input
                        placeholder="Search sliders..."
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
                        Add Hero Slider
                    </Button>
                </Space>

                <Table
                    columns={columns}
                    dataSource={filteredData}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                        pageSize: 10,
                        showTotal: (total) => `Total ${total} sliders`,
                    }}
                />
            </Card>

            <Modal
                title={editingSlider ? "Edit Hero Slider" : "Create Hero Slider"}
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
                        <Input placeholder="Hero slider title" />
                    </Form.Item>

                    <Form.Item
                        name="subtitle"
                        label="Subtitle"
                    >
                        <Input.TextArea rows={2} placeholder="Hero slider subtitle" />
                    </Form.Item>

                    <Form.Item
                        name="image"
                        label="Image URL"
                        rules={[{ required: true, message: 'Please enter image URL' }]}
                    >
                        <Input
                            placeholder="https://example.com/image.jpg"
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                    </Form.Item>

                    {imageUrl && (
                        <Form.Item label="Image Preview">
                            <Image
                                src={imageUrl}
                                alt="Preview"
                                style={{ maxWidth: '100%', maxHeight: 200, objectFit: 'contain' }}
                                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                                onError={() => message.warning('Image URL may be invalid or blocked by CORS')}
                            />
                        </Form.Item>
                    )}

                    <Form.Item
                        name="button_text"
                        label="Button Text"
                    >
                        <Input placeholder="Learn More" />
                    </Form.Item>

                    <Form.Item
                        name="button_link"
                        label="Button Link"
                    >
                        <Input placeholder="/about" />
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
                                {editingSlider ? 'Update' : 'Create'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

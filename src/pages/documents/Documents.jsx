import React, { useState } from "react";
import { Table, Space, Button, Tag, Input, Card, Modal, Upload, Form, Select, message } from "antd";
import {
    DownloadOutlined,
    DeleteOutlined,
    SearchOutlined,
    UploadOutlined,
    FileTextOutlined,
    FilePdfOutlined,
    FileWordOutlined,
    FileExcelOutlined,
    InboxOutlined,
} from "@ant-design/icons";

const { Dragger } = Upload;

export const DocumentList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [form] = Form.useForm();
    const [categoryForm] = Form.useForm();
    const [categories, setCategories] = useState([
        "Finance",
        "Planning",
        "Statistics",
        "Legal",
        "HR",
        "Operations"
    ]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.validateFields().then((values) => {
            console.log("Document data:", values);
            message.success("Document uploaded successfully! (This will be connected to your API)");
            form.resetFields();
            setIsModalOpen(false);
        });
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    const handleAddCategory = () => {
        categoryForm.validateFields().then((values) => {
            if (!categories.includes(values.category)) {
                setCategories([...categories, values.category]);
                message.success("Category added successfully!");
                categoryForm.resetFields();
                setIsCategoryModalOpen(false);
            } else {
                message.warning("Category already exists!");
            }
        });
    };

    const handleViewDocument = (document) => {
        setSelectedDocument(document);
        setIsViewModalOpen(true);
    };

    const handleDownload = (document) => {
        message.success(`Downloading ${document.name}...`);
        // In real implementation, this would download the file
        // const link = document.createElement('a');
        // link.href = document.url;
        // link.download = document.name;
        // link.click();
    };

    const uploadProps = {
        name: "file",
        multiple: false,
        beforeUpload: () => false, // Prevent auto upload
        onChange(info) {
            const { status } = info.file;
            if (status === "done") {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const getFileIcon = (type) => {
        const icons = {
            pdf: <FilePdfOutlined style={{ color: "#dc2626" }} />,
            doc: <FileWordOutlined style={{ color: "#1e5a8e" }} />,
            xlsx: <FileExcelOutlined style={{ color: "#0d9488" }} />,
            txt: <FileTextOutlined style={{ color: "#6b7280" }} />,
        };
        return icons[type] || <FileTextOutlined />;
    };

    const columns = [
        {
            title: "Document",
            dataIndex: "name",
            key: "name",
            render: (text, record) => (
                <Space>
                    {getFileIcon(record.type)}
                    <span>{text}</span>
                </Space>
            ),
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            render: (category) => <Tag>{category}</Tag>,
        },
        {
            title: "Size",
            dataIndex: "size",
            key: "size",
        },
        {
            title: "Uploaded",
            dataIndex: "uploaded",
            key: "uploaded",
        },
        {
            title: "Uploaded By",
            dataIndex: "uploadedBy",
            key: "uploadedBy",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button type="primary" ghost icon={<DownloadOutlined />} onClick={() => handleViewDocument(record)}>
                        View
                    </Button>
                    <Button type="primary" icon={<DownloadOutlined />} onClick={() => handleDownload(record)}>
                        Download
                    </Button>
                    <Button type="text" danger icon={<DeleteOutlined />} />
                </Space>
            ),
        },
    ];

    const data = [
        {
            id: 1,
            name: "Annual Budget Report 2026",
            type: "pdf",
            category: "Finance",
            size: "2.4 MB",
            uploaded: "2026-03-01",
            uploadedBy: "Admin User",
        },
        {
            id: 2,
            name: "City Development Plan",
            type: "doc",
            category: "Planning",
            size: "1.8 MB",
            uploaded: "2026-02-28",
            uploadedBy: "Planning Dept",
        },
        {
            id: 3,
            name: "Population Statistics",
            type: "xlsx",
            category: "Statistics",
            size: "856 KB",
            uploaded: "2026-02-25",
            uploadedBy: "Registry Dept",
        },
    ];

    return (
        <div>
            <div className="page-header">
                <h1>Documents</h1>
            </div>

            <Card bordered={false} style={{ borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <Space style={{ marginBottom: 16, width: "100%", justifyContent: "space-between" }}>
                    <Input
                        placeholder="Search documents..."
                        prefix={<SearchOutlined />}
                        style={{ width: 300 }}
                        size="large"
                    />
                    <Button type="primary" icon={<UploadOutlined />} size="large" onClick={showModal}>
                        Upload Document
                    </Button>
                </Space>

                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showTotal: (total) => `Total ${total} documents`,
                    }}
                />
            </Card>

            <Modal
                title="Upload Document"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Upload"
                cancelText="Cancel"
                width={600}
            >
                <Form form={form} layout="vertical" style={{ marginTop: 24 }}>
                    <Form.Item
                        label="Document Category"
                        name="category"
                        rules={[{ required: true, message: "Please select category" }]}
                    >
                        <Select
                            placeholder="Select category"
                            size="large"
                            dropdownRender={(menu) => (
                                <>
                                    {menu}
                                    <div style={{ padding: '8px', borderTop: '1px solid #f0f0f0' }}>
                                        <Button
                                            type="link"
                                            onClick={() => setIsCategoryModalOpen(true)}
                                            style={{ width: '100%' }}
                                        >
                                            + Add New Category
                                        </Button>
                                    </div>
                                </>
                            )}
                        >
                            {categories.map(cat => (
                                <Select.Option key={cat} value={cat}>{cat}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Upload File"
                        name="file"
                        rules={[{ required: true, message: "Please upload a file" }]}
                    >
                        <Dragger {...uploadProps}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Support for PDF, DOC, DOCX, XLS, XLSX files. Maximum file size: 10MB
                            </p>
                        </Dragger>
                    </Form.Item>

                    <Form.Item label="Description" name="description">
                        <Input.TextArea rows={3} placeholder="Enter document description (optional)" />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Add Category Modal */}
            <Modal
                title="Add New Category"
                open={isCategoryModalOpen}
                onOk={handleAddCategory}
                onCancel={() => {
                    categoryForm.resetFields();
                    setIsCategoryModalOpen(false);
                }}
                okText="Add"
                cancelText="Cancel"
            >
                <Form form={categoryForm} layout="vertical" style={{ marginTop: 24 }}>
                    <Form.Item
                        label="Category Name"
                        name="category"
                        rules={[{ required: true, message: "Please enter category name" }]}
                    >
                        <Input placeholder="Enter category name" size="large" />
                    </Form.Item>
                </Form>
            </Modal>

            {/* View Document Modal */}
            <Modal
                title="Document Preview"
                open={isViewModalOpen}
                onCancel={() => setIsViewModalOpen(false)}
                footer={[
                    <Button key="download" type="primary" icon={<DownloadOutlined />} onClick={() => handleDownload(selectedDocument)}>
                        Download
                    </Button>,
                    <Button key="close" onClick={() => setIsViewModalOpen(false)}>
                        Close
                    </Button>
                ]}
                width={800}
            >
                {selectedDocument && (
                    <div>
                        <Space direction="vertical" style={{ width: "100%", marginBottom: 16 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                {getFileIcon(selectedDocument.type)}
                                <div>
                                    <div style={{ fontSize: 16, fontWeight: 600 }}>{selectedDocument.name}</div>
                                    <div style={{ fontSize: 13, color: "#6b7280" }}>
                                        {selectedDocument.size} • {selectedDocument.category}
                                    </div>
                                </div>
                            </div>
                            <div style={{ fontSize: 13, color: "#6b7280" }}>
                                Uploaded by {selectedDocument.uploadedBy} on {selectedDocument.uploaded}
                            </div>
                        </Space>
                        <div style={{
                            border: "1px solid #e5e7eb",
                            borderRadius: 8,
                            padding: 24,
                            background: "#f9fafb",
                            minHeight: 400,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <div style={{ textAlign: "center", color: "#6b7280" }}>
                                <FileTextOutlined style={{ fontSize: 64, marginBottom: 16 }} />
                                <div>Document preview will be displayed here</div>
                                <div style={{ fontSize: 12, marginTop: 8 }}>
                                    Click Download to get the full document
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

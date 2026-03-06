import React, { useState } from "react";
import { Card, Row, Col, Progress, Tag, Space, Button, Modal, Form, Input, InputNumber, DatePicker, message } from "antd";
import { PlusOutlined, ProjectOutlined } from "@ant-design/icons";

export const ProjectList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.validateFields().then((values) => {
            console.log("Project data:", values);
            message.success("Project created successfully! (This will be connected to your API)");
            form.resetFields();
            setIsModalOpen(false);
        });
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    const projects = [
        {
            id: 1,
            name: "City Infrastructure Upgrade",
            progress: 75,
            status: "In Progress",
            budget: "15M ETB",
            deadline: "Dec 2026",
        },
        {
            id: 2,
            name: "Digital Transformation Initiative",
            progress: 45,
            status: "In Progress",
            budget: "8M ETB",
            deadline: "Sep 2026",
        },
        {
            id: 3,
            name: "Public Park Development",
            progress: 90,
            status: "Near Completion",
            budget: "5M ETB",
            deadline: "Apr 2026",
        },
        {
            id: 4,
            name: "Healthcare Facility Expansion",
            progress: 30,
            status: "Planning",
            budget: "20M ETB",
            deadline: "Mar 2027",
        },
    ];

    return (
        <div>
            <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>Projects</h1>
                <Button type="primary" icon={<PlusOutlined />} size="large" onClick={showModal}>
                    New Project
                </Button>
            </div>

            <Row gutter={[24, 24]}>
                {projects.map((project) => (
                    <Col xs={24} md={12} lg={6} key={project.id}>
                        <Card
                            bordered={false}
                            style={{
                                borderRadius: 12,
                                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                transition: "all 0.3s",
                            }}
                            hoverable
                        >
                            <Space direction="vertical" style={{ width: "100%" }} size="middle">
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <ProjectOutlined style={{ fontSize: 24, color: "#1e5a8e" }} />
                                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{project.name}</h3>
                                </div>
                                <Progress percent={project.progress} status="active" strokeColor="#1e5a8e" />
                                <div>
                                    <Tag color="blue">{project.status}</Tag>
                                </div>
                                <div style={{ fontSize: 13, color: "#6b7280" }}>
                                    <div style={{ marginBottom: 4 }}>
                                        <strong>Budget:</strong> {project.budget}
                                    </div>
                                    <div>
                                        <strong>Deadline:</strong> {project.deadline}
                                    </div>
                                </div>
                            </Space>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal
                title="Create New Project"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Create Project"
                cancelText="Cancel"
                width={600}
            >
                <Form form={form} layout="vertical" style={{ marginTop: 24 }}>
                    <Form.Item
                        label="Project Name"
                        name="name"
                        rules={[{ required: true, message: "Please enter project name" }]}
                    >
                        <Input placeholder="Enter project name" size="large" />
                    </Form.Item>

                    <Form.Item
                        label="Budget (ETB)"
                        name="budget"
                        rules={[{ required: true, message: "Please enter budget" }]}
                    >
                        <InputNumber
                            placeholder="Enter budget amount"
                            size="large"
                            style={{ width: "100%" }}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Deadline"
                        name="deadline"
                        rules={[{ required: true, message: "Please select deadline" }]}
                    >
                        <DatePicker style={{ width: "100%" }} size="large" />
                    </Form.Item>

                    <Form.Item label="Description" name="description">
                        <Input.TextArea rows={4} placeholder="Enter project description" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

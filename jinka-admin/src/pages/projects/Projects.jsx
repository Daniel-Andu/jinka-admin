import React, { useState } from "react";
import { Card, Row, Col, Progress, Tag, Space, Button, Modal, Form, Input, InputNumber, DatePicker, message, Slider, Select, Descriptions } from "antd";
import { PlusOutlined, ProjectOutlined, EditOutlined } from "@ant-design/icons";

export const ProjectList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [form] = Form.useForm();
    const [editForm] = Form.useForm();
    const [projects, setProjects] = useState([
        {
            id: 1,
            name: "City Infrastructure Upgrade",
            progress: 75,
            status: "In Progress",
            budget: "15M ETB",
            budgetAmount: 15000000,
            spentAmount: 11250000, // 75% of budget
            deadline: "Dec 2026",
            lastUpdated: "2024-03-01",
            updatedBy: "Project Manager"
        },
        {
            id: 2,
            name: "Digital Transformation Initiative",
            progress: 45,
            status: "In Progress",
            budget: "8M ETB",
            budgetAmount: 8000000,
            spentAmount: 4200000, // 52.5% of budget (over-spending alert)
            deadline: "Sep 2026",
            lastUpdated: "2024-02-28",
            updatedBy: "IT Director"
        },
        {
            id: 3,
            name: "Public Park Development",
            progress: 90,
            status: "Near Completion",
            budget: "5M ETB",
            budgetAmount: 5000000,
            spentAmount: 4500000, // 90% of budget
            deadline: "Apr 2026",
            lastUpdated: "2024-03-05",
            updatedBy: "Parks Manager"
        },
        {
            id: 4,
            name: "Healthcare Facility Expansion",
            progress: 30,
            status: "Planning",
            budget: "20M ETB",
            budgetAmount: 20000000,
            spentAmount: 2000000, // 10% of budget
            deadline: "Mar 2027",
            lastUpdated: "2024-02-15",
            updatedBy: "Health Director"
        },
    ]);

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

    const handleEditProject = (project) => {
        setSelectedProject(project);
        editForm.setFieldsValue({
            progress: project.progress,
            status: project.status,
        });
        setIsEditModalOpen(true);
    };

    const handleViewProject = (project) => {
        setSelectedProject(project);
        setIsDetailModalOpen(true);
    };

    const handleEditOk = () => {
        editForm.validateFields().then((values) => {
            const oldProgress = selectedProject.progress;
            const newProgress = values.progress;

            // Validation: Check for unrealistic progress jumps
            if (newProgress > oldProgress + 25) {
                Modal.confirm({
                    title: 'Large Progress Jump Detected',
                    content: `Progress is increasing from ${oldProgress}% to ${newProgress}%. This is a significant jump. Are you sure this is correct?`,
                    onOk: () => {
                        updateProject(values, oldProgress, newProgress);
                    },
                });
            } else {
                updateProject(values, oldProgress, newProgress);
            }
        });
    };

    const updateProject = (values, oldProgress, newProgress) => {
        // Update project with audit trail
        const updatedProject = {
            ...selectedProject,
            progress: values.progress,
            status: values.status,
            lastUpdated: new Date().toISOString(),
            updatedBy: "Admin User" // In real app, get from auth context
        };

        setProjects(projects.map(p =>
            p.id === selectedProject.id ? updatedProject : p
        ));

        // Log change for audit trail (in real app, send to API)
        console.log('Audit Log:', {
            projectId: selectedProject.id,
            projectName: selectedProject.name,
            oldProgress,
            newProgress,
            oldStatus: selectedProject.status,
            newStatus: values.status,
            timestamp: new Date().toISOString(),
            updatedBy: "Admin User"
        });

        message.success("Project updated successfully!");
        editForm.resetFields();
        setIsEditModalOpen(false);
        setSelectedProject(null);
    };

    const handleEditCancel = () => {
        editForm.resetFields();
        setIsEditModalOpen(false);
        setSelectedProject(null);
    };

    // Helper functions for budget management
    const getBudgetAlert = (project) => {
        const spentPercentage = (project.spentAmount / project.budgetAmount) * 100;
        const progressPercentage = project.progress;
        // Alert if spending is 10% higher than progress
        return spentPercentage > progressPercentage + 10;
    };

    const getBudgetAlertColor = (project) => {
        if (getBudgetAlert(project)) return "#f59e0b"; // Orange for budget alert
        return null;
    };

    const formatCurrency = (amount) => {
        if (amount >= 1000000) {
            return `${(amount / 1000000).toFixed(1)}M ETB`;
        }
        return `${(amount / 1000).toFixed(0)}K ETB`;
    };

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
                                borderLeft: getBudgetAlertColor(project) ? `4px solid ${getBudgetAlertColor(project)}` : 'none'
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
                                    {getBudgetAlert(project) && (
                                        <Tag color="orange" style={{ marginLeft: 8 }}>
                                            Budget Alert
                                        </Tag>
                                    )}
                                </div>
                                <div style={{ fontSize: 13, color: "#6b7280" }}>
                                    <div style={{ marginBottom: 4 }}>
                                        <strong>Budget:</strong> {project.budget}
                                    </div>
                                    <div style={{ marginBottom: 4 }}>
                                        <strong>Spent:</strong> {formatCurrency(project.spentAmount)}
                                        <span style={{ color: getBudgetAlert(project) ? "#f59e0b" : "#0d9488" }}>
                                            ({Math.round((project.spentAmount / project.budgetAmount) * 100)}%)
                                        </span>
                                    </div>
                                    <div style={{ marginBottom: 4 }}>
                                        <strong>Deadline:</strong> {project.deadline}
                                    </div>
                                    <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 12 }}>
                                        Last updated: {project.lastUpdated} by {project.updatedBy}
                                    </div>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
                                    <Button
                                        type="default"
                                        size="small"
                                        onClick={() => handleViewProject(project)}
                                        style={{ fontSize: 12, padding: "2px 12px", height: 28 }}
                                    >
                                        View
                                    </Button>
                                    <Button
                                        type="primary"
                                        size="small"
                                        onClick={() => handleEditProject(project)}
                                        style={{ fontSize: 12, padding: "2px 12px", height: 28 }}
                                    >
                                        Edit
                                    </Button>
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

            <Modal
                title="Update Project Progress"
                open={isEditModalOpen}
                onOk={handleEditOk}
                onCancel={handleEditCancel}
                okText="Update"
                cancelText="Cancel"
                width={500}
            >
                <Form form={editForm} layout="vertical" style={{ marginTop: 24 }}>
                    <Form.Item
                        label="Progress (%)"
                        name="progress"
                        rules={[{ required: true, message: "Please set progress" }]}
                    >
                        <Slider
                            min={0}
                            max={100}
                            marks={{
                                0: '0%',
                                25: '25%',
                                50: '50%',
                                75: '75%',
                                100: '100%'
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Status"
                        name="status"
                        rules={[{ required: true, message: "Please select status" }]}
                    >
                        <Select size="large">
                            <Select.Option value="Planning">Planning</Select.Option>
                            <Select.Option value="In Progress">In Progress</Select.Option>
                            <Select.Option value="Near Completion">Near Completion</Select.Option>
                            <Select.Option value="Completed">Completed</Select.Option>
                            <Select.Option value="On Hold">On Hold</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Project Detail Modal */}
            <Modal
                title="Project Details"
                open={isDetailModalOpen}
                onCancel={() => setIsDetailModalOpen(false)}
                footer={[
                    <Button key="close" onClick={() => setIsDetailModalOpen(false)}>
                        Close
                    </Button>
                ]}
                width={700}
            >
                {selectedProject && (
                    <div>
                        <Descriptions bordered column={1} size="middle">
                            <Descriptions.Item label="Project Name">
                                <strong style={{ fontSize: 16 }}>{selectedProject.name}</strong>
                            </Descriptions.Item>
                            <Descriptions.Item label="Status">
                                <Tag color="blue">{selectedProject.status}</Tag>
                                {getBudgetAlert(selectedProject) && (
                                    <Tag color="orange" style={{ marginLeft: 8 }}>Budget Alert</Tag>
                                )}
                            </Descriptions.Item>
                            <Descriptions.Item label="Progress">
                                <Progress percent={selectedProject.progress} status="active" strokeColor="#1e5a8e" />
                            </Descriptions.Item>
                            <Descriptions.Item label="Budget">
                                {selectedProject.budget}
                            </Descriptions.Item>
                            <Descriptions.Item label="Spent Amount">
                                {formatCurrency(selectedProject.spentAmount)}
                                <span style={{ color: getBudgetAlert(selectedProject) ? "#f59e0b" : "#0d9488", marginLeft: 8 }}>
                                    ({Math.round((selectedProject.spentAmount / selectedProject.budgetAmount) * 100)}%)
                                </span>
                            </Descriptions.Item>
                            <Descriptions.Item label="Remaining Budget">
                                {formatCurrency(selectedProject.budgetAmount - selectedProject.spentAmount)}
                            </Descriptions.Item>
                            <Descriptions.Item label="Deadline">
                                {selectedProject.deadline}
                            </Descriptions.Item>
                            <Descriptions.Item label="Last Updated">
                                {selectedProject.lastUpdated}
                            </Descriptions.Item>
                            <Descriptions.Item label="Updated By">
                                {selectedProject.updatedBy}
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                )}
            </Modal>
        </div>
    );
};

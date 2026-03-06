import React from "react";
import { Table, Space, Button, Tag, Input, Card, Avatar } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    SearchOutlined,
    PlusOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const CitizenList = () => {
    const navigate = useNavigate();

    const columns = [
        {
            title: "Citizen ID",
            dataIndex: "id",
            key: "id",
            width: 120,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text, record) => (
                <Space>
                    <Avatar icon={<UserOutlined />} src={record.avatar} />
                    <span>{text}</span>
                </Space>
            ),
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Department",
            dataIndex: "department",
            key: "department",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button
                        type="text"
                        icon={<EyeOutlined />}
                        onClick={() => navigate(`/citizens/show/${record.id}`)}
                    />
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => navigate(`/citizens/edit/${record.id}`)}
                    />
                    <Button type="text" danger icon={<DeleteOutlined />} />
                </Space>
            ),
        },
    ];

    const data = [
        {
            id: "C001",
            name: "Abebe Kebede",
            phone: "+251-911-234567",
            email: "abebe@example.com",
            department: "Civil Registry",
            status: "Active",
        },
        {
            id: "C002",
            name: "Tigist Haile",
            phone: "+251-911-345678",
            email: "tigist@example.com",
            department: "Health Services",
            status: "Active",
        },
        {
            id: "C003",
            name: "Dawit Tesfaye",
            phone: "+251-911-456789",
            email: "dawit@example.com",
            department: "Urban Planning",
            status: "Inactive",
        },
    ];

    return (
        <div>
            <div className="page-header">
                <h1>Citizens Management</h1>
            </div>

            <Card bordered={false} style={{ borderRadius: 12 }}>
                <Space style={{ marginBottom: 16, width: "100%", justifyContent: "space-between" }}>
                    <Input
                        placeholder="Search citizens..."
                        prefix={<SearchOutlined />}
                        style={{ width: 300 }}
                    />
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => navigate("/citizens/create")}
                    >
                        Add Citizen
                    </Button>
                </Space>

                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} citizens`,
                    }}
                />
            </Card>
        </div>
    );
};

export const CitizenCreate = () => {
    return (
        <div>
            <div className="page-header">
                <h1>Create New Citizen</h1>
            </div>
            <Card bordered={false} style={{ borderRadius: 12 }}>
                <p>Citizen creation form will be connected to your API</p>
            </Card>
        </div>
    );
};

export const CitizenEdit = () => {
    return (
        <div>
            <div className="page-header">
                <h1>Edit Citizen</h1>
            </div>
            <Card bordered={false} style={{ borderRadius: 12 }}>
                <p>Citizen edit form will be connected to your API</p>
            </Card>
        </div>
    );
};

export const CitizenShow = () => {
    return (
        <div>
            <div className="page-header">
                <h1>Citizen Details</h1>
            </div>
            <Card bordered={false} style={{ borderRadius: 12 }}>
                <p>Citizen details will be connected to your API</p>
            </Card>
        </div>
    );
};

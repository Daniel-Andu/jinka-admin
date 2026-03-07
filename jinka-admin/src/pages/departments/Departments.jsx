import React from "react";
import { Table, Space, Button, Tag, Input, Card, Avatar } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
    PlusOutlined,
    BankOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const DepartmentList = () => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = React.useState("");

    const columns = [
        {
            title: "Department",
            dataIndex: "name",
            key: "name",
            render: (text, record) => (
                <Space>
                    <Avatar icon={<BankOutlined />} style={{ backgroundColor: record.color }} />
                    <span>{text}</span>
                </Space>
            ),
        },
        {
            title: "Head",
            dataIndex: "head",
            key: "head",
        },
        {
            title: "Employees",
            dataIndex: "employees",
            key: "employees",
        },
        {
            title: "Contact",
            dataIndex: "contact",
            key: "contact",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status === "Operational" ? "green" : "orange"}>
                    {status}
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
                        onClick={() => navigate(`/departments/edit/${record.id}`)}
                    />
                    <Button type="text" danger icon={<DeleteOutlined />} />
                </Space>
            ),
        },
    ];

    const data = [
        {
            id: 1,
            name: "Civil Registry",
            head: "Ato Mulugeta Bekele",
            employees: 45,
            contact: "+251-467-775-1001",
            status: "Operational",
            color: "#1e5a8e",
        },
        {
            id: 2,
            name: "Urban Planning",
            head: "W/ro Almaz Tadesse",
            employees: 32,
            contact: "+251-467-775-1002",
            status: "Operational",
            color: "#0d9488",
        },
        {
            id: 3,
            name: "Health Services",
            head: "Dr. Yohannes Girma",
            employees: 67,
            contact: "+251-467-775-1003",
            status: "Operational",
            color: "#f59e0b",
        },
        {
            id: 4,
            name: "Finance",
            head: "Ato Tesfaye Wolde",
            employees: 28,
            contact: "+251-467-775-1004",
            status: "Operational",
            color: "#dc2626",
        },
    ];

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.head.toLowerCase().includes(searchText.toLowerCase()) ||
        item.contact.includes(searchText)
    );

    return (
        <div>
            <div className="page-header">
                <h1>Departments</h1>
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
                        onClick={() => navigate("/departments/create")}
                    >
                        Add Department
                    </Button>
                </Space>

                <Table
                    columns={columns}
                    dataSource={filteredData}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showTotal: (total) => `Total ${total} departments`,
                    }}
                />
            </Card>
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

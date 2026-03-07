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
import { useTranslation } from 'react-i18next';

export const CitizenList = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [searchText, setSearchText] = React.useState("");

    const columns = [
        {
            title: t('citizens.id'),
            dataIndex: "id",
            key: "id",
            width: 120,
        },
        {
            title: t('citizens.name'),
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
            title: t('citizens.phone'),
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: t('citizens.email'),
            dataIndex: "email",
            key: "email",
        },
        {
            title: t('citizens.department'),
            dataIndex: "department",
            key: "department",
        },
        {
            title: t('citizens.status'),
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
            ),
        },
        {
            title: t('citizens.actions'),
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

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.email.toLowerCase().includes(searchText.toLowerCase()) ||
        item.phone.includes(searchText) ||
        item.department.toLowerCase().includes(searchText.toLowerCase()) ||
        item.id.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div>
            <div className="page-header">
                <h1>{t('citizens.title')}</h1>
            </div>

            <Card bordered={false} style={{ borderRadius: 12 }}>
                <Space style={{ marginBottom: 16, width: "100%", justifyContent: "space-between" }}>
                    <Input
                        placeholder={t('citizens.search')}
                        prefix={<SearchOutlined />}
                        style={{ width: 300 }}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        allowClear
                    />
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => navigate("/citizens/create")}
                    >
                        {t('citizens.add')}
                    </Button>
                </Space>

                <Table
                    columns={columns}
                    dataSource={filteredData}
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

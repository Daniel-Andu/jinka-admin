import React from "react";
import { Table, Space, Button, Tag, Input, Card } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
    PlusOutlined,
    NotificationOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const AnnouncementList = () => {
    const navigate = useNavigate();

    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            render: (category) => {
                const colors = {
                    Emergency: "red",
                    General: "blue",
                    Event: "green",
                    Notice: "orange",
                };
                return <Tag color={colors[category]}>{category}</Tag>;
            },
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status === "Published" ? "green" : "orange"}>{status}</Tag>
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
                        onClick={() => navigate(`/announcements/edit/${record.id}`)}
                    />
                    <Button type="text" danger icon={<DeleteOutlined />} />
                </Space>
            ),
        },
    ];

    const data = [
        {
            id: 1,
            title: "City Council Meeting - March 2026",
            category: "Event",
            date: "2026-03-10",
            status: "Published",
        },
        {
            id: 2,
            title: "Road Maintenance Schedule",
            category: "Notice",
            date: "2026-03-08",
            status: "Published",
        },
        {
            id: 3,
            title: "Emergency Water Supply Alert",
            category: "Emergency",
            date: "2026-03-06",
            status: "Published",
        },
    ];

    return (
        <div>
            <div className="page-header">
                <h1>Announcements</h1>
            </div>

            <Card bordered={false} style={{ borderRadius: 12 }}>
                <Space style={{ marginBottom: 16, width: "100%", justifyContent: "space-between" }}>
                    <Input
                        placeholder="Search announcements..."
                        prefix={<SearchOutlined />}
                        style={{ width: 300 }}
                    />
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => navigate("/announcements/create")}
                    >
                        Create Announcement
                    </Button>
                </Space>

                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showTotal: (total) => `Total ${total} announcements`,
                    }}
                />
            </Card>
        </div>
    );
};

export const AnnouncementCreate = () => {
    return (
        <div>
            <div className="page-header">
                <h1>Create Announcement</h1>
            </div>
            <Card bordered={false} style={{ borderRadius: 12 }}>
                <p>Announcement creation form will be connected to your API</p>
            </Card>
        </div>
    );
};

export const AnnouncementEdit = () => {
    return (
        <div>
            <div className="page-header">
                <h1>Edit Announcement</h1>
            </div>
            <Card bordered={false} style={{ borderRadius: 12 }}>
                <p>Announcement edit form will be connected to your API</p>
            </Card>
        </div>
    );
};

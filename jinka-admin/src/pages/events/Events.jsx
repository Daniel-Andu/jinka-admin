import React, { useState } from "react";
import { Calendar, Card, Badge, Button, Modal, Form, Input, DatePicker, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

export const EventList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.validateFields().then((values) => {
            console.log("Event data:", values);
            message.success("Event added successfully! (This will be connected to your API)");
            form.resetFields();
            setIsModalOpen(false);
        });
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    const getListData = (value) => {
        let listData = [];

        if (value.date() === 10) {
            listData = [
                { type: "success", content: "City Council Meeting" },
            ];
        }
        if (value.date() === 15) {
            listData = [
                { type: "warning", content: "Budget Review" },
            ];
        }
        if (value.date() === 20) {
            listData = [
                { type: "error", content: "Emergency Drill" },
            ];
        }

        return listData || [];
    };

    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {listData.map((item, index) => (
                    <li key={index} style={{ marginBottom: 4 }}>
                        <Badge status={item.type} text={item.content} style={{ fontSize: 12 }} />
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div>
            <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>Events Calendar</h1>
                <Button type="primary" icon={<PlusOutlined />} size="large" onClick={showModal}>
                    Add Event
                </Button>
            </div>

            <Card bordered={false} style={{ borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <Calendar
                    cellRender={dateCellRender}
                    style={{ padding: "16px" }}
                />
            </Card>

            <Modal
                title="Add New Event"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Add Event"
                cancelText="Cancel"
                width={600}
            >
                <Form form={form} layout="vertical" style={{ marginTop: 24 }}>
                    <Form.Item
                        label="Event Title"
                        name="title"
                        rules={[{ required: true, message: "Please enter event title" }]}
                    >
                        <Input placeholder="Enter event title" size="large" />
                    </Form.Item>

                    <Form.Item
                        label="Event Date"
                        name="date"
                        rules={[{ required: true, message: "Please select event date" }]}
                    >
                        <DatePicker style={{ width: "100%" }} size="large" />
                    </Form.Item>

                    <Form.Item
                        label="Event Type"
                        name="type"
                        rules={[{ required: true, message: "Please select event type" }]}
                    >
                        <Select placeholder="Select event type" size="large">
                            <Select.Option value="meeting">Meeting</Select.Option>
                            <Select.Option value="training">Training</Select.Option>
                            <Select.Option value="ceremony">Ceremony</Select.Option>
                            <Select.Option value="emergency">Emergency</Select.Option>
                            <Select.Option value="other">Other</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Description" name="description">
                        <Input.TextArea rows={4} placeholder="Enter event description" />
                    </Form.Item>

                    <Form.Item label="Location" name="location">
                        <Input placeholder="Enter event location" size="large" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

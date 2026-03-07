import React, { useState } from "react";
import { Calendar, Card, Badge, Button, Modal, Form, Input, DatePicker, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

export const EventList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [events, setEvents] = useState([
        {
            id: 1,
            date: dayjs().date(10),
            type: "success",
            title: "City Council Meeting",
            description: "Monthly city council meeting to discuss budget and projects",
            location: "City Hall, Main Conference Room",
        },
        {
            id: 2,
            date: dayjs().date(15),
            type: "warning",
            title: "Budget Review",
            description: "Quarterly budget review with department heads",
            location: "Finance Department",
        },
        {
            id: 3,
            date: dayjs().date(20),
            type: "error",
            title: "Emergency Drill",
            description: "City-wide emergency response drill",
            location: "All Departments",
        },
    ]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleOk = () => {
        form.validateFields().then((values) => {
            const newEvent = {
                id: events.length + 1,
                date: values.date,
                type: values.type === "meeting" ? "success" : values.type === "emergency" ? "error" : "warning",
                title: values.title,
                description: values.description || "",
                location: values.location || "",
            };
            setEvents([...events, newEvent]);
            setIsModalOpen(false);
            form.resetFields();
            message.success("Event added successfully!");
        }).catch((error) => {
            console.error("Validation failed:", error);
        });
    };

    const dateCellRender = (value) => {
        const dayEvents = events.filter(event =>
            dayjs(event.date).isSame(value, 'day')
        );

        return (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {dayEvents.map((event) => (
                    <li key={event.id} style={{ marginBottom: 4 }}>
                        <Badge
                            status={event.type}
                            text={event.title}
                            style={{ fontSize: 12 }}
                        />
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

            <Card style={{ borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
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
import React, { useState } from "react";
import { Calendar, Card, Badge, Button, Modal, Form, Input, DatePicker, Select, message, Upload, Image, Descriptions } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

export const EventList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [form] = Form.useForm();
    const [events, setEvents] = useState([
        {
            id: 1,
            date: dayjs().date(10),
            type: "success",
            title: "City Council Meeting",
            description: "Monthly city council meeting to discuss budget and projects. All department heads are required to attend.",
            location: "City Hall, Main Conference Room",
            image: "https://via.placeholder.com/400x200?text=City+Council+Meeting",
            organizer: "City Administration",
            attendees: 50,
        },
        {
            id: 2,
            date: dayjs().date(15),
            type: "warning",
            title: "Budget Review",
            description: "Quarterly budget review with department heads to analyze spending and plan for next quarter.",
            location: "Finance Department",
            image: "https://via.placeholder.com/400x200?text=Budget+Review",
            organizer: "Finance Department",
            attendees: 25,
        },
        {
            id: 3,
            date: dayjs().date(20),
            type: "error",
            title: "Emergency Drill",
            description: "City-wide emergency response drill to test preparedness and coordination.",
            location: "All Departments",
            image: "https://via.placeholder.com/400x200?text=Emergency+Drill",
            organizer: "Emergency Services",
            attendees: 200,
        },
    ]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setUploadedImage(null);
        form.resetFields();
    };

    const handleImageUpload = (info) => {
        const file = info.file.originFileObj || info.file;
        const reader = new FileReader();
        reader.onload = (e) => {
            setUploadedImage(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const uploadProps = {
        beforeUpload: (file) => {
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
                message.error('You can only upload image files!');
                return false;
            }
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
                message.error('Image must be smaller than 5MB!');
                return false;
            }
            return false;
        },
        onChange: handleImageUpload,
        showUploadList: false,
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
                image: uploadedImage || "https://via.placeholder.com/400x200?text=Event",
                organizer: values.organizer || "City Administration",
                attendees: values.attendees || 0,
            };
            setEvents([...events, newEvent]);
            setIsModalOpen(false);
            setUploadedImage(null);
            form.resetFields();
            message.success("Event added successfully!");
        }).catch((error) => {
            console.error("Validation failed:", error);
        });
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setIsDetailModalOpen(true);
    };

    const dateCellRender = (value) => {
        const dayEvents = events.filter(event =>
            dayjs(event.date).isSame(value, 'day')
        );

        return (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {dayEvents.map((event) => (
                    <li
                        key={event.id}
                        style={{ marginBottom: 4, cursor: "pointer" }}
                        onClick={() => handleEventClick(event)}
                    >
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

            {/* Add Event Modal */}
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

                    <Form.Item label="Organizer" name="organizer">
                        <Input placeholder="Enter organizer name" size="large" />
                    </Form.Item>

                    <Form.Item label="Expected Attendees" name="attendees">
                        <Input type="number" placeholder="Enter number of attendees" size="large" />
                    </Form.Item>

                    <Form.Item label="Event Image">
                        <Upload {...uploadProps}>
                            <Button icon={<UploadOutlined />} size="large" style={{ width: "100%" }}>
                                Upload Event Image
                            </Button>
                        </Upload>
                        {uploadedImage && (
                            <div style={{ marginTop: 12 }}>
                                <Image src={uploadedImage} alt="Preview" style={{ maxWidth: "100%", borderRadius: 8 }} />
                            </div>
                        )}
                    </Form.Item>
                </Form>
            </Modal>

            {/* Event Detail Modal */}
            <Modal
                title="Event Details"
                open={isDetailModalOpen}
                onCancel={() => setIsDetailModalOpen(false)}
                footer={[
                    <Button key="close" onClick={() => setIsDetailModalOpen(false)}>
                        Close
                    </Button>
                ]}
                width={700}
            >
                {selectedEvent && (
                    <div>
                        {selectedEvent.image && (
                            <Image
                                src={selectedEvent.image}
                                alt={selectedEvent.title}
                                style={{ width: "100%", borderRadius: 8, marginBottom: 24 }}
                            />
                        )}
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Event Title">
                                <strong style={{ fontSize: 16 }}>{selectedEvent.title}</strong>
                            </Descriptions.Item>
                            <Descriptions.Item label="Date">
                                {dayjs(selectedEvent.date).format("MMMM D, YYYY")}
                            </Descriptions.Item>
                            <Descriptions.Item label="Description">
                                {selectedEvent.description}
                            </Descriptions.Item>
                            <Descriptions.Item label="Location">
                                {selectedEvent.location}
                            </Descriptions.Item>
                            <Descriptions.Item label="Organizer">
                                {selectedEvent.organizer}
                            </Descriptions.Item>
                            <Descriptions.Item label="Expected Attendees">
                                {selectedEvent.attendees} people
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                )}
            </Modal>
        </div>
    );
};

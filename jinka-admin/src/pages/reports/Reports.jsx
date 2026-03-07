import React, { useState } from "react";
import { Card, Row, Col, Statistic, Button, Space, Select, message } from "antd";
import {
    DownloadOutlined,
    PrinterOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
} from "@ant-design/icons";
import { useTranslation } from 'react-i18next';

export const ReportList = () => {
    const { t } = useTranslation();

    // System-calculated department performance (recommended approach)
    const [departmentData] = useState([
        {
            name: "Civil Registry",
            completedTasks: 950,
            totalTasks: 1000,
            performance: 95,
            trend: "up",
            color: "#0d9488"
        },
        {
            name: "Urban Planning",
            completedTasks: 435,
            totalTasks: 500,
            performance: 87,
            trend: "up",
            color: "#1e5a8e"
        },
        {
            name: "Health Services",
            completedTasks: 460,
            totalTasks: 500,
            performance: 92,
            trend: "stable",
            color: "#f59e0b"
        },
        {
            name: "Finance",
            completedTasks: 390,
            totalTasks: 500,
            performance: 78,
            trend: "down",
            color: "#dc2626"
        }
    ]);

    const handleExport = () => {
        message.success("Report exported successfully! (This will be connected to your API)");
    };

    const handlePrint = () => {
        window.print();
    };

    const getTrendIcon = (trend) => {
        if (trend === "up") return <ArrowUpOutlined style={{ color: "#0d9488" }} />;
        if (trend === "down") return <ArrowDownOutlined style={{ color: "#dc2626" }} />;
        return <span style={{ color: "#6b7280" }}>—</span>;
    };

    return (
        <div>
            <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>{t('reports.title')}</h1>
                <Space>
                    <Select defaultValue="month" style={{ width: 150 }} size="large">
                        <Select.Option value="week">This Week</Select.Option>
                        <Select.Option value="month">This Month</Select.Option>
                        <Select.Option value="quarter">This Quarter</Select.Option>
                        <Select.Option value="year">This Year</Select.Option>
                    </Select>
                    <Button icon={<PrinterOutlined />} size="large" onClick={handlePrint}>
                        {t('reports.print')}
                    </Button>
                    <Button type="primary" icon={<DownloadOutlined />} size="large" onClick={handleExport}>
                        {t('reports.export')}
                    </Button>
                </Space>
            </div>

            <Row gutter={[24, 24]}>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} style={{ borderRadius: 12 }}>
                        <Statistic
                            title="Total Revenue"
                            value={2.4}
                            precision={2}
                            valueStyle={{ color: "#0d9488" }}
                            prefix="ETB"
                            suffix="M"
                        />
                        <div style={{ marginTop: 8, fontSize: 13, color: "#0d9488" }}>
                            <ArrowUpOutlined /> 8.2% from last month
                        </div>
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} style={{ borderRadius: 12 }}>
                        <Statistic
                            title="New Registrations"
                            value={1247}
                            valueStyle={{ color: "#1e5a8e" }}
                        />
                        <div style={{ marginTop: 8, fontSize: 13, color: "#0d9488" }}>
                            <ArrowUpOutlined /> 12.5% from last month
                        </div>
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} style={{ borderRadius: 12 }}>
                        <Statistic
                            title="Pending Requests"
                            value={342}
                            valueStyle={{ color: "#f59e0b" }}
                        />
                        <div style={{ marginTop: 8, fontSize: 13, color: "#0d9488" }}>
                            <ArrowDownOutlined /> 12% from yesterday
                        </div>
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} style={{ borderRadius: 12 }}>
                        <Statistic
                            title="Completed Tasks"
                            value={89}
                            suffix="%"
                            valueStyle={{ color: "#0d9488" }}
                        />
                        <div style={{ marginTop: 8, fontSize: 13, color: "#0d9488" }}>
                            <ArrowUpOutlined /> 5% this week
                        </div>
                    </Card>
                </Col>
            </Row>

            <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
                <Col xs={24} lg={12}>
                    <Card
                        title={
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span>Department Performance</span>
                                <span style={{ fontSize: 12, color: "#6b7280", fontWeight: "normal" }}>
                                    Auto-calculated from system data
                                </span>
                            </div>
                        }
                        bordered={false}
                        style={{ borderRadius: 12 }}
                    >
                        <Space direction="vertical" style={{ width: "100%" }} size="large">
                            {departmentData.map((dept, index) => (
                                <div key={index}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                        <span>{dept.name}</span>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                            <span style={{ fontSize: 12, color: "#6b7280" }}>
                                                {dept.completedTasks}/{dept.totalTasks} tasks
                                            </span>
                                            {getTrendIcon(dept.trend)}
                                            <span style={{ fontWeight: 600 }}>{dept.performance}%</span>
                                        </div>
                                    </div>
                                    <div style={{ height: 8, background: "#f3f4f6", borderRadius: 4 }}>
                                        <div
                                            style={{
                                                width: `${dept.performance}%`,
                                                height: "100%",
                                                background: dept.color,
                                                borderRadius: 4,
                                                transition: "width 0.3s ease"
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </Space>
                    </Card>
                </Col>

                <Col xs={24} lg={12}>
                    <Card title="Monthly Trends" bordered={false} style={{ borderRadius: 12 }}>
                        <p style={{ color: "#6b7280", textAlign: "center", padding: "40px 0" }}>
                            Chart visualization will be connected to your API data
                        </p>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
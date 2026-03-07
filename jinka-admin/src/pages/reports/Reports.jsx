import React from "react";
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
    const handleExport = () => {
        message.success("Report exported successfully! (This will be connected to your API)");
    };

    const handlePrint = () => {
        window.print();
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
                    <Card title="Department Performance" bordered={false} style={{ borderRadius: 12 }}>
                        <Space direction="vertical" style={{ width: "100%" }} size="large">
                            <div>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                    <span>Civil Registry</span>
                                    <span style={{ fontWeight: 600 }}>95%</span>
                                </div>
                                <div style={{ height: 8, background: "#f3f4f6", borderRadius: 4 }}>
                                    <div style={{ width: "95%", height: "100%", background: "#0d9488", borderRadius: 4 }} />
                                </div>
                            </div>
                            <div>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                    <span>Urban Planning</span>
                                    <span style={{ fontWeight: 600 }}>87%</span>
                                </div>
                                <div style={{ height: 8, background: "#f3f4f6", borderRadius: 4 }}>
                                    <div style={{ width: "87%", height: "100%", background: "#1e5a8e", borderRadius: 4 }} />
                                </div>
                            </div>
                            <div>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                    <span>Health Services</span>
                                    <span style={{ fontWeight: 600 }}>92%</span>
                                </div>
                                <div style={{ height: 8, background: "#f3f4f6", borderRadius: 4 }}>
                                    <div style={{ width: "92%", height: "100%", background: "#f59e0b", borderRadius: 4 }} />
                                </div>
                            </div>
                            <div>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                    <span>Finance</span>
                                    <span style={{ fontWeight: 600 }}>78%</span>
                                </div>
                                <div style={{ height: 8, background: "#f3f4f6", borderRadius: 4 }}>
                                    <div style={{ width: "78%", height: "100%", background: "#dc2626", borderRadius: 4 }} />
                                </div>
                            </div>
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

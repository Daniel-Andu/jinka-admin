import React from "react";
import { Row, Col, Card, Typography, Space } from "antd";
import {
    TeamOutlined,
    BankOutlined,
    FileTextOutlined,
    RiseOutlined,
    CalendarOutlined,
    InfoCircleOutlined,
    CheckCircleOutlined,
    WarningOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

export const Dashboard = () => {
    const { t } = useTranslation();
    const stats = [
        {
            title: t('dashboard.totalCitizens'),
            value: "124,856",
            change: "+2.5% from last month",
            changeType: "positive",
            icon: <TeamOutlined />,
            color: "blue",
        },
        {
            title: t('dashboard.activeDepartments'),
            value: "24",
            change: "All operational",
            changeType: "neutral",
            icon: <BankOutlined />,
            color: "green",
        },
        {
            title: t('dashboard.pendingRequests'),
            value: "342",
            change: "-12% from yesterday",
            changeType: "positive",
            icon: <FileTextOutlined />,
            color: "orange",
        },
        {
            title: t('dashboard.monthlyRevenue'),
            value: "2.4M ETB",
            change: "+8.2% from last month",
            changeType: "positive",
            icon: <RiseOutlined />,
            color: "red",
        },
    ];

    const recentActivities = [
        {
            id: 1,
            title: "New citizen registration",
            department: "Civil Registry",
            time: "5 minutes ago",
            type: "info",
            icon: <InfoCircleOutlined />,
        },
        {
            id: 2,
            title: "Building permit approved",
            department: "Urban Planning",
            time: "12 minutes ago",
            type: "success",
            icon: <CheckCircleOutlined />,
        },
        {
            id: 3,
            title: "Emergency alert issued",
            department: "Public Safety",
            time: "25 minutes ago",
            type: "warning",
            icon: <WarningOutlined />,
        },
        {
            id: 4,
            title: "Budget report submitted",
            department: "Finance",
            time: "1 hour ago",
            type: "info",
            icon: <InfoCircleOutlined />,
        },
        {
            id: 5,
            title: "Health inspection completed",
            department: "Health Services",
            time: "2 hours ago",
            type: "success",
            icon: <CheckCircleOutlined />,
        },
    ];

    return (
        <div>
            {/* Dashboard Header */}
            <div className="dashboard-header">
                <Title level={2} style={{ color: "white", marginBottom: 8 }}>
                    {t('dashboard.title')}
                </Title>
                <Text style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: 16 }}>
                    {t('dashboard.welcome')}
                </Text>
                <div className="date" style={{ marginTop: 12 }}>
                    <CalendarOutlined />
                    <span>{dayjs().format("dddd, MMMM D, YYYY")}</span>
                </div>
            </div>

            {/* Statistics Cards */}
            <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
                {stats.map((stat, index) => (
                    <Col xs={24} sm={12} lg={6} key={index}>
                        <div className="stat-card">
                            <div className="stat-card-header">
                                <div>
                                    <div className="stat-card-title">{stat.title}</div>
                                    <div className="stat-card-value">{stat.value}</div>
                                    <div className={`stat-card-change ${stat.changeType}`}>
                                        {stat.change}
                                    </div>
                                </div>
                                <div className={`stat-card-icon ${stat.color}`}>
                                    {stat.icon}
                                </div>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>

            {/* Recent Activities */}
            <Row gutter={[24, 24]}>
                <Col xs={24} lg={16}>
                    <Card
                        title={
                            <Space>
                                <CalendarOutlined />
                                <span>{t('dashboard.recentActivities')}</span>
                            </Space>
                        }
                        extra={
                            <a href="#" style={{ color: "#1e5a8e" }}>
                                View All
                            </a>
                        }
                        bordered={false}
                        style={{ borderRadius: 12 }}
                    >
                        {recentActivities.map((activity) => (
                            <div key={activity.id} className="activity-item">
                                <div className={`activity-icon ${activity.type}`}>
                                    {activity.icon}
                                </div>
                                <div className="activity-content">
                                    <div className="activity-title">{activity.title}</div>
                                    <div className="activity-department">
                                        {activity.department}
                                    </div>
                                </div>
                                <div className="activity-time">{activity.time}</div>
                            </div>
                        ))}
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Card
                        title={t('dashboard.quickStats')}
                        bordered={false}
                        style={{ borderRadius: 12, marginBottom: 24 }}
                    >
                        <Space direction="vertical" style={{ width: "100%" }} size="large">
                            <div>
                                <Text type="secondary">Today's Registrations</Text>
                                <Title level={3} style={{ margin: "8px 0" }}>
                                    47
                                </Title>
                                <Text type="success">↑ 12% from yesterday</Text>
                            </div>
                            <div>
                                <Text type="secondary">Active Users</Text>
                                <Title level={3} style={{ margin: "8px 0" }}>
                                    1,234
                                </Title>
                                <Text type="secondary">Online now</Text>
                            </div>
                            <div>
                                <Text type="secondary">Completed Tasks</Text>
                                <Title level={3} style={{ margin: "8px 0" }}>
                                    89%
                                </Title>
                                <Text type="success">↑ 5% this week</Text>
                            </div>
                        </Space>
                    </Card>

                    <Card
                        title={t('dashboard.systemStatus')}
                        bordered={false}
                        style={{ borderRadius: 12 }}
                    >
                        <Space direction="vertical" style={{ width: "100%" }} size="middle">
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Text>Database</Text>
                                <Text type="success">● Operational</Text>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Text>API Server</Text>
                                <Text type="success">● Operational</Text>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Text>Backup System</Text>
                                <Text type="success">● Operational</Text>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Text>Last Backup</Text>
                                <Text type="secondary">2 hours ago</Text>
                            </div>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

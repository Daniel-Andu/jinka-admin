import React, { useState } from "react";
import { Layout, Menu, Avatar, Dropdown, Badge, Input, Button, Space, Drawer, List, Typography } from "antd";
import {
    DashboardOutlined,
    BankOutlined,
    TeamOutlined,
    NotificationOutlined,
    ProjectOutlined,
    CalendarOutlined,
    FileTextOutlined,
    BarChartOutlined,
    MessageOutlined,
    SettingOutlined,
    BellOutlined,
    SearchOutlined,
    UserOutlined,
    LogoutOutlined,
    GlobalOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import "./style.css";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

export const ThemedLayoutV2 = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [notificationDrawer, setNotificationDrawer] = useState(false);
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "New citizen registration",
            description: "A new citizen has been registered in the system",
            time: "5 minutes ago",
            type: "info",
            read: false,
        },
        {
            id: 2,
            title: "Building permit approved",
            description: "Building permit #12345 has been approved",
            time: "1 hour ago",
            type: "success",
            read: false,
        },
        {
            id: 3,
            title: "System maintenance scheduled",
            description: "System maintenance is scheduled for tonight at 2 AM",
            time: "3 hours ago",
            type: "warning",
            read: false,
        },
        {
            id: 4,
            title: "New announcement published",
            description: "City Council Meeting announcement has been published",
            time: "5 hours ago",
            type: "info",
            read: false,
        },
        {
            id: 5,
            title: "Budget report submitted",
            description: "Monthly budget report has been submitted",
            time: "1 day ago",
            type: "success",
            read: false,
        },
    ]);
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const handleClearAll = () => {
        setNotifications([]);
    };

    const handleRemoveNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const menuItems = [
        {
            key: "/",
            icon: <DashboardOutlined />,
            label: t('menu.dashboard'),
        },
        {
            key: "/departments",
            icon: <BankOutlined />,
            label: t('menu.departments'),
        },
        {
            key: "/citizens",
            icon: <TeamOutlined />,
            label: t('menu.citizens'),
        },
        {
            key: "/announcements",
            icon: <NotificationOutlined />,
            label: t('menu.announcements'),
            children: [
                {
                    key: "/announcements",
                    label: t('announcements.title'),
                },
                {
                    key: "/announcements/create",
                    label: t('announcements.create'),
                },
            ],
        },
        {
            key: "/projects",
            icon: <ProjectOutlined />,
            label: t('menu.projects'),
        },
        {
            key: "/events",
            icon: <CalendarOutlined />,
            label: t('menu.events'),
        },
        {
            key: "/documents",
            icon: <FileTextOutlined />,
            label: t('menu.documents'),
        },
        {
            key: "/reports",
            icon: <BarChartOutlined />,
            label: t('menu.reports'),
        },
        {
            key: "/messages",
            icon: <MessageOutlined />,
            label: t('menu.messages'),
        },
        {
            key: "/settings",
            icon: <SettingOutlined />,
            label: t('menu.settings'),
        },
    ];

    const userMenuItems = [
        {
            key: "profile",
            icon: <UserOutlined />,
            label: "Profile",
        },
        {
            key: "settings",
            icon: <SettingOutlined />,
            label: "Settings",
        },
        {
            type: "divider",
        },
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: "Logout",
            danger: true,
        },
    ];

    const languageMenuItems = [
        {
            key: "en",
            label: "English",
            onClick: () => changeLanguage('en'),
        },
        {
            key: "am",
            label: "አማርኛ (Amharic)",
            onClick: () => changeLanguage('am'),
        },
        {
            key: "or",
            label: "Afaan Oromoo (Oromo)",
            onClick: () => changeLanguage('or'),
        },
    ];

    const handleMenuClick = ({ key }) => {
        navigate(key);
    };

    const handleUserMenuClick = ({ key }) => {
        if (key === "logout") {
            navigate("/login");
        } else if (key === "settings") {
            navigate("/settings");
        }
    };

    const handleLanguageChange = ({ key }) => {
        changeLanguage(key);
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={setCollapsed}
                width={260}
                className="custom-sider"
                breakpoint="lg"
                collapsedWidth={80}
                style={{ position: "relative", paddingBottom: collapsed ? 0 : 80 }}
            >
                <div className="logo-container">
                    <div className="logo-icon">
                        <BankOutlined style={{ fontSize: 24, color: "white" }} />
                    </div>
                    {!collapsed && (
                        <div className="logo-text">
                            <div className="logo-title">{t('app.title')}</div>
                            <div className="logo-subtitle">{t('app.subtitle')}</div>
                        </div>
                    )}
                </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    onClick={handleMenuClick}
                    className="custom-menu"
                    style={{ marginBottom: collapsed ? 0 : 80 }}
                />

                {!collapsed && (
                    <div className="sidebar-footer">
                        <Avatar
                            size={48}
                            style={{ backgroundColor: "#0d9488", border: "2px solid rgba(255,255,255,0.2)" }}
                            icon={<UserOutlined />}
                        />
                        <div className="user-info">
                            <div className="user-name">{t('header.profile')}</div>
                            <div className="user-email">admin@jinka.gov.et</div>
                        </div>
                    </div>
                )}
            </Sider>

            <Layout>
                <Header className="custom-header">
                    <div className="header-left">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            className="trigger-btn"
                        />
                        <div className="header-branding">
                            <div className="header-title">
                                <div>{t('app.title')}</div>
                                <div>{t('app.subtitle')}</div>
                            </div>
                        </div>
                    </div>

                    <div className="header-right">
                        <Input
                            placeholder={t('header.search')}
                            prefix={<SearchOutlined style={{ color: "#1e5a8e" }} />}
                            className="header-search"
                            style={{ width: 350 }}
                        />

                        <Dropdown
                            menu={{
                                items: languageMenuItems,
                                onClick: handleLanguageChange,
                                selectedKeys: [i18n.language],
                            }}
                            placement="bottomRight"
                        >
                            <Button className="language-btn">
                                <GlobalOutlined />
                                <span>
                                    {i18n.language === "en" ? "EN" : i18n.language === "am" ? "አማ" : "OR"}
                                </span>
                            </Button>
                        </Dropdown>

                        <div className="header-divider"></div>

                        <Badge count={notifications.length} size="default" offset={[-3, 3]}>
                            <Button
                                type="text"
                                icon={<BellOutlined />}
                                className="header-btn"
                                onClick={() => setNotificationDrawer(true)}
                            />
                        </Badge>

                        <div className="header-divider"></div>

                        <Dropdown
                            menu={{
                                items: userMenuItems,
                                onClick: handleUserMenuClick,
                            }}
                            placement="bottomRight"
                        >
                            <div className="user-dropdown">
                                <Avatar
                                    size={40}
                                    style={{
                                        backgroundColor: "#0d9488",
                                        border: "2px solid #e5e7eb"
                                    }}
                                    icon={<UserOutlined />}
                                />
                                <div className="user-dropdown-info">
                                    <div className="user-dropdown-name">{t('header.profile')}</div>
                                    <div className="user-dropdown-role">{t('header.user')}</div>
                                </div>
                            </div>
                        </Dropdown>
                    </div>
                </Header>

                <Content className="custom-content">{children}</Content>

                <Drawer
                    title={t('header.notifications')}
                    placement="right"
                    onClose={() => setNotificationDrawer(false)}
                    open={notificationDrawer}
                    width={400}
                >
                    <List
                        dataSource={notifications}
                        renderItem={(item) => (
                            <List.Item style={{ borderBottom: "1px solid #f0f0f0", padding: "16px 0" }}>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            style={{
                                                backgroundColor:
                                                    item.type === "success"
                                                        ? "#0d9488"
                                                        : item.type === "warning"
                                                            ? "#f59e0b"
                                                            : "#1e5a8e",
                                            }}
                                            icon={<BellOutlined />}
                                        />
                                    }
                                    title={<Text strong>{item.title}</Text>}
                                    description={
                                        <>
                                            <Text type="secondary" style={{ display: "block", marginBottom: 4 }}>
                                                {item.description}
                                            </Text>
                                            <Text type="secondary" style={{ fontSize: 12 }}>
                                                {item.time}
                                            </Text>
                                        </>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </Drawer>
            </Layout>
        </Layout>
    );
};

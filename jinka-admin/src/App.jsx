import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerBindings, {
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { ConfigProvider, App as AntdApp } from "antd";

import { ThemedLayoutV2 } from "./components/layout";
import { Dashboard } from "./pages/dashboard";
import { DepartmentList, DepartmentCreate, DepartmentEdit } from "./pages/departments";
import { AnnouncementList, AnnouncementCreate, AnnouncementEdit } from "./pages/announcements";
import { ProjectList } from "./pages/projects";
import { EventList } from "./pages/events";
import { DocumentList } from "./pages/documents";
import { ReportList } from "./pages/reports";
import { MessageList } from "./pages/messages";
import { SettingsPage } from "./pages/settings";
import { LoginPage } from "./pages/login";

import "./App.css";

const API_URL = "https://api.jinka.gov.et"; // Replace with actual API

function App() {
    return (
        <BrowserRouter>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#1e5a8e",
                        borderRadius: 8,
                        fontFamily: "'Inter', sans-serif",
                    },
                }}
            >
                <RefineKbarProvider>
                    <AntdApp>
                        <Refine
                            dataProvider={dataProvider(API_URL)}
                            routerProvider={routerBindings}
                            resources={[
                                {
                                    name: "dashboard",
                                    list: "/",
                                    meta: {
                                        label: "Dashboard",
                                        icon: "📊",
                                    },
                                },
                                {
                                    name: "departments",
                                    list: "/departments",
                                    create: "/departments/create",
                                    edit: "/departments/edit/:id",
                                    meta: {
                                        label: "Departments",
                                    },
                                },
                                {
                                    name: "announcements",
                                    list: "/announcements",
                                    create: "/announcements/create",
                                    edit: "/announcements/edit/:id",
                                    meta: {
                                        label: "Announcements",
                                    },
                                },
                                {
                                    name: "projects",
                                    list: "/projects",
                                    meta: {
                                        label: "Projects",
                                    },
                                },
                                {
                                    name: "events",
                                    list: "/events",
                                    meta: {
                                        label: "Events",
                                    },
                                },
                                {
                                    name: "documents",
                                    list: "/documents",
                                    meta: {
                                        label: "Documents",
                                    },
                                },
                                {
                                    name: "reports",
                                    list: "/reports",
                                    meta: {
                                        label: "Reports",
                                    },
                                },
                                {
                                    name: "messages",
                                    list: "/messages",
                                    meta: {
                                        label: "Messages",
                                    },
                                },
                                {
                                    name: "settings",
                                    list: "/settings",
                                    meta: {
                                        label: "Settings",
                                    },
                                },
                            ]}
                            options={{
                                syncWithLocation: true,
                                warnWhenUnsavedChanges: true,
                            }}
                        >
                            <Routes>
                                <Route path="/login" element={<LoginPage />} />
                                <Route
                                    element={
                                        <ThemedLayoutV2>
                                            <Outlet />
                                        </ThemedLayoutV2>
                                    }
                                >
                                    <Route index element={<Dashboard />} />
                                    <Route path="/departments">
                                        <Route index element={<DepartmentList />} />
                                        <Route path="create" element={<DepartmentCreate />} />
                                        <Route path="edit/:id" element={<DepartmentEdit />} />
                                    </Route>
                                    <Route path="/announcements">
                                        <Route index element={<AnnouncementList />} />
                                        <Route path="create" element={<AnnouncementCreate />} />
                                        <Route path="edit/:id" element={<AnnouncementEdit />} />
                                    </Route>
                                    <Route path="/projects" element={<ProjectList />} />
                                    <Route path="/events" element={<EventList />} />
                                    <Route path="/documents" element={<DocumentList />} />
                                    <Route path="/reports" element={<ReportList />} />
                                    <Route path="/messages" element={<MessageList />} />
                                    <Route path="/settings" element={<SettingsPage />} />
                                </Route>
                            </Routes>
                            <RefineKbar />
                            <UnsavedChangesNotifier />
                        </Refine>
                    </AntdApp>
                </RefineKbarProvider>
            </ConfigProvider>
        </BrowserRouter>
    );
}

export default App;

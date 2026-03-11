import api from "./api";

export const newsletterService = {
    send: async ({ subject, message, html, testEmail } = {}) => {
        const response = await api.post("/admin/newsletter/send", {
            subject,
            message,
            html,
            testEmail,
        });
        return response;
    },
};


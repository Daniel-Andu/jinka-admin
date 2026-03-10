// import React, { useState, useEffect } from 'react';
// import { Alert } from 'antd';
// import { API_URL } from '../services/api';

// export const ConnectionStatus = () => {
//     const [isConnected, setIsConnected] = useState(null);
//     const [checking, setChecking] = useState(true);

//     useEffect(() => {
//         const checkConnection = async () => {
//             try {
//                 // Try to reach the backend - even 401 means it's connected
//                 const response = await fetch(`${API_URL}/admin/departments`, {
//                     method: 'GET',
//                     headers: { 'Content-Type': 'application/json' },
//                 });
//                 // 401 (unauthorized) or 200 means backend is running
//                 setIsConnected(response.status === 401 || response.ok);
//             } catch (error) {
//                 setIsConnected(false);
//             } finally {
//                 setChecking(false);
//             }
//         };

//         checkConnection();
//         // Check every 30 seconds
//         const interval = setInterval(checkConnection, 30000);
//         return () => clearInterval(interval);
//     }, []);

//     if (checking) return null;

//     if (!isConnected) {
//         return (
//             <Alert
//                 message="Backend Not Connected"
//                 description={
//                     <div>
//                         <p>Cannot connect to backend API at: <strong>{API_URL}</strong></p>
//                         <p>Please make sure the backend server is running on port 5001.</p>
//                         <p>See <strong>START_BACKEND.md</strong> for instructions.</p>
//                     </div>
//                 }
//                 type="error"
//                 showIcon
//                 closable
//                 style={{ margin: '16px' }}
//             />
//         );
//     }

//     return null;
// };


import React, { useState, useEffect } from 'react';
import { Alert } from 'antd';
import { API_URL } from '../services/api';

export const ConnectionStatus = () => {
    const [isConnected, setIsConnected] = useState(null);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const checkConnection = async () => {
            try {
                // Try to reach the backend - even 401 means it's connected
                const response = await fetch(`${API_URL}/admin/departments`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                // 401 (unauthorized) or 200 means backend is running
                setIsConnected(response.status === 401 || response.ok);
            } catch (error) {
                setIsConnected(false);
            } finally {
                setChecking(false);
            }
        };

        checkConnection();
        // Check every 30 seconds
        const interval = setInterval(checkConnection, 30000);
        return () => clearInterval(interval);
    }, []);

    if (checking) return null;

    if (!isConnected) {
        return (
            <Alert
                message="Backend Not Connected"
                description={
                    <div>
                        <p>
                            Cannot connect to backend API at: <strong>{API_URL}</strong>
                        </p>
                        <p>
                            Please make sure the backend server is running and accessible.
                        </p>
                        <p>
                            Contact your system administrator if the issue persists.
                        </p>
                    </div>
                }
                type="error"
                showIcon
                closable
                style={{ margin: '16px' }}
            />
        );
    }

    return null;
};
import { useState } from 'react';
import axios from 'axios';

const ResetPassword = () => {
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleResetPassword = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/user/resetpassword', { otp, newPassword });
            setMessage(response.data.message);
        } catch (error) {
            console.error(error);
            setMessage("Error resetting password. Please try again.");
        }
    };

    return (
        <div>
            <h1>Reset Password</h1>
            <form onSubmit={handleResetPassword}>
                <label>OTP:</label>
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                />
                <label>New Password:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;

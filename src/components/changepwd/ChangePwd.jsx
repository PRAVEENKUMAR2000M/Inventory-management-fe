import React, { useState } from 'react'
import './changepwd.css'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../services/authService';
import { toast } from 'react-toastify';

const initialState = {
    oldPassword: "",
    password: "",
    password2: "",
};


const ChangePwd = () => {

    const navigate = useNavigate();
    const [formData, setformData] = useState(initialState);
    const { oldPassword, password, password2 } = formData;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value });
    };

    const handleChangePass = async (e) => {
        e.preventDefault();

        if (password !== password2) {
            return toast.error("New passwords do not match");
        }

        const formData = {
            oldPassword,
            password,
        };

        const data = await changePassword(formData);
        toast.success(data);
        navigate("/profile");
    };

    return (
        <div className='change-password'>
            <Card className='password-card'>
                <h3>Change Password</h3>
                <form name="changepwd" onSubmit={handleChangePass} className="--form-control">
                    <label htmlFor="oldPassword">Current Password</label>
                    <input
                        type="password"
                        placeholder="Old Password"
                        required
                        name="oldPassword"
                        value={oldPassword}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="password">Enter new Password</label>
                    <input
                        type="password"
                        placeholder="New Password"
                        required
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="password2">Confirm new Password</label>
                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        required
                        name="password2"
                        value={password2}
                        onChange={handleInputChange}
                    />
                    <button type="submit" className="--btn --btn-primary">Update Password</button>
                </form>
            </Card>
        </div >
    )
}

export default ChangePwd
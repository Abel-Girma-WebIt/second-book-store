import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const [userData, setUserData] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useState(null);

    function getLogInData(e) {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    async function onLogInClick(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/user/login', userData);
            console.log("Successfully logged In!");
            navigate('/books/all-books');
            setUserData({ username: "", password: "" });
            setLoginStatus(true);
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                console.error(error);
                toast.error("An error occurred. Please try again.");
            }
            setLoginStatus(false);
        }
    }

    return (
        <div id="login_div">
            <div className="login_items_div"><h1>Bella.Come New User</h1></div>
            <div className="login_items_div"><label className='login_labels' htmlFor="">Username :</label><input onChange={getLogInData} name="username" value={userData.username} className="log_in_input_areas" type="text" /></div>
            <div className="login_items_div"><label className='login_labels' htmlFor="">password :</label><input onChange={getLogInData} name="password" value={userData.password} className="log_in_input_areas" type="text" /></div>
            <div className="login_items_div"><button onClick={onLogInClick} className='log_in-register_btn'>LogIn</button></div>
            <div className="login_items_div"><p>New to Bella? </p><button className='log_in-register_btn'><Link to='/user/register'>Register</Link></button></div>
            <ToastContainer />
        </div>
    );
}

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const navigate = useNavigate();

    const [newUserData, setNewUserData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        password: ""
    });

    function getLogInData(e) {
        setNewUserData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    }

    async function onRegsiterClick(e) {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/user/register', newUserData);
            console.log("Successfully created an account!");
            setNewUserData({
                firstname: "",
                lastname: "",
                email: "",
                username: "",
                password: ""
            });
            toast.success(res.data.message);
            navigate('/user/login'); // Redirect after successful registration
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                console.error(error);
                toast.error("An error occurred. Please try again.");
            }
        }
    }

    return (
        <div id="login_div">
            <div className="login_items_div"><h1>Welcome to Bella.Come</h1></div>
            <div className="login_items_div"><p>Please create your account here</p></div>
            <div className="login_items_div"><label className='login_labels' htmlFor="">First Name :</label><input onChange={getLogInData} value={newUserData.firstname} className="log_in_input_areas" name="firstname" type="text" /></div>
            <div className="login_items_div"><label className='login_labels' htmlFor="">Last Name :</label><input onChange={getLogInData} value={newUserData.lastname} className="log_in_input_areas" name="lastname" type="text" /></div>
            <div className="login_items_div"><label className='login_labels' htmlFor="">Email :</label><input onChange={getLogInData} value={newUserData.email} className="log_in_input_areas" name="email" placeholder="example123@gmail.com" type="email" /></div>
            <div className="login_items_div"><label className='login_labels' htmlFor="">Username :</label><input onChange={getLogInData} value={newUserData.username} className="log_in_input_areas" name="username" type="text" /></div>
            <div className="login_items_div"><label className='login_labels' htmlFor="">Password :</label><input onChange={getLogInData} value={newUserData.password} className="log_in_input_areas" name="password" type="password" /></div>
            <div className="login_items_div"><button onClick={onRegsiterClick} className='log_in-register_btn'>Register</button></div>
            <div className="login_items_div"><p>Already have an account? </p><button className='log_in-register_btn'><Link to='/user/login'>Login</Link></button></div>
            <ToastContainer />
        </div>
    );
}

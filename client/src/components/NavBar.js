import { navigate, Link } from '@reach/router';
import React from 'react'
import axios from "axios";
import { useState } from 'react/cjs/react.development';

const NavBar = (props) => {

    const {status, updateStatus} = props;
    const [currentStatus, setCurrentStatus] = useState(status)

    const Logout = (e) => {
        axios.post("http://localhost:8000/api/user/logout")
        updateStatus(currentStatus)
        setCurrentStatus("logged-out")
        props.setUser()
        navigate('/login')
    }

    return (
    <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/home">
                <img src="" alt="" width="30" height="24"/>
                Dojo Alumni
            </Link>
            {props.user !== undefined &&
            <>
                <form className="d-flex">
                    <span className="intro">Hello {props.user.username}</span>
                        <button className="btn btn-light me-2 btn-outline-primary" type="button" onClick={e=>{e.preventDefault(); navigate('../post/new')}}>New Post</button>
                        <button className="btn btn-light me-2 btn-outline-primary" type="button" onClick={e=>{e.preventDefault(); Logout()}}>Logout</button>
                        <button className="btn btn-light me-2 btn-outline-primary" type="button" onClick={e=>{e.preventDefault(); navigate('/users/profile')}}>My Profile</button>
                </form>
            </>
            }
            {props.user ===undefined &&
                <form className="d-flex">
                    <button className="btn btn-light me-2 btn-outline-primary" type="button" onClick={
                        e=>{e.preventDefault(); navigate('/login');}}>
                        Log In
                    </button>
                </form>
            }
        </div>
    </nav>
    )
}
export default NavBar;
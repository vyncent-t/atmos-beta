import React from 'react';
import { Link } from 'react-router-dom';
import menu from '../images/menubtn.png';
import room from '../images/yourRoom.png';
import title from '../images/altTitle.png';


const buttonStyles = {
    cursor: 'pointer'
}
function AtmosNavbar() {

    return (
        <nav className="bg-primary">
            <div className="container-fluid d-flex justify-content-between">
                <div className="pb-4">
                    <img alt="menu" src={title}></img>
                </div>
                <div className="navbarbtn d-flex align-self-center">
                    <Link to="/menu" ><img alt="menu" style={buttonStyles} src={menu}></img></Link>
                    {/* <Link to="/dashboard"><img alt="room" src={room}></img></Link> */}
                </div>
            </div>
        </nav>)
}

export default AtmosNavbar
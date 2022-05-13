import React from 'react';
import { Link } from 'react-router-dom';

import styles from './NavbarStyles.module.css'


const buttonStyles = {
    cursor: 'pointer'
}
function AtmosNavbar() {

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_icon}>
                <Link className={styles.navbar_navlinks} to="/" >Atmos</Link>

            </div>
            <ul className={styles.navbar_navlist}>
                <li>
                    <Link className={styles.navbar_navlinks} to="/menu" >Menu</Link>
                </li>
                <li>
                    <Link className={styles.navbar_navlinks} to="/dashboard" >Dashboard</Link>
                </li>

                {/* <Link to="/dashboard"><img alt="room" src={room}></img></Link> */}
            </ul>
        </nav>)
}

export default AtmosNavbar
import  React from 'react';
import  styles from './Navbar.module.scss';
export const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarLink}><a href="src/components/Navbar/Navbar">Profile</a></div>
            <div className={styles.navbarLink}><a href="src/components/Navbar/Navbar">Message</a></div>
            <div className={styles.navbarLink}><a href="src/components/Navbar/Navbar">News</a></div>
            <div className={styles.navbarLink}><a href="src/components/Navbar/Navbar">Musics</a></div>
            <div className={styles.navbarLink}><a href="src/components/Navbar/Navbar">Settings</a></div>
        </nav>
    );
};
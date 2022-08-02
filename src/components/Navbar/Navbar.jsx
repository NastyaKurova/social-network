import React from 'react';
import styles from './Navbar.module.scss';
import {NavLink} from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.navbarLink}><StyledLink href="/profile" name="Profile"/></li>
                <li className={styles.navbarLink}><StyledLink href="/dialogs" name="Dialogs"/></li>
                <li className={styles.navbarLink}><StyledLink href="/news" name="NewsNews"/></li>
                <li className={styles.navbarLink}><StyledLink href="/musics" name="Musics"/></li>
                <li className={styles.navbarLink}><StyledLink href="/settings" name="Settings"/></li>
            </ul>
        </nav>
    );
};

function StyledLink({href, name}) {
    return <NavLink to={href} className={({isActive}) =>
        isActive ? styles.navbarLinkActive : undefined}>{name}</NavLink>
}

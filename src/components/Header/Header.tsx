import React, {FC} from 'react';
import logo from "../../logo.svg";
import styles from "./Header.module.scss";
import {Link} from "react-router-dom";
import "../forms.module.scss";

type HeaderPropsType={
    isAuth:boolean
    login:string
    logoutUser:()=>void
}
export const Header:FC<HeaderPropsType> = ({isAuth, login, logoutUser}) => {
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <img className={styles.headerImg} src={logo} alt="logo"/>
                <h1 className={styles.headerText}>Social network </h1>
                <div className={styles.headerLogin}>
                    {isAuth ?
                        <div>
                            <span>{login}</span>
                            <button className={styles.headerLoginButton} onClick={logoutUser}>logout</button>
                        </div>
                        : <Link to="/login">login</Link>}
                </div>

            </div>
        </header>
    );
};
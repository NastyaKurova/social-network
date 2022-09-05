import React, {FC} from 'react';
import logo from "../../logo.svg";
import styles from "./Header.module.scss";
import {Link} from "react-router-dom";
import "../../styles/forms.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {getAuth, getLogin} from "../../State/selectors/authSelectors";
import {logoutUser} from "../../State/reducers/authReducer";

const Header: FC = () => {
    const dispatch = useDispatch<any>()
    const isAuth: boolean = useSelector(getAuth)
    const login: string = useSelector(getLogin)
    const logoutCurrentUser = (): void => {
        dispatch(logoutUser())
    }

    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <img className={styles.headerImg} src={logo} alt="logo"/>
                <h1 className={styles.headerText}>Social network </h1>
                <div className={styles.headerLogin}>
                    {isAuth ?
                        <div>
                            <span>{login}</span>
                            <button className={styles.headerLoginButton} onClick={logoutCurrentUser}>logout</button>
                        </div>
                        : <Link to="/login">login</Link>}
                </div>

            </div>
        </header>
    );
};
export default Header;
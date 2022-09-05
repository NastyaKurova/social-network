import React, {FC, useEffect} from 'react';
import './App.scss';
import {Navbar} from "./components/Navbar/Navbar";
import {Route, Routes, Navigate, BrowserRouter} from "react-router-dom";
import Header from "./components/Header/Header";
import LoginPage from "./components/LoginPage/LoginPage";
import {Provider, useDispatch, useSelector} from "react-redux";

import {Loader} from "./components/common/Loader/Loader";
import {initApp} from "./State/reducers/appReducer";
import {withSuspense} from "./components/common/hoc/withSuspense";
import store from "./State/reduxStore";
import {getIsInitialized} from "./State/selectors/authSelectors";

const DialogsPage = React.lazy(() => import('./components/Dialogs/DialogsPage'));
const ProfilePage = React.lazy(() => import('./components/Profile/ProfilePage'));
const UsersContainer = React.lazy(() => import('./components/Users/UserPage'));
const ChatPage = React.lazy(() => import('./components/Chat/ChatPage'));


const App: FC = () => {
    const dispatch = useDispatch<any>()
    const isInitialized: boolean = useSelector(getIsInitialized)
    useEffect(() => {
        dispatch(initApp())
    }, [])

    if (!isInitialized) return <Loader/>
    return (
        <div className="wrapper">
            <Header/>
            <div className="wrapper-container">
                <Navbar></Navbar>
                <div className="wrapper-container-content">
                    <Routes>
                        <Route path="/" element={<Navigate to={'/profile'}/>}/>
                        <Route path="profile" element={withSuspense(ProfilePage)}>
                            <Route path=":userId" element={withSuspense(ProfilePage)}/>
                        </Route>
                        <Route path="dialogs" element={withSuspense(DialogsPage)}/>
                        <Route path="chat" element={withSuspense(ChatPage)}/>
                        <Route path="users" element={withSuspense(UsersContainer)}/>
                        <Route path="login" element={<LoginPage/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}


export function AppWrapper() {
    return <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
}


export default AppWrapper
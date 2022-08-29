import React from 'react';
import './App.scss';
import {Navbar} from "./components/Navbar/Navbar";
import {Route, Routes, Navigate} from "react-router-dom";
import {withRouter} from "./components/common/withRouter";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/LoginPage/LoginContainer";
import {connect} from "react-redux";

import {Loader} from "./components/common/Loader/Loader";
import {initApp} from "./State/reducers/appReducer";
import {compose} from "redux";
import {withSuspense} from "./components/common/hoc/withSuspense";
import {AppStateType} from "./State/reduxStore";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));

type MapStateToPropsType = {
    isInitialized: boolean
}
type MapDispatchToPropsType = {
    initApp: () => void
}

class App extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {
    componentDidMount() {
        this.props.initApp()
    }

    render() {
        if (!this.props.isInitialized) return <Loader/>
        return (
            <div className="wrapper">
                <HeaderContainer/>
                <div className="wrapper-container">
                    <Navbar></Navbar>
                    <div className="wrapper-container-content">
                        <Routes>
                            <Route path="/" element={<Navigate to={'/profile'}/>}/>
                            <Route path="profile" element={withSuspense(ProfileContainer)}>
                                <Route path=":userId" element={withSuspense(ProfileContainer)}/>
                            </Route>
                            <Route path="dialogs" element={withSuspense(DialogsContainer)}/>
                            <Route path="users" element={withSuspense(UsersContainer)}/>
                            <Route path="login" element={<LoginContainer/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isInitialized: state.initApp.isInitialized
})
export default compose<React.ComponentType>(
    withRouter,
    connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(mapStateToProps, {initApp}))(App)

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

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));

class App extends React.Component {
    componentDidMount() {
        this.props.initApp()
    }

    render() {
        if (!this.props.isInitialized) return <Loader/>
        return (
            <div className="wrapper">
                <HeaderContainer></HeaderContainer>
                <div className="wrapper-container">
                    <Navbar></Navbar>
                    <div className="wrapper-container-content">
                        <Routes>
                            <Route path="/" exact element={<Navigate to={'/profile'}/>}/>
                            <Route path="profile" exact element={withSuspense(ProfileContainer)}>
                                <Route path=":userId" exact element={withSuspense(ProfileContainer)}/>
                            </Route>
                            <Route path="dialogs" exact element={withSuspense(DialogsContainer)}/>
                            <Route path="users" exact element={withSuspense(UsersContainer)}/>
                            <Route path="login" exact element={<LoginContainer/>}/>
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
export default compose(
    withRouter,
    connect(mapStateToProps, {initApp}))(App);

import React from 'react';
import './App.scss';
import {Navbar} from "./components/Navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import {withRouter} from "./components/common/withRouter";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/LoginPage/LoginContainer";
import {connect} from "react-redux";

import {Loader} from "./components/common/Loader/Loader";
import {initApp} from "./State/reducers/appReducer";
import {compose} from "redux";


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
                            <Route path="profile/:userId" exact element={<ProfileContainer/>}/>
                            <Route path="profile/" exact element={<ProfileContainer/>}/>
                            <Route path="dialogs" exact element={<DialogsContainer/>}/>
                            <Route path="users" exact element={<UsersContainer/>}/>
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

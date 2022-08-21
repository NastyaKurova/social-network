import React from 'react';
import {connect} from "react-redux";
import {Header} from "./Header";
import {getCurrentUser,logoutUser} from "../../State/reducers/authReducer";


class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.getCurrentUser()
    }

    render() {
        return <Header isAuth={this.props.isAuth} login={this.props.login} logoutUser={this.props.logoutUser}/>
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})
export default connect(mapStateToProps, {getCurrentUser,logoutUser})(HeaderContainer)
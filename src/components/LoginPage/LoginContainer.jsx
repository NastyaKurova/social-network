import React from 'react';
import {loginUser} from "../../State/reducers/authReducer";
import {LoginForm} from "./LoginForm";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {getAuth} from "../../State/selectors/authSelectors";

class LoginContainer extends React.Component {
    render() {
        if (this.props.isAuth) return <Navigate to="/profile"/>
        return (
            <LoginForm loginUser={this.props.loginUser}/>
        )
    }
};
const mapStateToProps = (state) => ({
    isAuth: getAuth(state)
})
export default connect(mapStateToProps, {loginUser})(LoginContainer)
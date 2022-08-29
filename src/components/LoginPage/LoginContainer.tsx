import React from 'react';
import {loginUser} from "../../State/reducers/authReducer";
import {LoginForm} from "./LoginForm";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {getAuth, getCaptureUrl} from "../../State/selectors/authSelectors";
import {AppStateType} from "../../State/reduxStore";

type MapStateToPropsType = {
    isAuth: boolean
    captureUrl: string
}
type MapDispatchToPropsType = {
    loginUser: (values: { email: string, password: string, capture: string }) => void
}
type LoginContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

class LoginContainer extends React.Component<LoginContainerPropsType> {
    render() {
        if (this.props.isAuth) return <Navigate to="/profile"/>
        return (
            <LoginForm loginUser={this.props.loginUser} captureUrl={this.props.captureUrl}/>
        )
    }
};
const mapStateToProps = (state: AppStateType) => ({
    isAuth: getAuth(state),
    captureUrl: getCaptureUrl(state)
})
export default connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(mapStateToProps, {loginUser})(LoginContainer) as React.ComponentType
import React from 'react';
import {connect} from "react-redux";
import {Header} from "./Header";
import {logoutUser} from "../../State/reducers/authReducer";
import {AppStateType} from "../../State/reduxStore";
import {getAuth, getLogin} from "../../State/selectors/authSelectors";


type MapStateToPropsType = {
    isAuth: boolean
    login: string
}
type MapDispatchToPropsType = {
    logoutUser: () => void
}
type HeaderPropsType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<HeaderPropsType> {

    render() {
        return <Header isAuth={this.props.isAuth} login={this.props.login} logoutUser={this.props.logoutUser}/>
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: getAuth(state),
    login: getLogin(state)
})
export default connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(mapStateToProps, {logoutUser})(HeaderContainer) as React.ComponentType
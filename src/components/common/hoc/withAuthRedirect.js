import React from 'react';
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";

export const withAuthRedirect = (Component) => {

    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Navigate to="/login"/>
            return <Component {...this.props}/>
        }
    }

    const mapStateToPropsWithRedirect = (state) => ({
        isAuth: state.auth.isAuth,
    })
    return connect(mapStateToPropsWithRedirect)(RedirectComponent)
}




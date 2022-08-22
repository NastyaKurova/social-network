import React from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getProfile, getProfileStatus, updateProfileStatus} from "../../State/reducers/profileReducer";
import {withRouter} from "../common/withRouter";
import {withAuthRedirect} from "../common/hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.router.params.userId;
        if (!userId) userId = this.props.authUserId;
        if (!userId) this.props.history.push("/login")

        this.props.getProfile(userId)
        setTimeout(()=>this.props.getProfileStatus(userId),1000)

    }

    render() {
        return (
            <Profile profile={this.props.profile} status={this.props.status}
                     updateProfileStatus={this.props.updateProfileStatus}/>
        );
    }
};

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authUserId:state.auth.id
})

export default compose(
    connect(mapStateToProps, {getProfile, getProfileStatus, updateProfileStatus}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)

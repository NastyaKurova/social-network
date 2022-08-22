import React from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {requestProfile, requestProfileStatus, updateProfileStatus} from "../../State/reducers/profileReducer";
import {withRouter} from "../common/withRouter";
import {withAuthRedirect} from "../common/hoc/withAuthRedirect";
import {compose} from "redux";
import {getAuthUserId, getProfile, getProfileStatus} from "../../State/selectors/profileSelectors";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.router.params.userId;
        if (!userId) userId = this.props.authUserId;
        if (!userId) this.props.history.push("/login")

        this.props.requestProfile(userId)
        setTimeout(() => this.props.requestProfileStatus(userId), 1000)

    }

    render() {
        return (
            <Profile profile={this.props.profile} status={this.props.status}
                     updateProfileStatus={this.props.updateProfileStatus}/>
        );
    }
};

const mapStateToProps = (state) => ({
    profile: getProfile(state),
    status: getProfileStatus(state),
    authUserId: getAuthUserId(state)
})

export default compose(
    connect(mapStateToProps, {requestProfile, requestProfileStatus, updateProfileStatus}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)

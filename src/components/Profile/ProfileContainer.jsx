import React from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getProfile} from "../../State/reducers/profileReducer";
import {withRouter} from "../common/withRouter";
import {withAuthRedirect} from "../common/hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {
    componentDidMount() {
        const userId = this.props.router.params.userId || 25469
        this.props.getProfile(userId)
    }

    render() {
        return (
            <Profile profile={this.props.profile}/>
        );
    }
};

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
})

export default compose(
    connect(mapStateToProps, {getProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)

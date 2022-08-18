import React from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getProfile} from "../../State/reducers/profileReducer";
import {withRouter} from "../common/withRouter";

class ProfileContainer extends React.Component {
    componentDidMount() {
        const userId = this.props.router.params.userId
        this.props.getProfile(userId)
    }

    render() {
        return (
            <Profile profile={this.props.profile}/>
        );
    }

};
const mapStateToProps = (state) => ({
    profile: state.profilePage.profile
})

const ProfileContainerWithRouter = withRouter(ProfileContainer)
export default connect(mapStateToProps, {getProfile})(ProfileContainerWithRouter)
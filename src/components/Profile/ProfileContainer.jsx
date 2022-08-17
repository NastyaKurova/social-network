import React from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {setUserProfileAction} from "../../State/reducers/profileReducer";
import axios from "axios";
import {withRouter} from "../common/withRouter";

class ProfileContainer extends React.Component {
    componentDidMount() {
        const userId = this.props.router.params.userId
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(res => {
                this.props.setUserProfile(res.data)
            })
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
const mapDispatchToProps = (dispatch) => ({
   setUserProfile:(profile)=>dispatch(setUserProfileAction(profile))
})
const ProfileContainerWithRouter= withRouter(ProfileContainer)
export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainerWithRouter)
import React from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {
    requestProfile,
    requestProfileStatus,
    updateProfileStatus,
    saveProfilePhoto,
    saveProfile
} from "../../State/reducers/profileReducer";
import {withRouter} from "../common/withRouter";
import {withAuthRedirect} from "../common/hoc/withAuthRedirect";
import {compose} from "redux";
import {getAuthUserId, getProfile, getProfileStatus} from "../../State/selectors/profileSelectors";
import {ProfileDataType} from "../../types/types";
import {AppStateType} from "../../State/reduxStore";

type MapStateToPropsType = {
    profile: ProfileDataType,
    status: string,
    authUserId: number
}
type MapDispatchToPropsType = {
    requestProfile: (userId: number) => void,
    requestProfileStatus: (userId: number) => void,
    updateProfileStatus: (status: string) => void,
    saveProfilePhoto: (photo: File) => void,
    saveProfile: (data: ProfileDataType) => void
}
type PathParamsType = { router: { params: { userId: string } } }
type ProfileContainerPropsType = MapStateToPropsType & MapDispatchToPropsType & PathParamsType

class ProfileContainer extends React.Component<ProfileContainerPropsType> {
    refreshProfile() {
        let userId: number = Number(this.props.router.params.userId);
        if (!userId) userId = this.props.authUserId;
        // if (!userId) this.props.history.push("/login")

        this.props.requestProfile(userId)
        this.props.requestProfileStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.router.params.userId !== prevProps.router.params.userId) this.refreshProfile()
    }

    render() {
        return (
            <Profile profile={this.props.profile} status={this.props.status}
                     updateProfileStatus={this.props.updateProfileStatus} isOwner={!this.props.router.params.userId}
                     savePhoto={this.props.saveProfilePhoto} saveProfile={this.props.saveProfile}/>
        );
    }
};

const mapStateToProps = (state) => ({
    profile: getProfile(state),
    status: getProfileStatus(state),
    authUserId: getAuthUserId(state)
})

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(mapStateToProps, {
        requestProfile,
        requestProfileStatus,
        updateProfileStatus,
        saveProfilePhoto,
        saveProfile
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)

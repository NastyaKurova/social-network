import {actions} from "../../State/reducers/profileReducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {getPostData} from "../../State/selectors/postSelectors";
import {PostDataType} from "../../types/types";
import {AppStateType} from "../../State/reduxStore";
import React from "react";

type MapStateToPropsType = {
    postData: PostDataType[]
}
type MapDispatchToPropsType = {
    addPost: (data: { postText: string }) => void
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    postData: getPostData(state)
})
const mapDispatchToProps = (dispatch): MapDispatchToPropsType => ({
    addPost: (data) => dispatch(actions.addPost(data)),
})

const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts);
export default MyPostsContainer as React.ComponentType;
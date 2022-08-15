import {addPostAction, updatePostTextAction} from "../../State/reducers/profileReducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";


const mapStateToProps = (state) => ({
    postData: state.profilePage.postData,
    newPostText: state.profilePage.newPostText
})
const mapDispatchToProps = (dispatch) => ({
    addPost: () => dispatch(addPostAction()),
    onPostChange: (text) => dispatch(updatePostTextAction(text))
})
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
export default MyPostsContainer;
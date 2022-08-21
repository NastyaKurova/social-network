import {addPostAction} from "../../State/reducers/profileReducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";


const mapStateToProps = (state) => ({
    postData: state.profilePage.postData,
    newPostText: state.profilePage.newPostText
})
const mapDispatchToProps = (dispatch) => ({
    addPost: (data) => dispatch(addPostAction(data)),
})

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
export default MyPostsContainer;
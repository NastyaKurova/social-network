import {addPostAction} from "../../State/reducers/profileReducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {getPostData} from "../../State/selectors/postSelectors";


const mapStateToProps = (state) => ({
    postData: getPostData(state)
})
const mapDispatchToProps = (dispatch) => ({
    addPost: (data) => dispatch(addPostAction(data)),
})

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
export default MyPostsContainer;
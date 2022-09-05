import React, {FC} from 'react';
import styles from './MyPosts.module.scss';
import {Post} from "./Post";
import {PostForm} from "./PostForm";
import "../../styles/forms.module.scss";
import {PostDataType} from "../../types/types";
import {useDispatch, useSelector} from "react-redux";
import {getPostData} from "../../State/selectors/postSelectors";
import {actions} from "../../State/reducers/profileReducer";

export const MyPosts: FC = () => {
    const dispatch = useDispatch()
    const postData: PostDataType[] = useSelector(getPostData)
    const addPostUser = (data: { postText: string }): void => {
        dispatch(actions.addPost(data))
    }
    return (
        <div className={styles.myPosts}>
            <h2>My posts</h2>
            <div className={styles.postForm}>
                <PostForm addPost={addPostUser}/>
            </div>
            {postData.map(({id, text, time, likes}, index) => <Post key={index} text={text} time={time}
                                                                    likes={likes}/>)}

        </div>
    );
};
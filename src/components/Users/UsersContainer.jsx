import React from 'react';
import {connect} from "react-redux";
import {Users} from "./Users";
import {
    followAction, setUserIsLoadedAction,
    setUserPageAction,
    setUsersAction,
    setUserTotalCountAction,
    unFollowAction
} from "../../State/reducers/usersReducer";
import axios from "axios";
import {Loader} from "../common/Loader/Loader";

export class UsersContainer extends React.Component {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(res => {
                this.props.setUsers(res.data.items);
                this.props.setUserTotalCount(res.data.totalCount);
                this.props.setUserIsLoaded(true);
            })
    }

    selectPage(page) {
        this.props.setUserIsLoaded(false)
        this.props.setUserPage(page)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`)
            .then(res => {
                this.props.setUsers(res.data.items);
                this.props.setUserIsLoaded(true);
            })
    }

    selectPrevPage() {
        this.props.setUserIsLoaded(false)
        const page = this.props.currentPage - 1;
        this.props.setUserPage(page)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`)
            .then(res => {
                this.props.setUsers(res.data.items);
                this.props.setUserIsLoaded(true);
            })
    }

    selectNextPage() {
        this.props.setUserIsLoaded(false)
        const page = this.props.currentPage + 1;
        this.props.setUserPage(page)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`)
            .then(res => {
                this.props.setUsers(res.data.items);
                this.props.setUserIsLoaded(true);
            })
    }

    render() {
        console.log(this.props.isLoaded)
        if (!this.props.isLoaded) return <Loader/>
        return (
            <Users users={this.props.users} currentPage={this.props.currentPage} pageSize={this.props.pageSize}
                   totalPages={this.props.totalPages} setUserPage={this.props.setUserPage}
                   selectPage={(page) => this.selectPage(page)}
                   setUsers={this.props.setUsers} selectPrevPage={() => this.selectPrevPage()}
                   selectNextPage={() => this.selectNextPage()}
                   followUser={this.props.followUser}
                   unFollowUser={this.props.unFollowUser}/>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        users: state.usersPage.users,
        currentPage: state.usersPage.currentPage,
        totalPages: state.usersPage.totalPages,
        pageSize: state.usersPage.pageSize,
        isLoaded: state.usersPage.isLoaded,
    })
}
const mapDispatchToProps = (dispatch) => ({
    followUser: (userId) => dispatch(followAction(userId)),
    unFollowUser: (userId) => dispatch(unFollowAction(userId)),
    setUsers: (users) => dispatch(setUsersAction(users)),
    setUserPage: (page) => dispatch(setUserPageAction(page)),
    setUserTotalCount: (count) => dispatch(setUserTotalCountAction(count)),
    setUserIsLoaded: (isLoaded) => dispatch(setUserIsLoadedAction(isLoaded)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

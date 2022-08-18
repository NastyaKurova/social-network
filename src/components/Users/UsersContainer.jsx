import React from 'react';
import {connect} from "react-redux";
import {Users} from "./Users";
import {
    followUser,
    unFollowUser
} from "../../State/reducers/usersReducer";
import {Loader} from "../common/Loader/Loader";
import {getUsers} from "../../State/reducers/usersReducer";

export class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    selectPage(page) {
        this.props.getUsers(page, this.props.pageSize)
    }

    selectPrevPage() {
        const page = this.props.currentPage - 1;
        this.props.getUsers(page, this.props.pageSize)
    }

    selectNextPage() {
        const page = this.props.currentPage + 1;
        this.props.getUsers(page, this.props.pageSize)
    }

    render() {
        if (!this.props.isLoaded) return <Loader/>
        return (
            <Users users={this.props.users} currentPage={this.props.currentPage} pageSize={this.props.pageSize}
                   followedProgressArr={this.props.followedProgressArr}
                   totalPages={this.props.totalPages}
                   selectPage={(page) => this.selectPage(page)}
                   selectPrevPage={() => this.selectPrevPage()}
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
        followedProgressArr: state.usersPage.followedProgressArr,
    })
}

export default connect(mapStateToProps, {followUser, unFollowUser, getUsers})(UsersContainer);

import React from 'react';
import {connect} from "react-redux";
import {Users} from "./Users";
import {
    followUser, requestUsers,
    unFollowUser
} from "../../State/reducers/usersReducer";
import {Loader} from "../common/Loader/Loader";
import {
    getUsers,
    getCurrentPage,
    getFollowedProgressArr,
    getIsLoaded,
    getPageSize,
    getTotalPages
} from "../../State/selectors/userSelectors";

export class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
    }

    selectPage(page) {
        this.props.requestUsers(page, this.props.pageSize)
    }

    selectPrevPage() {
        const page = this.props.currentPage - 1;
        this.props.requestUsers(page, this.props.pageSize)
    }

    selectNextPage() {
        const page = this.props.currentPage + 1;
        this.props.requestUsers(page, this.props.pageSize)
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
        users: getUsers(state),
        currentPage: getCurrentPage(state),
        totalPages: getTotalPages(state),
        pageSize: getPageSize(state),
        isLoaded: getIsLoaded(state),
        followedProgressArr: getFollowedProgressArr(state),
    })
}

export default connect(mapStateToProps, {followUser, unFollowUser, requestUsers})(UsersContainer);

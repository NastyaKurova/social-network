export const getUsers=(state)=>{
    return state.usersPage.users
}
export const getCurrentPage=(state)=>{
    return state.usersPage.currentPage
}
export const getTotalPages=(state)=>{
    return state.usersPage.totalPages
}
export const getPageSize=(state)=>{
    return state.usersPage.pageSize
}
export const getIsLoaded=(state)=>{
    return state.usersPage.isLoaded
}
export const getFollowedProgressArr=(state)=>{
    return state.usersPage.followedProgressArr
}
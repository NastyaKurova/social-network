import usersReducer, {InitialStateType} from "./usersReducer";
import {actions} from "./usersReducer";

let state: InitialStateType;
beforeEach(() => {
    state = {
        users: [
            {id: 0, name: 'Alo', followed: false, photos: {large: '', small: ''}, status: "lalal"},
            {id: 1, name: 'Aloha', followed: false, photos: {large: '', small: ''}, status: "dadads"},
            {id: 2, name: 'Alex', followed: true, photos: {large: '', small: ''}, status: "grgrgr"},
            {id: 3, name: 'Nax', followed: true, photos: {large: '', small: ''}, status: "pfff"},
        ],
        currentPage: 1,
        totalCount: 19,
        pageSize: 20,
        isLoaded: false,
        followedProgressArr: [] as Array<number>,  // arr of users id
        filter: {term: '', friend: 'All'}
    }
})

test("follow success", () => {
    const newState = usersReducer(state, actions.follow(1))
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})
test("unfollow success", () => {
    const newState = usersReducer(state, actions.unFollow(3))
    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})
import {usersApi} from "../../api/userApi";
import {ResponseType, ResultCodesEnum} from "../../types/types";
import {actions, followUser, unFollowUser} from "./usersReducer";

jest.mock("../../api/userApi")

const userApiMock = usersApi as jest.Mocked<typeof usersApi>;
const result: ResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    fieldsErrors: [],
    data: {}
}
const dispatchMock = jest.fn();
const getStateMock = jest.fn()
beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    userApiMock.followUser.mockClear()
    userApiMock.unFollowUser.mockClear()
    userApiMock.followUser.mockResolvedValue(result)
    userApiMock.unFollowUser.mockResolvedValue(result)
})

test('success follow thunk', async () => {
    const thunk = followUser(1);
    await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setUserIsFollowed(false, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.follow(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setUserIsFollowed(true, 1));
})
test('success unfollow thunk', async () => {
    const thunk = unFollowUser(1);
    await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setUserIsFollowed(false, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unFollow(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setUserIsFollowed(true, 1));
})
import { atom, selector } from "recoil";

export const userList = atom({
    key: 'userList',
    default: [],
});

export const currentUserIDState = atom({
    key: 'setCurrentUserIDState',
    default: null,
});

export const userListQuery = selector({
    key: 'userListQuery',
    get: async ({get}) => {
        const currentUser = get(userList)
            .filter((user) => 
                user.id === get(currentUserIDState)
            ).map((person) => person.name)
        return currentUser;
    }
});
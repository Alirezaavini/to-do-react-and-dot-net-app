import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserInfoState {
    username: string;
    name: string;
}

const initialState: UserInfoState = {
    name: '',
    username: '',
};

const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserInfoState>) => {
            state.name = action.payload.name;
            state.username = action.payload.username;
        },
        logout: (state) => {
            state.name = '';
            state.username = '';
        },
    },
});

const actions = userInfoSlice.actions;
export const userInfoActions = {
    init: actions.login,
    logOut: actions.logout,
};
export const userInfoReducer = userInfoSlice.reducer;

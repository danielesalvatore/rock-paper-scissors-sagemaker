import {ADMIN_GROUP} from "./conf";

export const getUserGroups = ({user}) => {
    try {
        const {signInUserSession} = user;
        const {accessToken} = signInUserSession;
        const {payload} = accessToken;
        return payload["cognito:groups"];
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const isUserAdmin = ({user}) => {
    return getUserGroups({user}).indexOf(ADMIN_GROUP) > -1;
};

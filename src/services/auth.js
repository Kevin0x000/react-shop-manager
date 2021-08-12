import { post } from "../utils/request";

//user login
//userName password
export function loginApi(users) {
    return post('/api/v1/auth/manager_login',users)
}
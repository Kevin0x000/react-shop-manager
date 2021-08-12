import { get,post,put,del } from "../utils/request";

export function listApi(page = 1){
    return get('/api/v1/admin/products',{page,per:4})
}

export function createApi(data){
    return post('/api/v1/admin/products',data)
}

export function modifyOne(id,data){
    return put(`/api/v1/admin/products/${id}`,data)
}

export function deleteOne(id){
    return del(`/api/v1/admin/products/${id}`)
}

export function getOnebyId(id){
    return get(`/api/v1/admin/products/${id}`)
}
import { listApi } from "../../services/products"

export const loadProduct = payload => async dispatch =>{
    console.log(payload)
    const res = await listApi(payload.page)

    //after async action, notify reducer update data by dispatch()
    dispatch({
        type:"PRODUCT_LOADED",
        payload: {...res, page: payload.page}
    })
}
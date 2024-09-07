// 账单列表相关store
import { createSlice } from "@reduxjs/toolkit"
import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import request from "@/utils/request"

const billStore = createSlice({
    name: "bill",
    // 定义数据状态
    initialState: {
        billList: [],
    },
    reducers: {
        // 更新数据状态
        setBillList(state, action) {
            state.billList = action.payload

        },
    }
})


// 编写异步
const getBillList = () => {
    return async (dispatch: Dispatch<UnknownAction>) => {
        const res = await request.get('/ka')
        dispatch(setBillList(res))
    }
}

const { setBillList } = billStore.actions

const { reducer } = billStore


export { getBillList, setBillList }

export default reducer

// 账单列表相关store
import { createSlice } from "@reduxjs/toolkit"
import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import request from "@/utils/request"
import { Result, Data } from '@/type'


const billStore = createSlice({
    name: "bill",
    // 定义数据状态
    initialState: {
        billList: [] as Result[],
    },
    reducers: {
        // 更新数据状态
        setBillList(state, action) {
            state.billList = action.payload
        },
        // 同步添加账单的方法
        addBill(state, action) {
            state.billList.push(action.payload)
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

const addBillList = (data: Data) => {
    return async (dispatch: Dispatch<UnknownAction>) => {
        const res = await request.post('/ka', data)
        dispatch(setBillList(res))
    }
}

const { setBillList } = billStore.actions

const { reducer } = billStore


export { getBillList, setBillList, addBillList }

export default reducer

// 组合子模块，导出store实例
import { configureStore } from "@reduxjs/toolkit"
import billReducer from './modules/billStore'



const store = configureStore({
    reducer: {
        bill: billReducer
    },
})
// 导出 RootState 类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export default store;

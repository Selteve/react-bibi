import { Outlet } from "react-router-dom"
import { Button } from "antd-mobile"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getBillList } from "@/store/modules/billStore"
import { AppDispatch } from "@/store"

const Layout = () => {
    const dispatch: AppDispatch  = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(getBillList())
    }, [dispatch])
    return (
        <div>
            <Outlet />
            <h1>Layout</h1>
            <Button color="primary">按钮</Button>
        </div>
    )
}

export default Layout
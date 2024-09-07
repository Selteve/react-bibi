import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getBillList } from "@/store/modules/billStore"
import { AppDispatch } from "@/store"
import { TabBar } from 'antd-mobile'
import {
    AppOutline,
    AddCircleOutline,
    CalculatorOutline,
} from 'antd-mobile-icons'

import './demo2.less'

const Layout = () => {
    const navigate = useNavigate()
    const tabs = [
        {
            key: '/month',
            title: '月度账单',
            icon: <AppOutline />,
        },
        {
            key: '/new',
            title: '记账',
            icon: <AddCircleOutline />,
        },
        {
            key: '/year',
            title: '年度账单',
            icon: <CalculatorOutline />,
        },
    ]
    const dispatch: AppDispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(getBillList())
    }, [dispatch])
    // 路由切换
    const switchRouter = (path: string) => {
        navigate(path)
    }
    return (
        <>
            <div className="app">
                <Outlet></Outlet>
            </div>
            <TabBar className="bottom" onChange={switchRouter}>
                {tabs.map(item => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                ))}
            </TabBar>
        </>
    )
}

export default Layout
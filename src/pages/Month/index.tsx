import { NavBar, DatePicker } from 'antd-mobile'
import { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import lodash from 'lodash'
import { RootState } from '@/store'

import { Result } from '@/type'
import './index.scss'
const Month = () => {

  // 按月分组数据
  const billList: Result[] = useSelector((state: RootState) => state.bill.billList)
  const monthGroup = useMemo(() => { // 按月分组
    return lodash.groupBy(billList, (item: Result) => dayjs(item.date).format('YYYY-MM'))
  }, [billList])
  // console.log(monthGroup);
  // 控制弹窗的显示状态
  const [show, setShow] = useState(false)
  // 当前月份支出数据
  const [ currentMonthBill, setCurrentMonthBill ] = useState<Result[]>([])

  // 控制时间的显示状态
  const [date, setDate] = useState(() => dayjs(new Date()).format('YYYY-MM'))
  // 计算当前月份的账单
  const monthResult = useMemo(() => {
    // 支出 、 收入 、 结余
    const pay = currentMonthBill.filter(item => item.type === 'pay').reduce((pre, cur) => pre + cur.money, 0)
    const income = currentMonthBill.filter(item => item.type === 'income').reduce((pre, cur) => pre + cur.money, 0)
    return {
      pay,
      income,
      balance: income + pay
    }

  }, [currentMonthBill])
  // 初始化的时候把当前月份的账单更新
  useEffect(() => {
    const nowDate = dayjs(new Date()).format('YYYY-MM')
    setCurrentMonthBill(monthGroup[nowDate] || [])  // 更新当前月份的账单
  }, [monthGroup])
  // 选择时间后的回调函数
  const onConfirm = (date: Date) => {
    setShow(false)  // 关闭弹窗
    const formatDate = dayjs(date).format('YYYY-MM')
    setCurrentMonthBill(monthGroup[formatDate] || [])  // 更新当前月份的账单
    setDate(formatDate)  // 更新时间
  }
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setShow(true)}>
            <span className="text">
              {date}月账单
            </span>
            {/* 思路：根据当前弹框打开的状态控制expand类名是否存在 */}
            <span className={classNames('arrow', show && 'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{monthResult.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.balance.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={show}
            onCancel={() => setShow(false)}
            onConfirm={onConfirm}
            onClose={() => setShow(false)}
            max={new Date()}
          />
        </div>

      </div>
    </div >
  )
}

export default Month

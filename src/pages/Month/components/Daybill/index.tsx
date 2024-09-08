import classNames from 'classnames'
import React, { useMemo } from 'react'
import { billTypeToName } from '@/contants'
import { DailyBillProps } from '@/type'
import Icon from '@/components/Icon'
import './index.scss'


const DailyBill: React.FC<DailyBillProps> = ({ date, billList}) => {
    const [visible, setVisible] = React.useState(false)
  // 计算当前月份的账单
  const dayResult = useMemo(() => {
    // 支出 、 收入 、 结余
    const pay = billList.filter(item => item.type === 'pay').reduce((pre, cur) => pre + cur.money, 0)
    const income = billList.filter(item => item.type === 'income').reduce((pre, cur) => pre + cur.money, 0)
    return {
      pay,
      income,
      balance: income + pay
    }
  }, [billList])
  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          {/* expand 有这个类名 展开的箭头朝上的样子 */}
          <span className={classNames('arrow', visible && 'expand')} onClick={() => setVisible(!visible)}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{dayResult.pay.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{dayResult.income.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{dayResult.balance.toFixed(2)}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
      {/* 单日列表 */}
      <div className="billList" style={{ display: visible ? 'block' : 'none'}}>
        {billList.map(item => {
          return (
            <div className="bill" key={item.id}>
              {/* 图标 */}
              <Icon type={item.useFor} />
              <div className="detail">
                <div className="billType">{billTypeToName[item.useFor]}</div>
              </div>
              <div className={classNames('money', item.type)}>
                {item.money.toFixed(2)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default DailyBill
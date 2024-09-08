import { Button, DatePicker, Input, NavBar, Toast } from 'antd-mobile'
import Icon from '@/components/Icon'
import './index.scss'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { billListData } from '@/contants'
import { useState } from 'react'
import { BillCategory, Data } from '@/type'
import { addBillList } from '@/store/modules/billStore'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import dayjs from 'dayjs'


const New = () => {
  const navigate = useNavigate()
  // 1. 准备一个控制收入支出的状态
  const [type, setType] = useState('pay')
  // 收集金额
  const [money, setMoney] = useState(0)
  const moneyChange = (value: string) => {
    setMoney(Number(value))
  }
  // 收集账单类型
  const [useFor, setUseFor] = useState('')
  const dispatch: AppDispatch = useDispatch<AppDispatch>()
  // 保存账单
  const saveBill = () => {
    // 收集表单数据
    const data: Data = {
      type,
      money: type === 'pay' ? -money : +money,
      date,
      useFor
    }
    if (money === 0) {
      Toast.show({
        icon: 'error',
        content: '金额不能为0',
      })
      return
    }
    dispatch(addBillList(data))
    Toast.show({
      icon: 'success',
      content: '保存成功',
    })
  }
  // 存储选择的时间
  const [date, setDate] = useState(new Date().toString())
  const [dateVisible, setDateVisible] = useState(false)
  const dateConfirm = (date: Date) => {
    setDate(date.toString())
    // 关闭时间选择器
    setDateVisible(false)
  }
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(type === 'pay' ? 'selected' : '')}
            onClick={() => setType('pay')}

          >
            支出
          </Button>
          <Button
            className={classNames(type === 'income' ? 'selected' : '')}
            shape="rounded"
            onClick={() => setType('income')}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" />
              <span className="text" onClick={() => setDateVisible(true)}>{dayjs(date).format('YYYY-MM-DD')}</span>
              {/* 时间选择器 */}
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
                visible={dateVisible}
                onConfirm={dateConfirm}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money.toString()}
                onChange={moneyChange}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {/* 数据区域 */}
        {
          billListData[type].map((item: BillCategory) => {
            return (
              <div className='kaType' key={item.type}>
                <div className="title">{item.name}</div>
                <div className="list">
                  {
                    item.list.map(item => {
                      return (
                        <div
                          className={
                            classNames(
                              'item',
                              useFor === item.type ? 'selected' : ''
                            )
                          }
                          key={item.type}
                          onClick={() => setUseFor(item.type)}
                        >
                          <div className='icon'>
                            <Icon type={item.type} />
                          </div>
                          <div className='text'>{item.name}</div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill}>
          保 存
        </Button>
      </div>
    </div>
  )
}

export default New

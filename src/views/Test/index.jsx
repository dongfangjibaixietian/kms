import React from 'react'
import { observer } from 'mobx-react-lite'
import { Button } from 'antd'

// import { test } from '@/service/api'

const Test = () => {
  const getTest = async () => {
    // try {
    //   const res = await test()
    //   console.log(res)
    // } catch (error) {}
  }

  return (
    <div>
      <div>test3</div>
      <Button onClick={getTest}>123</Button>
    </div>
  )
}

export default observer(Test)

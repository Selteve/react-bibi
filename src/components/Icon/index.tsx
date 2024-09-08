import React from 'react'
import { IconProps } from '@/type'
const Icon: React.FC<IconProps> = ({ type }) => {
    return (
      <img
        src={`https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/reactbase/ka/${type}.svg`}
        alt="icon"
        style={{
          width: 20,
          height: 20,
        }}
      />
    )
  }
  
  export default Icon
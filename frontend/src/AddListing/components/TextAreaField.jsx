import React from 'react'
import { Textarea } from "@/components/ui/textarea"

const TextAreaField = ({item,handleInputChange}) => {
  return (
    <div>
      <Textarea name={item.name} onChange={(e)=>handleInputChange(item.name,e.target.value)} />
    </div>
  )
}

export default TextAreaField

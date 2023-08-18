import { Button } from '@mui/material'
import { useState, forwardRef, useImperativeHandle } from 'react'

const Toggleable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  if (visible) {
    return (
      <div>
        {props.children}
        <Button variant='contained' onClick={toggleVisibility}>Cancel</Button>
      </div>
    )
  } else {
    return (
      <div>
        <Button variant='contained' onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
    )
  }
})

Toggleable.displayName = 'Toggleable'

export default Toggleable

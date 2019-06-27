import React, { useEffect, useState } from 'react'
import Dialog from './index'
import Button from '../Button'

export default function DialogDelete({ handleRemove, toRemove }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (toRemove) {
      setOpen(true)
    }
  }, [toRemove])

  async function handleClick() {
    handleRemove(toRemove.id)
    setOpen(false)
  }

  console.log({ toRemove })

  return (
    <Dialog
      open={open}
      handleCancel={() => setOpen(false)}
      title="Remove tool"
      content={
        <span>
          Are you sure you want to remove <b>{toRemove && toRemove.title}</b>?
        </span>
      }
      actions={
        <>
          <Button onClick={() => setOpen(false)}>cancel</Button>
          <Button variant="contained" color="danger" onClick={handleClick}>
            Yes, remove
          </Button>
        </>
      }
    />
  )
}

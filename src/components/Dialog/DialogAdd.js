import React, { useEffect, useState, useCallback, useReducer } from 'react'
import Dialog from './index'
import Button from '../Button'
import TextField from '../TextField'
import api from '../../api'

function checkUrl(str) {
  const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
  return regexp.test(str)
}

function validate(values) {
  const errors = {}

  if (!values.title) {
    errors.title = 'Please insert tool name'
  } else if (values.title.length > 20 || values.title.length < 3) {
    errors.title = 'Please enter a value between 3 and 20 characters'
  }

  if (!values.link) {
    errors.link = 'Please insert tool link'
  } else if (!checkUrl(values.link)) {
    errors.link = 'Please enter a valid url'
  }

  if (!values.description) {
    errors.description = 'Please insert tool description'
  } else if (values.description.length > 50 || values.description.length < 6) {
    errors.description = 'Please enter a value between 6 and 50 characters'
  }

  if (!values.tags) {
    errors.tags = 'Please insert tool tags'
  } else if (values.tags.length > 20 || values.tags.length < 3) {
    errors.tags = 'Please enter a value between 3 and 20 characters'
  }

  return errors
}

const initialState = {
  values: {
    title: 'name',
    link: 'https://adasdas.com',
    description: 'description',
    tags: 'tags',
  },
  errors: {},
  loading: false,
  open: false,
}

function reducer(state, { type, ...payload }) {
  switch (type) {
    case 'setValue':
      return {
        ...state,
        values: {
          ...state.values,
          [payload.field]: payload.value,
        },
        errors: {}, // clear errors when update some field
      }

    case 'reset':
      return initialState

    default:
      return { ...state, ...payload }
  }
}

export default function DialogAdd({ openKey, rootDispatch }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (openKey) {
      dispatch({ open: true })
    }
  }, [openKey])

  const sendData = useCallback(
    async (values) => {
      dispatch({ loading: true })
      try {
        const response = await api('/tools', {
          method: 'post',
          body: {
            ...values,
            tags: values.tags.trim().split(' '),
          },
        })

        rootDispatch({ type: 'addTool', item: response })
        dispatch({ type: 'reset' })
      } catch (error) {
        console.log({ error })
        dispatch({ loading: false })
      }
    },
    [rootDispatch],
  )

  async function handleSubmit(e) {
    e && e.preventDefault()

    const errors = validate(state.values)

    if (Object.keys(errors).length) {
      return dispatch({ errors })
    }

    sendData(state.values)
  }

  function handleChange(e) {
    const { name, value } = e.target
    dispatch({ type: 'setValue', field: name, value })
  }

  function getProps(field) {
    return {
      value: state.values[field],
      error: state.errors[field],
      name: field,
      required: true,
      onChange: handleChange,
      disabled: state.loading,
    }
  }

  const withErrors = Object.keys(state.errors).length > 0

  return (
    <Dialog
      open={state.open}
      handleCancel={() => dispatch({ type: 'reset' })}
      title="Add new tool"
      content={
        <div>
          <TextField {...getProps('title')} label="Tool Name" />
          <TextField {...getProps('link')} label="Tool Link" />
          <TextField
            {...getProps('description')}
            label="Tool Description"
            inputComponent="textarea"
          />
          <TextField {...getProps('tags')} label="Tool Tags" />
        </div>
      }
      actions={
        <>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={withErrors || state.loading}
          >
            {state.loading ? 'Creating...' : 'Add tool'}
          </Button>
        </>
      }
    />
  )
}

import React, { useEffect, useCallback, useRef, useReducer } from 'react'
import styled from 'styled-components'
import Fuse from 'fuse.js'
import api from './api'
import FiltersBar from './components/FiltersBar'
import Tool from './components/Tool'
import DialogDelete from './components/Dialog/DialogDelete'
import DialogAdd from './components/Dialog/DialogAdd'

const Main = styled.div`
  width: 100%;
  padding: 20px;

  @media (min-width: 800px) {
    max-width: 768px;
    margin: 100px auto;
  }
`

const Header = styled.div`
  margin-bottom: 22px;
  & > h1 {
    margin-bottom: 22px;
  }
`

function reducer(state, { type, ...payload } = {}) {
  switch (type) {
    case 'init':
      return { ...state, ...payload, loading: false, fetchedTools: true }

    case 'removeTool':
      return {
        ...state,
        removing: false,
        tools: state.tools.filter((item) => item.id !== payload.id),
      }

    case 'addTool':
      return {
        ...state,
        tools: state.tools.concat(payload.item),
      }

    case 'dialogAdd':
      return {
        ...state,
        dialogAdd: state.dialogAdd ? state.dialogAdd + 1 : 1,
      }

    default:
      return { ...state, ...payload }
  }
}

const searchOptions = {
  keys: ['title', 'description', 'tags'],
  shouldSort: true,
  threshold: 0.1,
  location: 0,
  distance: 500,
  maxPatternLength: 32,
  minMatchCharLength: 3,
  includeMatches: true,
}

function App() {
  const search = useRef({})
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    searchValue: '',
    tagsOnly: true,
  })

  useEffect(() => {
    async function init() {
      try {
        const tools = await api('/tools')
        dispatch({ type: 'init', tools })
      } catch (error) {
        dispatch({ loading: false, error: error.message })
      }
    }

    init()
  }, [])

  useEffect(() => {
    if (state.tools) {
      search.current.fuse = new Fuse(
        state.tools,
        state.tagsOnly ? { ...searchOptions, keys: ['tags'] } : searchOptions,
      )
    }
  }, [state.tools, state.tagsOnly])

  const handleRemove = useCallback(async (id) => {
    dispatch({ removing: id, toRemove: null })
    try {
      await api(`/tools/${id}`, { method: 'delete' })
      dispatch({ type: 'removeTool', id })
    } catch (error) {
      dispatch({ removing: false, toRemove: null, error: error.message })
    }
  }, [])

  useEffect(() => {
    const { fuse } = search.current
    if (state.searchValue) {
      const result = fuse.search(state.searchValue)
      dispatch({ filtered: result })
    }
  }, [state.searchValue, state.tools, state.tagsOnly])

  // console.log(state)

  return (
    <>
      <DialogDelete toRemove={state.toRemove} handleRemove={handleRemove} />
      <DialogAdd openKey={state.dialogAdd} dispatch={dispatch} />

      <div>
        <Main>
          <Header>
            <h1>VUTTR</h1>
            <h4>Very Useful Tools to Remember</h4>
          </Header>

          <FiltersBar
            dispatch={dispatch}
            searchValue={state.searchValue}
            tagsOnly={state.tagsOnly}
            disabled={!state.fetchedTools}
          />

          <br />

          {state.loading && <h5>loading...</h5>}

          {state.tools &&
            (state.searchValue && state.filtered
              ? state.filtered
              : state.tools
            ).map((item) => {
              const data = item.item || item
              return (
                <Tool
                  key={data.id}
                  {...data}
                  matches={item.matches}
                  removing={state.removing}
                  handleRemove={(toRemove) => dispatch({ toRemove })}
                />
              )
            })}

          {state.fetchedTools && state.tools.length === 0 && (
            <h5>Nothing to show here :(</h5>
          )}
        </Main>
      </div>
    </>
  )
}

export default App

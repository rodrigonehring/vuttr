import React from 'react'
import styled from 'styled-components'

import Button from './Button'
import SearchIcon from './icons/SearchIcon'
import CloseIcon from './icons/Close'
import CheckBox from './Checkbox'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 800px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  @media (max-width: 800px) {
    & > * {
      margin: 10px 0;
    }
  }
`

const SearchInput = styled.div`
  position: relative;
  & > input {
    background: #f5f4f6;
    font-size: 14px;
    border: 1px solid #ebeaed;
    border-radius: 5px;
    padding: 16px 16px 16px 46px;
    color: #170c3a;
    &:focus {
      outline: none;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    }
  }
  & > svg {
    position: absolute;
    top: 14px;
    left: 12px;
  }
  @media (max-width: 800px) {
    & > input {
      width: 100%;
    }
  }
`

function FiltersBar({ searchValue, dispatch, tagsOnly }) {
  return (
    <Wrapper>
      <SearchInput>
        <SearchIcon />
        <input
          placeholder="search"
          value={searchValue}
          onChange={(e) => dispatch({ searchValue: e.target.value })}
        />
      </SearchInput>

      <CheckBox
        checked={tagsOnly}
        onChange={(e) => dispatch({ tagsOnly: e.target.checked })}
        label="search in tags only"
      />

      <div>
        <Button
          variant="contained"
          onClick={() => dispatch({ type: 'dialogAdd' })}
        >
          <CloseIcon style={{ transform: 'rotate(45deg)' }} fill="#fff" /> add
        </Button>
      </div>
    </Wrapper>
  )
}

export default FiltersBar

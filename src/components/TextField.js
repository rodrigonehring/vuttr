import React from 'react'
import styled, { css } from 'styled-components'

const Wrapper = styled.fieldset`
  border: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin-bottom: 16px;

  &.field-error input,
  &.field-error textarea {
    background: #feefee;
    border-color: #f95e5a;
    color: #f95e5a;
  }
`

const Input = styled.input`
  width: 100%;
  background: #f5f4f6;
  border: 1px solid #ebeaed;
  border-radius: 5px;
  height: 50px;
  padding: 0 22px;
  color: #170c3a;
  font-size: 20px;

  &:focus {
    background: #ebeaed;
    outline: none;
    border-color: #dedce1;
  }

  ${(props) =>
    props.as === 'textarea' &&
    css`
      height: 180px;
      padding-top: 22px;
    `}
`

const Label = styled.label`
  color: #170c3a;
  font-size: 20px;
  margin-bottom: 20px;
`

const ErrorMessage = styled.span`
  color: red;
  text-align: right;
  color: #f95e5a;
  font-size: 18px;
  margin-top: 8px;
`

function TextField({ label, name, value, error, onChange, inputComponent }) {
  const withError = !!error

  return (
    <Wrapper className={withError ? 'field-error' : ''}>
      <Label htmlFor={name}>{label}</Label>
      <Input
        value={value}
        onChange={onChange}
        as={inputComponent}
        name={name}
      />
      {withError && <ErrorMessage>{error}</ErrorMessage>}
    </Wrapper>
  )
}

export default TextField

import React from 'react'
import styled from 'styled-components'

const Label = styled.label`
  display: block;
  position: relative;
  padding-left: 20px;
  cursor: pointer;
  font-size: 16px;
  user-select: none;
  color: #170c3a;
  width: 100%;
  margin: 0 12px;
  line-height: 17px;

  & input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 15px;
    width: 15px;
    background-color: #eee;
    border-radius: 2px;
    border: 1px solid #dedce1;
  }

  &:hover input ~ .checkmark {
    background-color: #ccc;
  }

  & input:checked ~ .checkmark {
    background-color: #365df0;
    border-color: #365df0;
  }

  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }

  & input:checked ~ .checkmark:after {
    display: block;
  }

  & .checkmark:after {
    left: 5px;
    top: 1px;
    width: 3px;
    height: 9px;
    border: solid white;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`

export default function CheckBox({ label, checked, onChange }) {
  return (
    <Label>
      <input type="checkbox" onChange={onChange} checked={checked} />
      <span className="checkmark" />
      {label}
    </Label>
  )
}

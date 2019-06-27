import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import cx from 'classnames'

const ButtonStyled = styled.button`
  border-radius: 5px;
  font-size: 18px;
  border: none;
  display: inline-flex;
  white-space: nowrap;
  padding: 0 14px;
  height: 50px;
  display: inline-flex;
  align-items: center;
  background: none;
  color: #365df0;

  &:not(.contained) {
  }

  &:focus {
    outline: none;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  }

  &.contained.neutral {
    background: #365df0;
    color: #fff;

    &:active {
      background: #244aa8;
    }

    &:disabled {
      background: #b9c6fa;
    }

    &:hover:not(:disabled) {
      background: #2f55cc;
    }
  }

  &.contained.danger {
    background: #f95e5a;
    color: #fff;

    &:active {
      background: #a53f3f;
    }

    &:disabled {
      background: #fcaeac;
    }

    &:hover:not(:disabled) {
      background: #cc4c4c;
    }
  }

  &:hover:not(:disabled) {
    cursor: pointer;
  }

  & > svg:first-child {
    margin-right: 8px;
  }
`

function Button({ children, variant, color, className, ...props }) {
  return (
    <ButtonStyled {...props} className={cx(variant, className, color)}>
      {children}
    </ButtonStyled>
  )
}

Button.prototype = {
  color: PropTypes.oneOf(['neutral', 'danger']),
  variant: PropTypes.oneOf(['default', 'contained']),
  className: PropTypes.string,
}

Button.defaultProps = {
  color: 'neutral',
  variant: 'default',
}

export default Button

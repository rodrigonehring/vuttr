import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Button from '../Button'
import CloseIcon from '../icons/Close'

const Wrapper = styled.div`
  background: #170c3a;
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  top: 0;
  left: 0;
  overflow-y: auto;
  @media (max-width: 800px) {
    padding: 20px;
  }
`

const Main = styled.div`
  width: 100%;

  background: #fff;
  border-radius: 5px;
  position: relative;
  margin-top: 50px;

  @media (min-width: 800px) {
    margin: 100px auto;
    max-width: 600px;
  }
`

const Header = styled.h4`
  display: inline-block;
  width: 100%;
  padding: 30px 30px 15px 30px;
`

const Content = styled.div`
  color: #8f8a9b;
  padding: 15px 30px;
`

const IconButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  right: 30px;
  top: 30px;
  &:hover {
    cursor: pointer;
  }
`

const Footer = styled.div`
  padding: 15px 30px 30px;
  display: flex;
  justify-content: flex-end;
  & > button:nth-child(2) {
    margin-left: 8px;
  }
`

export function useDialog() {
  const [open, setOpen] = React.useState(false)

  return { open, setOpen }
}

function Dialog({ open, title, content, actions, handleCancel }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'initial'
  }, [open])

  if (!open) {
    return null
  }

  return (
    <Wrapper>
      <Main>
        <IconButton onClick={handleCancel}>
          <CloseIcon fill="#365df0" />
        </IconButton>
        <Header>{title}</Header>
        <Content>{content}</Content>
        <Footer>
          {actions || (
            <Button onClick={handleCancel} variant="contained">
              ok
            </Button>
          )}
        </Footer>
      </Main>
    </Wrapper>
  )
}

Dialog.prototype = {
  title: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  actions: PropTypes.element,
  handleCancel: PropTypes.func.isRequired,
  open: PropTypes.bool,
}

Dialog.defaultProps = {
  title: 'Dialog Header',
  content: 'Are you sure you want to remove hotel?',
}

export default Dialog

import React, { useState } from 'react';
import styled from 'styled-components';
import { ResponsiveFlexRow } from '../styled/index';
import { Button } from './Button'

const Input = styled.input`
  margin-left: ${({theme}) => (theme.spacing.xs)};
  background-color: transparent;
  border: none;
  border-bottom: 1pt solid ${({theme}) => (theme.colors.secondary)};

  ::placeholder {
    color: ${({theme}) => (theme.colors.secondary)};
    opacity: 1;
  }
`

export function UserAuth() {
  const [state, setState] = useState({
    email: '',
    password: ''
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log(state)
    setState({
      email: '',
      password: ''
    })
    e.preventDefault()
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [e.currentTarget.name]: e.currentTarget.value })
  }

  return (
    <ResponsiveFlexRow>
      <form onSubmit={e => handleSubmit(e)}>
        <Input type='text' name='email' placeholder='email' value={state.email} onChange={e => handleChange(e)}></Input>
        <Input type='text' name='password' placeholder='password' value={state.password} onChange={e => handleChange(e)}></Input>
        <Button login type='submit' onClick={(e: React.ChangeEvent<HTMLInputElement>) => e.currentTarget.blur()}>login</Button>
      </form>
    </ResponsiveFlexRow>
  )
}
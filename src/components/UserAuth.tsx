import React, { useState } from 'react';
import styled from 'styled-components';

import { login } from '../helpers/login';

import { ResponsiveFlexRow } from '../styled/index';
import { Button } from './Button'

interface props {
  loggedIn: boolean,
  setLogin: React.Dispatch<React.SetStateAction<boolean>>
}

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

export const UserAuth: React.FC<props> = ({loggedIn, setLogin}) => {
  const [state, setState] = useState({
    email: '',
    password: ''
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    login(state.email, state.password)
    .then((res: any) => {
      setLogin(true)
      console.log(res)
    })
    .catch((e: any) => console.log(e))

    setState({
      email: '',
      password: ''
    })
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [e.currentTarget.name]: e.currentTarget.value })
  }

  return (
    <ResponsiveFlexRow>
      {!loggedIn ? <form onSubmit={handleSubmit}>
        <Input type='email' name='email' placeholder='email' value={state.email} onChange={handleChange} autoComplete='email'></Input>
        <Input type='password' name='password' placeholder='password' value={state.password} onChange={handleChange} autoComplete='current-password'></Input>
        <Button login type='submit' onClick={(e: React.ChangeEvent<HTMLInputElement>) => e.currentTarget.blur()}>login</Button>
      </form> : 
      'logged in!'}
    </ResponsiveFlexRow>
  )
}
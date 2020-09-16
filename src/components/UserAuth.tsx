import React, { useState } from 'react';
import styled from 'styled-components';

import { login } from '../helpers/login';

import { Button } from './Button';

interface props {
  loggedIn: {
    status: boolean, 
    user: (string | null)
  },
  setLogin: React.Dispatch<React.SetStateAction<{
    status: boolean, 
    user: (string | null)
  }>>
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

const AuthBar = styled.div`
  text-align: right;
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
      setLogin({user: res.username, status: true})
      console.log(res)
    })
    .catch((e: any) => console.log(e.status, e.message))

    setState({
      email: '',
      password: ''
    })
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [e.currentTarget.name]: e.currentTarget.value })
  }

  return (
    <AuthBar>
      {!loggedIn.status ? (
          <>
          <form onSubmit={handleSubmit}>
            <Input type='email' name='email' placeholder='email' value={state.email} onChange={handleChange} autoComplete='email'></Input>
            <Input type='password' name='password' placeholder='password' value={state.password} onChange={handleChange} autoComplete='current-password'></Input>
            <Button login type='submit' onClick={(e: React.ChangeEvent<HTMLInputElement>) => e.currentTarget.blur()}>login</Button>
            <span>or</span>
            <Button signup onClick={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault()
            e.stopPropagation()
            console.log('signup clicked')
            }}>sign up</Button>
          </form>
          </>
        ) : (
          <p>{loggedIn.user}</p>
      )}
    </AuthBar>
  )
}
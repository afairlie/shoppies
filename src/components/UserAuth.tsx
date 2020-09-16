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

const AuthBar = styled.div`
  text-align: right;
`
// position: absolute;
// z-index: 1000;
// right: 0px;

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

const Register = styled.h1`
  position: relative;
  text-align: left;
`

const User = styled.p`
  margin: 2pt;
`
const Form = styled.form`
  display: inline-block;
`

export const UserAuth: React.FC<props> = ({loggedIn, setLogin}) => {
  const [displaySignup, setSignup] = useState<boolean>(false)
  const [state, setState] = useState({
    name: '',
    email: '',
    password: ''
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    e.stopPropagation()

    login(state.email, state.password, state.name)
    .then((res: any) => {
      setLogin({user: res.username, status: true})
      console.log(res)
    })
    .catch((e: any) => console.log(e.status, e.message))

    setState({
      name: '',
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
          <Form onSubmit={handleSubmit}>
            {displaySignup && <Register>register </Register>}
            {displaySignup && <Input type='username' name='name' placeholder='username' value={state.name} onChange={handleChange} autoComplete='username'></Input>}
            <Input type='email' name='email' placeholder='email' value={state.email} onChange={handleChange} autoComplete='email'></Input>
            <Input type='password' name='password' placeholder='password' value={state.password} onChange={handleChange} autoComplete='current-password'></Input>
            <Button login type='submit' onClick={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.currentTarget.blur()
              }}>{displaySignup ? 'confirm' : 'login'}</Button>
            <span>or</span>
            <Button signup={!displaySignup} cancelSignup={displaySignup} onClick={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.preventDefault()
              e.stopPropagation()
              e.currentTarget.blur()
              setSignup(!displaySignup)
            }}>{displaySignup ? 'cancel' : 'register'}</Button>
          </Form>
        </>
        ) : (
          <User>{`user: ${loggedIn.user}... logout coming soon!`}</User>
      )}
    </AuthBar>
  )
}
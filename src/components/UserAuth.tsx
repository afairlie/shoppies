import React, { useState } from 'react';
import styled from 'styled-components';

import { movie } from '../interfaces';
import { login } from '../helpers/login';
import { fetchUserMovies } from '../helpers/fetchUserMovies';

import { Button } from './Button';

interface props {
  loggedIn: {
    status: boolean, 
    user: (string | null)
  },
  setLogin: React.Dispatch<React.SetStateAction<{
    status: boolean, 
    user: (string | null)
  }>>,
  nominate: (nominations: movie[], saved?: boolean) => void,
  restart: () => void
}

interface styledProps {
  signup: boolean;
}

const AuthBar = styled.div<styledProps>`
  text-align: ${props => props.signup ? 'left' : 'right'};
  ${props => props.signup && `
    background-color: lemonChiffon;
    margin: 2vh 4vw 0vh;
    border-radius: 4pt;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  `}
`
const Form = styled.form<styledProps>`
  display: inline-block;
  ${props => props.signup && `
    padding: 1vw;
  `}
`

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
  padding: 2pt;
  text-align: left;
`

const User = styled.span`
  margin: 2pt;
`

const ErrorMessage = styled.p<styledProps>`
  padding-top: 10pt;
  color: red;
  ${props => !props.signup && `
    display: inline;
    width: 100%;
    text-align: left;
  `}
`

export const UserAuth: React.FC<props> = ({loggedIn, setLogin, nominate, restart}) => {
  const [displaySignup, setSignup] = useState<boolean>(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    e.stopPropagation()

    login(form.email, form.password, form.name)
    .then((res: any) => {
      if (res.nominations) {
        fetchUserMovies(res)
        .then(responses => {
          // format nominations
          const userNominations: movie[] = responses.map( res => {
            return { id: res.imdbID, title: res.Title, year: res.Year, nominated: true }
          })
          // add nominations list to state
          nominate(userNominations, true)
        })
        .catch(e => { throw new Error('api search error') })
      }
      setSignup(false)
      setLogin({user: res.username, status: true})
    })
    .catch((e: any) => {
      setError(e.message.error)
      setTimeout(() => {
        setError('')
      }, 2000)
    })

    setForm({
      name: '',
      email: '',
      password: ''
    })
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value })
  }

  return (
    <AuthBar signup={displaySignup}>
      {!loggedIn.status ? (
        <>
          <Form signup={displaySignup} onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
            {displaySignup && <Register>register </Register>}
            {error && <ErrorMessage signup={displaySignup}>{error}</ErrorMessage>}
            {displaySignup && <Input type='username' name='name' placeholder='username' value={form.name} onChange={handleChange} autoComplete='username'></Input>}
            <Input type='email' name='email' placeholder='email' value={form.email} onChange={handleChange} autoComplete='email'></Input>
            <Input type='password' name='password' placeholder='password' value={form.password} onChange={handleChange} autoComplete='current-password'></Input>
            <Button login type='submit' onClick={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (displaySignup && (!form.name || !form.email || !form.password)) {
                e.preventDefault()
                setError('Sorry, all fields are required.')
                setTimeout(() => {
                  setError('')
                }, 2000)
              }
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
        ) : (<>
            <User>{loggedIn.user}</User>
            <Button logout onClick={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.currentTarget.blur()
              restart()
              setLogin({status: false, user: null})
            }}>logout</Button>
          </>
      )}
    </AuthBar>
  )
}
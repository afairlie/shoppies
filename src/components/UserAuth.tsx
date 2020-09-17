import React, { useState } from 'react';
import styled from 'styled-components';

import { movie } from '../interfaces';
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
  }>>,
  nominate: (nominations: movie[], saved?: boolean) => void
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
// background-color: ${props => props.signup && 'white'};

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
  padding: 2pt;
  text-align: left;
`

const User = styled.p`
  margin: 2pt;
`

export const UserAuth: React.FC<props> = ({loggedIn, setLogin, nominate}) => {
  const [displaySignup, setSignup] = useState<boolean>(false)
  const [state, setState] = useState({
    name: '',
    email: '',
    password: ''
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const key = '538adb24';
    e.preventDefault()
    e.stopPropagation()

    login(state.email, state.password, state.name)
    .then((res: any) => {
      if (res.nominations) {
        const movie1 = async function() {
          const response = await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${res.nominations['1']}&type=movie`)
          return await response.json()
        }()
        const movie2 = async function() {
          const response = await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${res.nominations['2']}&type=movie`)
          return await response.json()
        }()
        const movie3 = async function() {
          const response = await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${res.nominations['3']}&type=movie`)
          return await response.json()
        }()
        const movie4 = async function() {
          const response = await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${res.nominations['4']}&type=movie`)
          return await response.json()
        }()
        const movie5 = async function() {
          const response = await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${res.nominations['5']}&type=movie`)
          return await response.json()
        }()
        // fetch user movie info
        Promise.all([movie1, movie2, movie3, movie4, movie5])
        .then(responses => {
          const userNominations: movie[] = responses.map( res => {
            // format movie object (make sure nominated: true)
            return { id: res.imdbID, title: res.Title, year: res.Year, nominated: true }
          })
          nominate(userNominations, true)
          // nomiate(movie) (function at app lvl)
        })
        .catch(e => { throw new Error('api search error') })
      }

      setLogin({user: res.username, status: true})
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
    <AuthBar signup={displaySignup}>
      {!loggedIn.status ? (
        <>
          <Form signup={displaySignup} onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
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
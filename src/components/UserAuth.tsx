import React, { useState } from 'react';
import { ResponsiveFlexRow } from '../styled/index';
import { Button } from './Button'

export function UserAuth() {
  const [state, setState] = useState({
    email: '',
    password: ''
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log(state)
    e.preventDefault()
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [e.currentTarget.name]: e.currentTarget.value })
    e.preventDefault()
  }

  return (
    <ResponsiveFlexRow>
      <form onSubmit={e => handleSubmit(e)}>
        <input type='text' name='email' placeholder='email' value={state.email} onChange={e => handleChange(e)}></input>
        <input type='text' name='password' placeholder='password' value={state.password} onChange={e => handleChange(e)}></input>
        <Button login type='submit'>login</Button>
      </form>
    </ResponsiveFlexRow>
  )
}
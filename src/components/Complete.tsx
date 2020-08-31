import React from 'react'
import styled from 'styled-components'
import { movie } from '../interfaces'

interface props {
  nominations: movie[],
  restart: () => void
}

const Container = styled.div`

`
export const Complete: React.FC<props> = ({nominations, restart}) => {
  return (
    <Container>
      <h1>Congratulations, your list is complete!</h1>
      <h2>would you like to</h2>
      <button>share</button> or <button type='reset' onClick={e => restart()}>restart</button>
    </Container>
  )
}
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
      <h1>you nominated:</h1>
      <ul>
        {nominations && nominations.map((movie, index) => {
          return (
            <li key={index}>{`${movie.title}, ${movie.year}`}</li>
          )
        })}
      </ul>
      <h2>would you like to</h2>
      <button>share</button> or <button onClick={e => restart()}>restart</button>
    </Container>
  )
}
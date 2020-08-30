import React from 'react'
import styled from 'styled-components'
import { movie } from '../interfaces'
import { FlexColumn } from '../styled/index'

interface props {
  nominations: movie[],
  removeNomination: (movie: movie) => void,
}

const NominationsList = styled.ul`
  color: ${({theme}) => theme.colors.primary};
`

export const Nominations: React.FC<props> = ({nominations, removeNomination}) => {
  return (
    <FlexColumn>
      <h1>Nominations</h1>
      <NominationsList>
        {nominations && nominations.map((movie, index) => {
          return <li key={index}>
                  {`${movie.title}, ${movie.year} `}
                  <button onClick={() => removeNomination(movie)}>remove</button>
                </li>
        })}
      </NominationsList>
    </FlexColumn>
  )
}
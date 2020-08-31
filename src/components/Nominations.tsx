import React from 'react'
import styled from 'styled-components'
import { movie } from '../interfaces'
import { FlexColumn } from '../styled/index'
import {Button} from '../components/Button'

interface props {
  nominations: movie[],
  removeNomination: (movie: movie) => void,
}

const NominationsList = styled.ul`
display: flex;
flex-direction: column;
color: ${({theme}) => theme.colors.primary};

li {
  display: flex;
  justify-content: space-between;
  padding-right: ${({theme}) => theme.spacing.md};
}
`

export const Nominations: React.FC<props> = ({nominations, removeNomination}) => {
  return (
      <FlexColumn>
        <h1>{nominations.length ? `Nominations (${nominations.length}/5)` : null}</h1>
        <NominationsList>
          {nominations && nominations.map((movie, index) => {
            return <li key={index}>
                    {`${movie.title}, ${movie.year} `}
                    <Button cancel onClick={() => removeNomination(movie)}>remove</Button>
                  </li>
          })}
        </NominationsList>
      </FlexColumn>
  )
}
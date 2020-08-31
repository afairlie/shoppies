import React from 'react'
import styled from 'styled-components'
import { movie } from '../interfaces'
import { FlexColumn } from '../styled/index'
import { Button } from '../components/Button'

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
}

@media (min-width: 780px) {
  li {
    padding-right: ${({theme}) => theme.spacing.sm};
  }
}
`

const Title = styled.h1`
  @media (max-width: 779px) {
    padding-bottom: ${({theme}) => theme.spacing.md};
  }
  
`

export const Nominations: React.FC<props> = ({nominations, removeNomination}) => {
  return (
      <FlexColumn>
        <Title>{nominations.length ? `Nominations (${nominations.length}/5)` : null}</Title>
        <NominationsList>
          {nominations && nominations.map((movie, index) => {
            return <li key={index}>
                    <span>{`${movie.title}, ${movie.year} `}</span>
                    <Button cancel onClick={() => removeNomination(movie)}>remove</Button>
                  </li>
          })}
        </NominationsList>
      </FlexColumn>
  )
}
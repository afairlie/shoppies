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
width: 100%;
color: ${({theme}) => theme.colors.primary};

li {
  display: flex;
  justify-content: space-between;
  padding-right: ${({theme}) => theme.spacing.md};
}

li:hover {
  color: ${({theme}) => theme.colors.highlightPrimary};
}
`

const Title = styled.h1`
  font-family: ${({theme}) => (theme.fontFamily.title)};
  font-size: ${({theme}) => (theme.fontSize.md)};
  margin-bottom: ${({theme}) => (theme.spacing.sm)};
`

export const Nominations: React.FC<props> = ({nominations, removeNomination}) => {
  return (
    <FlexColumn>
      <Title>{nominations.length ? 'Nominations' : null}</Title>
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
import React from 'react'
import styled from 'styled-components'
import { movie } from '../interfaces'
import { FlexColumn } from '../styled/index'
import {Button} from '../components/Button'

interface props {
  results: movie[],
  nominate: (movie: movie) => void
}

const ResultsList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${({theme}) => theme.colors.secondary};
  margin-bottom: ${({theme}) => theme.spacing.md};

  li {
    display: flex;
    justify-content: space-between;
  }

  @media (min-width: 780px) {
    li {
      padding: ${({theme}) => (`0 ${theme.spacing.md} 0 ${theme.spacing.sm}`)};
    }
  }
`

// const Title = styled.h1`
//   padding-bottom: ${({theme}) => theme.spacing.sm};
// `

export const Results: React.FC<props> = ({results, nominate}) => {
  return (
    <FlexColumn>
      {/* <Title>{results.length ? 'Results' : null}</Title> */}
      <ResultsList>
        {results && results.map((movie, index) => {
          return <li key={index}>
                  <span>{`${movie.title}, ${movie.year} `}</span>
                  <Button primary disabled={movie.nominated} onClick={() => nominate(movie)}>{movie.nominated ? 'nominated' : 'nominate!'}</Button>
                </li>
        })}
      </ResultsList>
    </FlexColumn>
  )
}
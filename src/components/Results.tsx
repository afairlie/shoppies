import React from 'react'
import styled from 'styled-components'
import { movie } from '../interfaces'
import { FlexColumn } from '../styled/index'

interface props {
  results: movie[],
  nominate: (movie: movie) => void
}

const ResultsList = styled.ul`
  color: ${({theme}) => theme.colors.secondary}
`

export const Results: React.FC<props> = ({results, nominate}) => {
  return (
    <FlexColumn>
      <h1>Results</h1>
      <ResultsList>
        {results && results.map((movie, index) => {
          return <li key={index}>
                  {`${movie.title}, ${movie.year} `}
                  <button disabled={movie.nominated} onClick={() => nominate(movie)}>{movie.nominated ? 'nominated' : 'nominate!'}</button>
                </li>
        })}
      </ResultsList>
    </FlexColumn>
  )
}
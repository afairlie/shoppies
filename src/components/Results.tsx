import React from 'react'
import styled from 'styled-components'
import { movie } from '../interfaces'

interface props {
  results: movie[],
  nominate: (movie: movie) => void
}

const ResultsList = styled.ul`
  color: ${({theme}) => theme.colors.primary}
`

export const Results: React.FC<props> = ({results, nominate}) => {
  return (
    <>
      <h1>Results</h1>
      <ResultsList>
        {results && results.map((movie, index) => {
          return <li key={index}>
                  {`${movie.title}, ${movie.year} `}
                  <button disabled={movie.nominated} onClick={() => nominate(movie)}>{movie.nominated ? 'nominated' : 'nominate!'}</button>
                </li>
        })}
      </ResultsList>
    </>
  )
}
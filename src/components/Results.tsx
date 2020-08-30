import React from 'react'
import styled from 'styled-components'
import { movie } from '../interfaces'
import { FlexColumn } from '../styled/index'
import { Button } from '../components/Button'

interface props {
  results: movie[],
  nominate: (movie: movie) => void
}

const ResultsList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${({theme}) => theme.colors.secondary};

  li {
    display: flex;
    justify-content: space-between;
    padding-right: ${({theme}) => theme.spacing.md};
  }

  li:hover {
    color: ${({theme}) => theme.colors.highlightPrimary};
  }
`

export const Results: React.FC<props> = ({results, nominate}) => {
  return (
    <FlexColumn>
      <h1>{results.length ? 'Results' : null}</h1>
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
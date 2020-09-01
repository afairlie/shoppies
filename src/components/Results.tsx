import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { movie } from '../interfaces'

import { Button } from './Button'

interface props {
  results: movie[],
  nominate: (movie: movie) => void
}

const ResultsList = styled(motion.ul)`
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

const container = {
  hidden: {scale: 0},
  show: {
    scale: 1,
  }
}

const item = {
  hidden: { scaleY: 0 },
  show: (index: number) => ({ 
    scaleY: 1,
    transition: {
      delay: index * 0.3
    }
  })
}

export const Results: React.FC<props> = ({results, nominate}) => {

  return (
      <ResultsList initial='hidden' animate='show' variants={container}>
          {results && results.map((movie, index) => {
            return <motion.li key={index} variants={item} custom={index}>
              <span>{`${index + 1} ${movie.title}, ${movie.year} `}</span>
              <Button primary disabled={movie.nominated} onClick={() => nominate(movie)}>{movie.nominated ? 'nominated' : 'nominate!'}</Button>
            </motion.li>
          })}
      </ResultsList>
  )
}
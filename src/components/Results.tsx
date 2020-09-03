import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { movie } from '../interfaces'

import { Button } from './Button'

interface props {
  results: movie[],
  nominations: movie[],
  nominate: (movie: movie) => void,
  term: string
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

const ResultsDescription = styled.h2`
  padding: 0;
`

const Error = styled(motion.div)`
  display: flex;
  padding: ${({theme}) => theme.spacing.sm};
  color: ${({theme}) => theme.colors.cancel};
  background-color: white;
  border-radius: ${({theme}) => theme.borderRadius.soften};

  @media (min-width: 780px) {
    margin: ${({theme}) => (`${theme.spacing.sm} ${theme.spacing.md} ${theme.spacing.sm} ${theme.spacing.sm}`)};
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

const errorContainer = {
  hidden: { 
    height: 0
  },
  show: {
    height: 18,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    }
  },
  exit: { 
    height: 0,
    transition: {
      delay: 0.1,
      duration: 0.45,
      ease: "easeInOut",
    }
  }
}

const errorChild = {
  hidden: { scaleY: 0},
  show: { 
    scaleY: 1,
    transition: {
      delay: 0.25
    }
  },
  exit: { 
    scaleY: 0,
    transition: {
      duration: 0.3
    }
  }
}

export const Results: React.FC<props> = ({results, nominations, nominate, term}) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    error && setTimeout(() => {
      setError(false);
    }, 2500)
  }, [error])
  
  return (
      <ResultsList initial='hidden' animate='show' variants={container}>
        {results.length !== 0 && <ResultsDescription>{results.length} result{results.length > 1 && 's'} for "{term}"</ResultsDescription>}
        {(term && results.length === 0) && <ResultsDescription>no results for "{term}"</ResultsDescription>}
        <AnimatePresence exitBeforeEnter>
          {error && <Error initial='hidden' animate='show' exit='exit' variants={errorContainer}>
            <motion.div variants={errorChild}>sorry, you can only nominate 5 films</motion.div>
          </Error>}
        </AnimatePresence>
        {results && results.map((movie, index) => {
          return <motion.li 
                  key={index} 
                  variants={item} 
                  custom={index}>
            <span>{`${movie.title}, ${movie.year} `}</span>
            <Button 
              primary 
              disabled={movie.nominated} 
              onClick={(e: any) => {
                e.currentTarget.blur()
                nominations.length < 5 ? nominate(movie)
                  : setError(true)
              }}>{movie.nominated ? 'nominated' : 'nominate!'}</Button>
          </motion.li>
        })}
      </ResultsList>
  )
}
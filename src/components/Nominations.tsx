import React from 'react'
import styled from 'styled-components'

import { movie } from '../interfaces'
import { FlexColumn } from '../styled/index'
import { Button } from '../components/Button'
import { motion } from 'framer-motion'

interface props {
  nominations: movie[],
  removeNomination: (movie: movie) => void,
}

const NominationsList = styled(motion.ul)`
display: flex;
flex: 2;
flex-direction: column;
color: ${({theme}) => theme.colors.primary};
margin-bottom: ${({theme}) => theme.spacing.sm};

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

const container = {
  hidden: { scaleY: 0 },
  show: {
    scaleY: 1,
    transition: {
      delayChildren: 0.5,
    }
  }
}

const item = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1 }
}

export const Nominations: React.FC<props> = ({nominations, removeNomination}) => {
  return (
      <FlexColumn>
        <Title>{nominations.length ? `Nominations (${nominations.length}/5)` : null}</Title>
        <NominationsList initial='hidden' animate='show' variants={container}>
            {nominations && nominations.map((movie, index) => {
              return <motion.li key={index} variants={item}>
                      <span>{`${movie.title}, ${movie.year} `}</span>
                      <Button cancel onClick={(e: React.ChangeEvent<HTMLInputElement>)=> {
                        e.currentTarget.blur()
                        removeNomination(movie)}}>remove</Button>
                    </motion.li>
            })}
        </NominationsList>
      </FlexColumn>
  )
}
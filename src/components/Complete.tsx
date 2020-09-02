import React from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

import { Button } from './Button'

interface props {
  restart: () => void,
}

const Banner = styled(motion.div)`
  dispay: flex;
  flex-direction: column;
  background-color: ${({theme}) => theme.colors.primary};
  margin-right: ${({theme}) => theme.spacing.sm};
  margin-bottom: ${({theme}) => theme.spacing.md};
  padding: ${({theme}) => theme.spacing.sm};

  border-radius: ${({theme}) => theme.borderRadius.soften};

  @media (max-width: 779px) {
    margin-right: 0;
    padding: ${({theme}) => theme.spacing.md};
  }
`

const container = {
  hidden: { 
    height: 0
  },
  show: {
    height: '100%',
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      // when: 'beforeChildren'
    }
  },
  exit: { 
    height: 0,
    from: 'bottom',
    transition: {
      delay: 0.2,
      duration: 0.4,
      ease: "easeInOut",
      // when: 'afterChildren'
    }
  }
}

const child = {
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

export const Complete: React.FC<props> = ({restart}) => {
  return (
    <Banner initial='hidden' animate='show' exit='exit' variants={container}>
      <AnimatePresence exitBeforeEnter>
        <motion.h1 key={1} variants={child}>Congratulations, your list is complete!</motion.h1>
        <motion.h2 key={2} variants={child}>
          Would you like to <span/>
          <Button cancel onClick={() => restart()}>restart</Button>
          <span/> ?
        </motion.h2>
      </AnimatePresence>
    </Banner>
  )
}
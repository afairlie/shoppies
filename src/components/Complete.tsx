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
    height: 0,
    transition: {
      when: 'afterChildren'
    }
  },
  show: {
    height: '100%',
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      overflow: 'hidden'
    }
  },
  onExit: { 
    height: 0,
    transition: {
      duration: 0.4
    }
  }
}

const child = {
  hidden: { scaleY: 0},
  show: { scaleY: 1 },
  onExit: { 
    scaleY: 0,
    transition: {
      duration: 0.2
    }
  }
}

export const Complete: React.FC<props> = ({restart}) => {
  return (
    <Banner initial='hidden' animate='show' exit='onExit' variants={container}>
      <AnimatePresence exitBeforeEnter>
        <motion.h1 variants={child}>Congratulations, your list is complete!</motion.h1>
        <motion.h2 variants={child}>
          Would you like to <span/>
          <Button cancel onClick={() => restart()}>restart</Button>
          <span/> ?
        </motion.h2>
      </AnimatePresence>
    </Banner>
  )
}
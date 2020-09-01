import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

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

export const Complete: React.FC<props> = ({restart}) => {
  return (
    <Banner
      initial={{height: 0 }}
      animate={{height: '100%' }}
      exit={{height: 0}}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
        overflow: 'hidden'
      }}
    >
      <motion.h1>Congratulations, your list is complete!</motion.h1>
      <motion.h2>
        Would you like to <span/>
        <Button cancel onClick={() => restart()}>restart</Button>
        <span/> ?
      </motion.h2>
    </Banner>
  )
}
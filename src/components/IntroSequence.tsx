import React from 'react';
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { ResponsiveFlexRow } from '../styled/index'

const Step = styled(motion.h2)`
  max-width: 12%;
  line-height: 1.25;

  @media (max-width: 779px) {
    max-width: 100%;
  }
`
const introContainer = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1, 
    transition: {
      staggerChildren: 1
    }
  },
  exit: {
    opacity: 0,
  }
}

const introChild = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1
  }
}

export function IntroSequence() {
  return (
    <ResponsiveFlexRow initial='hidden' animate='visible' exit='exit' variants={introContainer}>
      <motion.h1 variants={introChild}>Welcome to the Shoppy Awards!</motion.h1>
      <Step variants={introChild}>Step 1: <br/> search for your favourite film</Step>
      <Step variants={introChild}>Step 2: <br/> nominate it</Step>
      <Step variants={introChild}>Step 3: <br/> repeat!</Step>
      <Step variants={introChild}>Nominate up to 5 films <span role='img' aria-label='thumbs-up'>👍</span></Step>
    </ResponsiveFlexRow>
  )
}
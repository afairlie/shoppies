import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const Cred = styled.p`
  font-size: ${({theme}) => (theme.fontSize.xs)};
  text-align: center;
  padding-bottom: ${({theme}) => (theme.spacing.sm)};

  @media (max-width: 779px) {
    padding-top: ${({theme}) => (theme.spacing.md)};
    min-height: ${({theme}) => (theme.spacing.lg)};
  }
`
const Icon = styled(motion.img)`
  width: ${({theme}) => (theme.fontSize.sm)};
  vertical-align: -3.75pt;
`

export function Footer() {
  return (
    <div>
      <Cred>
        <span>an app by Ariane Fairlie </span>
        <a href="https://www.github.com/afairlie/" target='_blank' rel="noopener noreferrer">
          <Icon whileHover={{ scale: 1.5, y: -5}} src="https://img.icons8.com/nolan/64/github.png" alt='github icon' />
        </a>
        {' '}
        <a href="https://github.com/afairlie/shoppies" target='_blank' rel="noopener noreferrer">
          <Icon whileHover={{ scale: 1.5, y: -5}} src="https://img.icons8.com/wired/64/5e4629/repository.png" alt='app repository icon'/>
        </a>
        {' '}
        <a href="https://www.linkedin.com/in/arianefairlie/" target='_blank' rel="noopener noreferrer">
          <Icon whileHover={{ scale: 1.5, y: -5}} src="https://img.icons8.com/ultraviolet/64/000000/linkedin-circled.png" alt='linkedin icon'/>
        </a>
        <span> visit the api </span>
        <a href="https://github.com/afairlie/shoppies_api" target='_blank' rel="noopener noreferrer">
          <Icon whileHover={{ scale: 1.5, y: -5}} src="https://img.icons8.com/wired/64/5e4629/repository.png" alt='api repository icon'/>
        </a>
      </Cred>
    </div>
  )
}
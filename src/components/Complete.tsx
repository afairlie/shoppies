import React from 'react'
import styled from 'styled-components'
import { Button } from './Button'

interface props {
  restart: () => void
}

const Banner = styled.div`
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
    <Banner>
      <h1>Congratulations, your list is complete!</h1>
      <h2>
        Would you like to <span/>
        <Button cancel onClick={() => restart()}>restart</Button>
        <span/> ?
      </h2>
    </Banner>
  )
}
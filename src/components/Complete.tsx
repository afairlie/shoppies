import React from 'react'
import styled from 'styled-components'
import { movie } from '../interfaces'
import { Button } from './Button'

interface props {
  nominations: movie[],
  restart: () => void
}

const Banner = styled.div`
  dispay: flex;
  flex-direction: column;
  background-color: ${({theme}) => theme.colors.primary};
  padding: ${({theme}) => {
    const s = theme.spacing.sm
    const l = theme.spacing.lg
    return `${s} ${l} ${s} ${s}`
  }};
  margin: ${({theme}) => {
    const sm = theme.spacing.sm
    const md = theme.spacing.md
    return `0 ${md} ${sm} 0`
  }};

  border-radius: ${({theme}) => theme.borderRadius.soften}
`
const Reset = styled(Button)`
  margin-left: 10vw;
`

export const Complete: React.FC<props> = ({nominations, restart}) => {
  return (
    <Banner>
      <h1>Congratulations, your list is complete!</h1>
      <h2>
        Would you like to <span/>
        <Reset cancel onClick={() => restart()}>restart</Reset>
        <span/> ?
      </h2>
    </Banner>
  )
}
import React from 'react'
import styled from 'styled-components'

interface props {
  children: any;
  primary?: boolean;
  secondary?: boolean;
  cancel?: boolean;
}

const PrimaryButton = styled.button`
  background-color: ${({theme}) => (theme.colors.primary)}
`

const SecondaryButton = styled.button`
background-color: ${({theme}) => (theme.colors.secondary)}
`

const CancelButton = styled.button`
background-color: ${({theme}) => (theme.colors.cancel)}
`

export const Button: React.FC<props> = ({children, primary, secondary, cancel}) => {
  return (
    <>
      {primary && <PrimaryButton>{children}</PrimaryButton>}
      {secondary && <SecondaryButton>{children}</SecondaryButton>}
      {cancel && <CancelButton>{children}</CancelButton>}
    </>
  )
}
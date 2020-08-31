import React from 'react'
import styled from 'styled-components'

interface props {
  children: any;
  disabled?: boolean;
  primary?: boolean;
  cancel?: boolean;
  onClick: any;
}

const PrimaryButton = styled.button`
  border: ${({theme}) => (`${theme.borderWidth.sm} solid ${theme.colors.secondary}`)};
  border-radius: ${({theme}) => (theme.borderRadius.soften)};
  color: ${({theme}) => (theme.colors.secondary)};
  background-color: transparent;
  padding: .25rem ${({theme}) => (theme.spacing.xs)};
  
  &:hover {
    background-color: ${({theme}) => (theme.colors.primary)};
    color: ${({theme}) => (theme.colors.highlightPrimary)};
    border-color: transparent;
  }

  &:disabled {
    color: ${({theme}) => (theme.colors.disabledPrimary)};
    border-color: ${({theme}) => (theme.colors.disabledPrimary)};
    pointer-events: none;
  }
`

const CancelButton = styled.button`
  border: ${({theme}) => (`${theme.borderWidth.sm} solid ${theme.colors.cancel}`)};
  border-radius: ${({theme}) => (theme.borderRadius.soften)};
  color: ${({theme}) => (theme.colors.cancel)};
  background-color: transparent;
  padding: .25rem ${({theme}) => (theme.spacing.xs)};

  &:hover {
    background-color: ${({theme}) => (theme.colors.cancel)};
    border: none;
    color: ${({theme}) => (theme.colors.highlightPrimary)};
  }

  &:focus {
    outline: none;
  }
`

export const Button: React.FC<props> = ({children, primary, cancel, disabled, onClick}) => {
  return (
    <>
      {primary && <PrimaryButton disabled={disabled} onClick={onClick}>{children}</PrimaryButton>}
      {cancel && <CancelButton disabled={disabled} onClick={onClick}>{children}</CancelButton>}
    </>
  )
}
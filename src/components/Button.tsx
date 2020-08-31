import React from 'react'
import styled from 'styled-components'

interface props {
  children: any;
  disabled?: boolean;
  primary?: boolean;
  cancel?: boolean;
  onClick: any;
}

const StyledButton = styled.button`
  border-radius: ${({theme}) => (theme.borderRadius.soften)};
  background-color: transparent;
  padding: .25rem ${({theme}) => (theme.spacing.xs)};
  margin-bottom: .25rem;

  &:hover {
    color: ${({theme}) => (theme.colors.highlightPrimary)};
  }
`

const PrimaryButton = styled(StyledButton)`
  border: ${({theme}) => (`${theme.borderWidth.sm} solid ${theme.colors.secondary}`)};
  color: ${({theme}) => (theme.colors.secondary)};

  &:hover {
    background-color: ${({theme}) => (theme.colors.primary)};
    border-color: transparent;
  }

  &:disabled {
    color: ${({theme}) => (theme.colors.disabledPrimary)};
    border-color: ${({theme}) => (theme.colors.disabledPrimary)};
    pointer-events: none;
  }
`

const CancelButton = styled(StyledButton)`
  border: ${({theme}) => (`${theme.borderWidth.sm} solid ${theme.colors.cancel}`)};
  color: ${({theme}) => (theme.colors.cancel)};


  &:hover {
    background-color: ${({theme}) => (theme.colors.cancel)};
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
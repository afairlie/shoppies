import React from 'react'
import styled from 'styled-components'

interface props {
  children: string;
  disabled?: boolean;
  primary?: boolean;
  cancel?: boolean;
  login?: boolean;
  signup?: boolean;
  cancelSignup?: boolean;
  clearSearch?: boolean;
  onClick?: any;
  type?: string;
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
`

const ClearSearch = styled(CancelButton)`
  border: none;
  color: ${({theme}) => (theme.colors.secondary)};
  width: ${({theme}) => (theme.fontSize.lg)};
  align-self: center;
  margin: 0;

  @media (max-width: 779px) {
    font-size: ${({theme}) => (theme.fontSize.xs)};
    width: ${({theme}) => (theme.fontSize.md)};
  }
`
const Login = styled(PrimaryButton)`
  max-height: 20pt;
  margin: .5vw;
`

const Signup = styled(PrimaryButton)`
  max-height: 20pt;
  margin: .5vw;
`

const CancelSignup = styled(CancelButton)`
  margin: .5vw;
`
// margin-right: -3vw;

export const Button: React.FC<props> = ({children, primary, cancel, clearSearch, login, signup, cancelSignup, disabled, onClick}, props) => {
  return (
    <>
      {primary && <PrimaryButton disabled={disabled} onClick={onClick}>{children}</PrimaryButton>}
      {cancel && <CancelButton disabled={disabled} onClick={onClick}>{children}</CancelButton>}
      {clearSearch && <ClearSearch disabled={disabled} onClick={onClick}>{children}</ClearSearch>}
      {login && <Login {...props} onClick={onClick}>{children}</Login>}
      {signup && <Signup onClick={onClick}>{children}</Signup>}
      {cancelSignup && <CancelSignup onClick={onClick}>{children}</CancelSignup>}
    </>
  )
}
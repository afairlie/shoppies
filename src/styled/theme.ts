import { DefaultTheme } from 'styled-components'

export const theme: DefaultTheme = {
  screens: {

  },
  colors: {
    primary: 'blue',
    secondary: 'darkGreen',
    bgPrimary: 'lightGreen',
    bgSecondary: '',
    highlightPrimary: '',
    highlightSecondary: '',
    disabledPrimary: '',
    disabledSecondary: '',
    text: 'navy',
    link: 'orange'
  },
  fontFamily: {
    primary: 'Arial, sans-serif',
    secondary: ''
  },
  fontSize: {
    xs: '0.25rem',
    sm: '0.75rem',
    md: '2rem',
    lg: '4rem',
    xl: '6rem',
  },
  spacing: {
    xs: '0.5vw',
    sm: '1vw',
    md: '5vw',
    lg: '8vw',
    xl: '10vw',
  },
  borderWidth: {
    sm: '1pt',
    md: '2pt',
    lg: '5pt',
  },
  borderRadius: {
    soften: '3pt',
    curve: '10pt'
  }
}
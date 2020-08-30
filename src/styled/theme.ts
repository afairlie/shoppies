import { DefaultTheme } from 'styled-components'

export const theme: DefaultTheme = {
  screens: {

  },
  colors: {
    primary: 'goldenRod',
    secondary: 'darkGreen',
    cancel: 'brickRed',
    bgPrimary: 'lightGreen',
    bgSecondary: '',
    highlightPrimary: 'white',
    highlightSecondary: '#9e7a47',
    disabledPrimary: '',
    disabledSecondary: '',
    text: '#5e4629',
    title: '#160900',
    link: 'orange'
  },
  fontFamily: {
    text: 'Arial, sans-serif',
    title: 'Abril Fatface, cursive'
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
    curve: '50pt'
  }
}
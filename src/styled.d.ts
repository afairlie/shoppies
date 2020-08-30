import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    screens: object,
    colors: {
      primary: string,
      secondary: string,
      cancel: string,
      bgPrimary: string,
      bgSecondary: string,
      highlightPrimary: string,
      highlightSecondary: string,
      disabledPrimary: string,
      disabledSecondary: string,
      text: string,
      title: string,
      link: string
    },
    fontFamily: {
      text: string,
      title: string
    },
    fontSize: {
      xs: string,
      sm: string,
      md: string,
      lg: string,
      xl: string,
    },
    spacing: {
      xs: string,
      sm: string,
      md: string,
      lg: string,
      xl: string,
    },
    borderWidth: {
      sm: string,
      md: string,
      lg: string,
    },
    borderRadius: {
      soften: string,
      curve: string
    }
  }
}
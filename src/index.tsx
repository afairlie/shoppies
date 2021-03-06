import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ThemeProvider, createGlobalStyle } from 'styled-components';
import reset from 'styled-reset'
import { theme } from './styled/theme';

const GlobalStyle = createGlobalStyle`
  ${reset}

  html {
    font-family: ${({theme}) => (theme.fontFamily.text)};
    color: ${({theme}) => (theme.colors.text)};
    background-color: ${({theme}) => (theme.colors.bgPrimary)};
  }

  main {
    min-height: calc(100vh - ${({theme}) => (theme.spacing.md)});
    @media (max-width: 779px) {
      min-height: calc(100vh - ${({theme}) => (theme.spacing.lg)});
    }
  }

  h1 {
    font-family: ${({theme}) => (theme.fontFamily.title)};
    font-size: ${({theme}) => (theme.fontSize.md)};
    margin-bottom: ${({theme}) => (theme.spacing.sm)};
  }

  h2 {
    font-size: ${({theme}) => (theme.fontSize.sm)};
    padding: ${({theme}) => (theme.fontSize.sm)};
  }

  li {
    margin-top: ${({theme}) => (theme.spacing.xs)};
    
    span {
      padding-top: 0.5rem;
    }
  }
  li:last-child {
    margin-bottom: ${({theme}) => (theme.spacing.xs)};
  }
  li:hover {
    color: ${({theme}) => theme.colors.highlightPrimary};
  }
`

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
      <App/>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

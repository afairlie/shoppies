import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ThemeProvider, createGlobalStyle } from 'styled-components';
import reset from 'styled-reset'
import { theme } from './styled/theme';

const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    font-family: ${({theme}) => (theme.fontFamily.text)};
    padding: ${({theme}) => (theme.spacing.md)};
    background-color: ${({theme}) => (theme.colors.bgPrimary)};
  }

  h1 {
    font-family: ${({theme}) => (theme.fontFamily.title)};
    font-size: ${({theme}) => (theme.fontSize.md)};
    margin-bottom: ${({theme}) => (theme.spacing.sm)};
  }

  h2 {
    font-size: ${({theme}) => (theme.fontSize.sm)};
    margin: ${({theme}) => (theme.spacing.sm)};
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

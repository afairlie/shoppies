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
    font-family: ${({theme}) => (theme.fontFamily.primary)};
    padding: ${({theme}) => (theme.spacing.md)};
  }
  li {
    padding-top: ${({theme}) => (theme.spacing.xs)};
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

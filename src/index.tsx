import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";
import config from "./auth_config.json";
import * as serviceWorker from './serviceWorker';

import { ThemeProvider, createGlobalStyle } from 'styled-components';
import reset from 'styled-reset'
import { theme } from './styled/theme';

const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    padding: 0 ${({theme}) => (theme.spacing.md)};
    font-family: ${({theme}) => (theme.fontFamily.text)};
    color: ${({theme}) => (theme.colors.text)};
    background-color: ${({theme}) => (theme.colors.bgPrimary)};
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
    <Auth0Provider
    domain={config.domain}
    clientId={config.clientId}
    audience={config.audience}
    redirectUri={window.location.origin}
  >
      <ThemeProvider theme={theme}>
        <GlobalStyle/>
        <App/>
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

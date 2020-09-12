import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { formatResults } from './helpers/formatResults';
import { movie } from './interfaces'
import { ResponsiveFlexRow } from './styled/index'

import { SearchBar } from './components/SearchBar';
import {Results} from './components/Results';
import {Nominations} from './components/Nominations';
import {Complete} from './components/Complete';
import { LoginButton } from './components/Login';
import { LogoutButton } from './components/Logout';

const MainStyles = styled.div`
  min-height: calc(100vh - ${({theme}) => (theme.spacing.md)});
  @media (max-width: 779px) {
    min-height: calc(100vh - ${({theme}) => (theme.spacing.lg)});
  }
`
const Logo = styled.h1`
  padding-top: ${({theme}) => (theme.spacing.md)};
  font-family: ${({theme}) => (theme.fontFamily.title)};
  font-size: ${({theme}) => (theme.fontSize.xl)};
  background: -webkit-linear-gradient(#160900, #9e7a47);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: ${({theme}) => (theme.spacing.sm)};
  line-height: normal;

  @media (max-width: 779px) {
    font-size: ${({theme}) => (theme.fontSize.md)};
  }
`
const MotionFlexColumn = styled(motion.section)`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const Footer = styled.div`
  
`
const Cred = styled.p`
  font-size: ${({theme}) => (theme.fontSize.xs)};
  text-align: center;
  padding-bottom: ${({theme}) => (theme.spacing.sm)};

  @media (max-width: 779px) {
    padding-top: ${({theme}) => (theme.spacing.md)};
    min-height: ${({theme}) => (theme.spacing.lg)};
  }
`
const Icon = styled.img`
  width: ${({theme}) => (theme.fontSize.sm)};
  vertical-align: -3.75pt;
`

const Step = styled(motion.h2)`
  max-width: 12%;
  line-height: 1.25;

  @media (max-width: 779px) {
    max-width: 100%;
  }
`

const introContainer = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1, 
    transition: {
      staggerChildren: 1
    }
  },
  exit: {
    opacity: 0,
  }
}

const introChild = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1
  }
}

const App: React.FC = () => {
  const { user, isAuthenticated } = useAuth0();
  // introduction animation
  const [visible, setVisible] = useState<boolean>(true);
  // debounced search term for API
  const [term, setTerm] = useState<string>('');
  // controlled input value for SearchBar
  const [value, setValue] = useState('');
  // search results
  const [results, setResults] = useState<movie[]>([]);
  const [nominations, setNominations] = useState<movie[]>([]);
  // nominations complete banner
  const [isComplete, setComplete] = useState<boolean>(false);

  useEffect(() => {
    // make sure .env works in production...
    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${process.env.REACT_APP_OMDB}&s=${term}&type=movie`)
    .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('api search error')
        }
      })
    .then(res => {
        const formattedResults = formatResults(res.Search, nominations)
        setResults(prev => [...formattedResults])
    })
    .then(() => {
      nominations.length === 5 && setComplete(true)
    })
  }, [term, nominations])

  useEffect(() => {
    // clear results when new term entered
    setResults([])
  }, [term])
  
  useEffect(() => {
    setTimeout(() => {
      // remove intro components from virtual dom
      setVisible(false)
    }, 5000)
  }, [])

  const nominate = (movie: movie) => {
    if (nominations.length < 5) {
      setNominations(prev => [...prev, movie])
    }
  }

  const removeNomination = (movie: movie) => {
    if (isComplete) {setComplete(false)}
    setNominations(prev => [...prev.filter(m => m.id !== movie.id)])
  }

  const restart = () => {
    setTerm('')
    setValue('')
    setResults([])
    setNominations([])
    setComplete(false)
  }

  return (
    <>
    <MainStyles>
      <ResponsiveFlexRow>
        <Logo>Shoppies 🎞</Logo>
        <ResponsiveFlexRow>
          {!isAuthenticated && <LoginButton/>}
          {isAuthenticated && <div>{user.name}</div>}
          {isAuthenticated && <LogoutButton/>}
        </ResponsiveFlexRow>
      </ResponsiveFlexRow>
        <SearchBar onSearch={(term: string) => setTerm(term)} value={value} setValue={setValue}/>
        <AnimatePresence exitBeforeEnter>
          {visible && <ResponsiveFlexRow initial='hidden' animate='visible' exit='exit' variants={introContainer}>
            <motion.h1 variants={introChild}>Welcome to the Shoppy Awards!</motion.h1>
            <Step variants={introChild}>Step 1: <br/> search for your favourite film</Step>
            <Step variants={introChild}>Step 2: <br/> nominate it</Step>
            <Step variants={introChild}>Step 3: <br/> repeat!</Step>
            <Step variants={introChild}>Nominate up to 5 films <span role='img' aria-label='thumbs-up'>👍</span></Step>
          </ResponsiveFlexRow>}
        </AnimatePresence>
        <ResponsiveFlexRow>
          <Results results={results} nominations={nominations} nominate={nominate} term={term}/>
            <MotionFlexColumn>
                <AnimatePresence>
                  {isComplete && <Complete restart={restart}/>}
                </AnimatePresence>
                  <Nominations nominations={nominations} removeNomination={removeNomination}/>
            </MotionFlexColumn>
        </ResponsiveFlexRow>
    </MainStyles>
    <Footer>
      <Cred>
      <span>an app by Ariane Fairlie </span>
      <a href="https://www.github.com/afairlie/" target='_blank' rel="noopener noreferrer"><Icon src="https://img.icons8.com/nolan/64/github.png" alt='github icon' /></a>
      {' '}
      <a href="https://github.com/afairlie/shoppies" target='_blank' rel="noopener noreferrer"><Icon src="https://img.icons8.com/wired/64/5e4629/repository.png" alt='repository icon'/></a>
      {' '}
      <a href="https://www.linkedin.com/in/arianefairlie/" target='_blank' rel="noopener noreferrer"><Icon src="https://img.icons8.com/ultraviolet/64/000000/linkedin-circled.png" alt='linkedin icon'/></a>
      </Cred>
    </Footer>
  </>
  );
}
export default App;
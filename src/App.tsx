import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { formatResults } from './helpers/formatResults';
import { movie } from './interfaces'
import { ResponsiveFlexRow } from './styled/index'

import { UserAuth } from './components/UserAuth';
import { SearchBar } from './components/SearchBar';
import { IntroSequence } from './components/IntroSequence';
import { Results } from './components/Results';
import { Nominations } from './components/Nominations';
import { Complete } from './components/Complete';
import { Footer } from './components/Footer';

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

const App: React.FC = () => {
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
    const key = '538adb24'
    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${key}&s=${term}&type=movie`)
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
    setNominations(prev => [...prev.filter(m => m.title !== movie.title || m.year !== movie.year)])
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
        <UserAuth></UserAuth>
      </ResponsiveFlexRow>
        <SearchBar onSearch={(term: string) => setTerm(term)} value={value} setValue={setValue}/>
        <AnimatePresence>
          {visible && <IntroSequence/>}
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
    <Footer/>
  </>
  );
}
export default App;
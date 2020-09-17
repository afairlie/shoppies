import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

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
  padding: 0 ${({theme}) => (theme.spacing.md)};
`
const Logo = styled.h1`
  padding-top: ${({theme}) => (theme.spacing.xs)};
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
  const [loggedIn, setLogin] = useState<{status: boolean, user: (string | null)}>({
    status: false,
    user: null
  });

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB}&s=${term}&type=movie`)
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
      // remove intro component from virtual dom
      setVisible(false)
    }, 5000)
  }, [])

  const nominate = (nominations: movie[], saved?: boolean) => {
    if (nominations.length < 5) {
      setNominations(prev => [...prev, ...nominations])
    }
    if (saved) {
      setNominations(prev => [...nominations])
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
    <main>
      <UserAuth loggedIn={loggedIn} setLogin={setLogin} nominate={nominate} restart={restart}></UserAuth>
      <MainStyles>
        <ResponsiveFlexRow>
          <Logo>Shoppies 🎞</Logo>
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
    </main>
    <Footer/>
  </>
  );
}
export default App;
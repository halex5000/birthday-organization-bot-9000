import { Box, Card as GrommetCard, Grid as GrommetGrid, Select, Heading, CardBody, Keyboard, Button, TextInput} from "grommet"
import { useEffect, useState } from "react";
import {dictionary} from './dictionary'


function shuffle(array: any[]) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const Card = ({color, elevation, letter}: {color?: string; elevation?: string; letter?: string}) => {
  return (
    <>
      <GrommetCard 
        background={color || "#A34FDE"} 
        width="xsmall" 
        height="xsmall" 
        gap="small"
        elevation={elevation || 'large'}
        align="center"
        justify="center"
      >
        <Heading>{letter}</Heading>
      </GrommetCard>
    </>    
  )
}

const Game = ({
  word, 
  guessedWords, 
  guessHandler, 
  guess, 
  setGuess
}: {
  word: string; 
  guessedWords: string[]; 
  guessHandler: Function; 
  guess: string; 
  setGuess: Function
}) => {
  return (
    <Box gridArea="main" flex direction="column" >
      {word && 
        <Box direction="row">
          <TextInput 
            placeholder="type your guess here" 
            value={guess}
            maxLength={word && word.length}
            onChange={(event) => {setGuess( event.target.value && event.target.value.toUpperCase())}}
          />                         
          <Button primary label="Guess" 
            onClick={() => {
              guessHandler()
            }}
          />
        </Box>
      }
      {
        Array(6).fill('').map((something, index) => {
          return (
            <Box gap="small" flex key={index} direction="row" style={{padding: '8px'}}>
              {
                word &&
                  <>
                    <Box         
                      gap="xsmall"
                      direction="row"
                    >
                      <Box direction="column" gap="small">
                        <Box direction="row" gap="small">
                            {
                              word && word.split('').map((letter, letterIndex) => {
                                if (letter.trim().length === 0) {
                                  return <Card key={letterIndex} color={"black"} elevation="none"/>
                                }
                                
                                const guessedWord = guessedWords[index]

                                let color = "#939598"
                                if (guessedWord) {
                                  
                                  console.log('word guess', {
                                    index,
                                    guessedWord,
                                    word
                                  })

                                  if (guessedWord === word) {
                                    color = "#405BFF"
                                    // you win!!
                                  } else {
                                    if (guessedWord.charAt(letterIndex) === letter) {
                                      color = "#405BFF"
                                    } else if (guessedWord.indexOf(letter) > 0) {
                                      console.log('guessed word includes this letter?', {contains: guessedWord.indexOf(letter), letter})
                                      color = "#EBFF38"
                                    } 
                                  }
                                } else {
                                  color = "#6D6E71"
                                }

                                return (<Card key={letterIndex} color={color} letter={guessedWord && guessedWord.charAt(letterIndex)}/>)
                              })
                            }
                        </Box>
                      </Box>
                    </Box>
                  </>
              }
            </Box>
          )
        })
      }
    </Box>
  )
}

const Wordle = ({closeHandler, typedWord}: {closeHandler: any, typedWord: string}) => {
  const [genre, setGenre] = useState<string>()
  const [word, setWord] = useState<string>();
  const [guess, setGuess] = useState('');
  const [guessedWords, setGuessedWords] = useState(['']);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (genre) {
      const selectedDictionary = dictionary.find((category) => category.name);
      if (selectedDictionary) {
        const wordList: string[] = shuffle(selectedDictionary.words);
        const poppedWord = wordList.pop().toUpperCase();
        if (poppedWord) {
          setWord(poppedWord)
        }
        
        setGuessedWords([''])
      }
    }
  }, [genre])

  return (
    <GrommetGrid         
      gap="xsmall"
      rows={['xxsmall', 'xsmall']}
    >
      <Box direction="row">
        <Select
          placeholder="Select"
          labelKey="name"
          valueKey={{ key: 'id', reduce: true }}
          value={genre}
          options={dictionary}
          onChange={({ value: nextValue }) => {
            setGenre(nextValue)
          }}
        />
        <Button label="close" onClick={closeHandler} />
      </Box>
      <Game 
        word={word} 
        setGuess={setGuess}
        guessedWords={guessedWords} 
        guessHandler={() => {
          setGuessedWords([...guessedWords, guess])
          setGuess('')
        }} 
        guess={guess}
      />
    </GrommetGrid>
  )
}

export default Wordle;
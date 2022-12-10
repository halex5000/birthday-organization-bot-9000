import { Box, Card as GrommetCard, Grid as GrommetGrid, Select, Heading, CardBody, Keyboard, Button} from "grommet"
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

const Card = ({color, elevation}: {color?: string; elevation?: string}) => {
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
      />
    </>    
  )
}

const Game = ({word}: {word: string}) => {
  const [activeRow, setActiveRow] = useState(0);
  return (
    <Box gridArea="main" flex direction="column" >
      {
        Array(6).fill('').map((something, index) => {
          return (
            <Box gap="small" flex key={index} direction="row" style={{padding: '8px'}}>
              {
                word &&
                  <>
                    <Box         
                      gap="small"
                      direction="row"
                    >
                      <Box direction="column" gap="small">
                        <Button secondary label="Submit" style={{
                          display: index === activeRow ? 'block' : '',
                          visibility: index !== activeRow ? 'hidden' : 'visible'
                        }}/>
                      </Box>
                      <Box direction="column" gap="small">
                        <Box direction="row" gap="small">
                            {
                              word && word.split('').map((letter, rowIndex) => {
                                if (letter.trim().length === 0) {
                                  return <Card key={rowIndex} color="black" elevation="none"/>
                                }
                                return <Card key={rowIndex} color="#939598"/>
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
  useEffect(() => {
    if (genre) {
      const selectedDictionary = dictionary.find((category) => category.name);
      if (selectedDictionary) {
        const wordList: string[] = shuffle(selectedDictionary.words);
        setWord(wordList.pop().toUpperCase())
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
          onChange={({ value: nextValue }) => setGenre(nextValue)}
        />
        <Button label="close" onClick={closeHandler} />
      </Box>
      <Game word={word}/>
    </GrommetGrid>
  )
}

export default Wordle;
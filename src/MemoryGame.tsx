import { Box, Image, Grid as GrommetGrid} from "grommet"
import { useEffect, useState } from "react";
import { images } from './images';

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

const Card = ({path, clickHandler, opacity, id}: {path: string; clickHandler: Function, opacity: string; id: string}) => {
  return (
    <>
      <Box 
        background="#FF386B" 
        margin="5px" 
        width="150px" 
        height="150px" 
        elevation="xlarge" 
        onClick={() => {
          clickHandler({path, id}); 
        }}
        animation={opacity === "1" ? {type: "zoomIn"} : {type: "fadeIn", delay: 250}}
      >
        <Image src={`src/assets/${path}`} opacity={opacity}/>
      </Box>
    </>    
  )
}

const Grid = ({cards}: {cards: {id: string, path: string}[][]}) => {

  const defaultSelected = {id: "0", path: ""};

  const [matchedCards, setMatchedCards] = useState(["0"]);
  const [selectedCardOne, setSelectedCardOne] = useState(defaultSelected);
  const [selectedCardTwo, setSelectedCardTwo] = useState(defaultSelected);

  const clickHandler = (card: any) => {
    console.log(card)
    if (selectedCardOne.id != "0") {
      setSelectedCardTwo(card)
    } else {
      setSelectedCardOne(card)
    }
  }

  useEffect(() => {
    if (selectedCardOne.path && selectedCardTwo.path) {
      if (selectedCardOne.path === selectedCardTwo.path) {
        console.log('card match!!');
        setSelectedCardOne(defaultSelected);
        setSelectedCardTwo(defaultSelected);
        setMatchedCards([...matchedCards, selectedCardOne.id, selectedCardTwo.id])
      } else {
        console.log('no card match!!');
        setTimeout(() => {
          setSelectedCardOne(defaultSelected);
          setSelectedCardTwo(defaultSelected);
        }, 1000)
      }
    }
  }, [selectedCardOne, selectedCardTwo])

  return (
    <>
      {
        cards.map((row, rowIndex) => (
          <Box direction="row" key={rowIndex}>
            {
              row.map(({path, id}) => {
                const opacity = selectedCardOne.id === id || selectedCardTwo.id === id ||  matchedCards.includes(id) ? "1" : "0";
                return <Card key={id} path={path} id={id} clickHandler={clickHandler} opacity={opacity} />
              })
            }
          </Box>
        ))
      }
    </>
  )
}

const Game = ({cards}: {cards: {id: string, path: string}[][]}) => {
  return (
    <Box gridArea="main" flex>
      <Grid cards={cards} />
    </Box>
  )
}

const MemoryGame = () => {

  const rowCount = 6;
  const columnCount = 6;

  const cardCount = rowCount * columnCount / 2;

  let allCards: any[] = [];

  for (let i = 0; i < cardCount; i++) {
    const rando = Math.floor(Math.random() * 253);
    const path = images[rando];
    
    allCards.push({
      path,
      id: rando,
    });

    allCards.push({
      path,
      id: rando,
    });
  }

  allCards = shuffle(allCards);

  const rows = Array(rowCount).fill({});

  const columns = Array(columnCount).fill({});

  const cards = rows.map((row, rowIndex) => columns.map((column, cellIndex) => {
    const {path, id} = allCards.shift();
    return {
      id: `${rowIndex}${cellIndex}`,
      path,
      opacity: "0"
    }
  }));

  return (
    <GrommetGrid         
      gap="xsmall"
      columns={['3/12', '6/12', '3/12']}
    >
      <Game cards={cards}/>
    </GrommetGrid>
  )
}

export default MemoryGame;
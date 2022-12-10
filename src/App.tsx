import {Box, Header, Image, ResponsiveContext, Text, Main, Heading, Page, PageContent, Clock, Button, Card, CardBody, CardFooter, CardHeader, Meter, Stack, Sidebar, Grid, TextInput, Layer, Keyboard} from 'grommet'
import React, { useEffect } from 'react';
import pusheenCheeseburger from './assets/pusheeen-cheeseburger.png'
import FlipCountdown from '@rumess/react-flip-countdown';
import DrawingBoard from './DrawingBoard'
import MemoryGame from './MemoryGame';
import {saveSvgAsPng} from 'save-svg-as-png'
import Wordle from './Wordle';


const SketchPad = ({id}:{id: string}) => (
  <DrawingBoard width={400} height={400} id={id}/>
);

const saveImage = (id: string) => {
  saveSvgAsPng(document.getElementById(id), "doodle.png");
}

function App() {
  
  const size = React.useContext(ResponsiveContext);
  const [showMemory, setShowMemory] = React.useState(false)
  const [showCanvas, setShowCanvas] = React.useState(false)
  const [showWordle, setShowWordle] = React.useState(false)
  const [typedWord, setTypedWord] = React.useState('')

  return (
    
    <Box background="brand" height="100%" fill flex pad="x-small" gap="medium" overflow="auto">
      {
        showWordle && (
          <Keyboard 
            onKeyDown={(event) => {
              if (!["Enter", "Backspace"].includes(event.key) && event.key.match(/a-zf/)) {
                console.log('do something');
              }
              setTypedWord(typedWord + event.key)
              console.log(typedWord + event.key)
            }}
            onBackspace={() => {
              setTypedWord(typedWord.substring(0, typedWord.length - 1));
              console.log('backspace pressed');
            }}>
            <Layer full>
  <           Grid      
                gap="small"
                margin="2%"
                justify='center'
              >
                <Box direction='column' flex>
                  <Wordle typedWord={typedWord} closeHandler={() => {setShowWordle(false)}}/>
                </Box>
              </Grid>
            </Layer>
          </Keyboard>
        )
      }
      {
        showCanvas && (
          <Layer background="#406bff" full>
            <Grid      
              gap="small"
              margin="2%"
              justify='center'
            >
              <Box direction='column' flex>
                <Box direction='row'>
                  <Button label="close" onClick={() => setShowCanvas(false)} />
                  <Button label="save" onClick={() => saveImage('bigdoodle')} />
                </Box>
                <DrawingBoard width={1400} height={800} id="bigdoodle"/>
              </Box>
            </Grid>
          </Layer>
        )
      }

      {showMemory && (
        <Layer background="#406bff" full>
          <Button label="close" onClick={() => setShowMemory(false)} />
          <MemoryGame />
        </Layer>
        )
      }
      <Grid
        gap="small"
        columns={['2/12', '2/12', '5/12']}
        rows={['xsmall', 'large', 'xsmall']}
        areas={[
          ['header', 'header', 'header'],
          ['left-bar', 'main', 'right-bar'],
          ['footer', 'footer', 'footer']
        ]}
    >
        <Header background="accent-2" gridArea="header">
          <Heading color="white" alignSelf='center'>Welcome to Isa's Birthday Site!</Heading>
          <Box direction="column" align="center" gap="small" pad="xsmall">
            <Button onClick={() => {setShowMemory(!showMemory)}} primary label="Play Animal Crossing Memory" />
            <Button style={{
              width: '100%'
            }} onClick={() => {setShowWordle(!showWordle)}} primary label="Play Gamer Wordle" />
          </Box>
        </Header>
        <Box overflow="auto" gap="medium" pad="medium" height="large" background="accent-3" gridArea="left-bar">
          <Card  width="medium">
            <CardHeader background="accent-2" pad="small">
              <Text color="white">Countdown to Isa's Birthday</Text>
            </CardHeader>
            <CardBody pad="x-small" align="center">
              <FlipCountdown 
                size="medium"
                yearTitle='Year'
                monthTitle='Months'
                dayTitle='Days'
                hourTitle='Hours'
                minuteTitle='Minutes'
                secondTitle='Seconds'
                endAt={"2022-12-10 00:00:00"}
              />
            </CardBody>
          </Card>
        </Box>
        <Box animation={{ type: 'jiggle', duration: 2000}} gridArea="main">
          <Image src={pusheenCheeseburger} fit="contain"/>
        </Box>
        <Box flex overflow="auto" gap="medium" pad="medium" height="large" background="accent-3" gridArea="right-bar">
          <Card  width="medium">
            <CardHeader background="accent-2" pad="small">
              <Text color="white">Feel like doodling?</Text>
            </CardHeader>
            <CardBody pad="x-small" align="center">
              <SketchPad id='doodle'/>
            </CardBody>
            <CardFooter justify='center'>
              <Button size='large' style={{margin: '10px'}}  secondary label="Big Doodle Please!!" onClick={() => {setShowCanvas(true)}}/>
              <Button size='large' style={{margin: '10px'}}  primary label="Save your doodle!" onClick={() => {saveImage('doodle')}}/>
            </CardFooter>
          </Card>
        </Box>
        <Box align="center" background="accent-2" pad="medium" flex gridArea='footer'>
          <Text  alignSelf='center' color="white">A creation of the Birthday Organizing Bot 9000 aka BOB</Text>
        </Box>
      </Grid>
    </Box>
  )
}

export default App

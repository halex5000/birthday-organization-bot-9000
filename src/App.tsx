import {Box, Footer, Header, Image, ResponsiveContext, Text, Main, Heading, Page, PageContent, Clock, Button, Card, CardBody, CardFooter, CardHeader, Meter, Stack, Sidebar, Grid, TextInput, Layer} from 'grommet'
import React, { useEffect } from 'react';
import pusheenCheeseburger from './assets/pusheeen-cheeseburger.png'
import * as Icons from 'grommet-icons'
import FlipCountdown from '@rumess/react-flip-countdown';
import DrawingBoard from './DrawingBoard'
import axios from 'axios'
import {nanoid} from 'nanoid'
import MemoryGame from './MemoryGame';
import {saveSvgAsPng} from 'save-svg-as-png'

const initialMessages = [
  {
    sender: 'bot',
    text: 'Tell me more about yourself!'
  },
];

const responses = [
  {
    sender: 'bot',
    text: 'cool, thanks!'
  },
  {
    sender: 'bot',
    text: 'okay, good to know...'
  },
  {
    sender: 'bot',
    text: 'this is so helpful!'
  },
  {
    sender: 'bot',
    text: 'thanks for being willing to tell me things!'
  },
  {
    sender: 'bot',
    text: 'oh, that is interesting...'
  },
  {
    sender: 'bot',
    text: 'thanks for telling me that!'
  }
];

const SketchPad = () => (
  <DrawingBoard width={400} height={400}/>
);

const saveImage = () => {
  saveSvgAsPng(document.getElementById("doodle"), "doodle.png");
}

function App() {
  
  const size = React.useContext(ResponsiveContext);

  const [value, setValue] = React.useState('');
  const [messages, setMessages] = React.useState(initialMessages);
  const [showMemory, setShowMemory] = React.useState(false)

  const addMessage = () => {
    setMessages([...messages, {
      sender: 'isa',
      text: value,
    }])
    setValue('');
    // axios.post('https://dkhdcpjmr5.execute-api.us-east-1.amazonaws.com/default/bob-message-handler', {
    //   pk: nanoid(),
    //   sk: Date.now().toString(),
    // })
  }

  const addBotMessage = (message: {sender: string; text: string}) => {
    setMessages([...messages, message])
  }

  useEffect(() => {
    const randomResponse = Math.floor(Math.random() * 6)
    if (messages[messages.length - 1].sender === 'isa') {
      addBotMessage(responses[randomResponse])
    }
  }, [messages])



  return (
    
    <Box background="brand" height="100%" fill flex pad="x-small" gap="medium" overflow="auto">
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
          <Button onClick={() => {setShowMemory(!showMemory)}} primary label="Play Animal Crossing Memory" />
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
              <SketchPad />
            </CardBody>
            <CardFooter justify='center'>
              <Button size='large' style={{marginBottom: '15px'}}  primary label="Save your doodle!" onClick={saveImage}/>
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

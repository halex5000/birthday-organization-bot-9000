import {Box, Footer, Header, Image, ResponsiveContext, Text, Main, Heading, Page, PageContent, Clock, Button, Card, CardBody, CardFooter, CardHeader, Meter, Stack, Sidebar, Grid, TextInput} from 'grommet'
import React, { useEffect } from 'react';
import pusheenCheeseburger from './assets/pusheeen-cheeseburger.png'
import * as Icons from 'grommet-icons'
import FlipCountdown from '@rumess/react-flip-countdown';

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

function App() {
  
  const size = React.useContext(ResponsiveContext);

  const [value, setValue] = React.useState('');
  const [messages, setMessages] = React.useState(initialMessages);

  const addMessage = () => {
    setMessages([...messages, {
      sender: 'isa',
      text: value,
    }])
    setValue('');
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
      <Grid
        gap="small"
        columns={['3/12', '4/12', '3/12']}
        rows={['xsmall', 'large', 'xsmall']}
        areas={[
          ['header', 'header', 'header'],
          ['left-bar', 'main', 'right-bar'],
          ['footer', 'footer', 'footer']
        ]}
    >
        <Box background="accent-2" gridArea="header">
          <Heading color="white" alignSelf='center'>Welcome to Isa's Birthday Site!</Heading>
        </Box>
        <Box flex overflow="auto" gap="medium" pad="medium" height="large" background="accent-3" gridArea="left-bar">
          <Card  width="medium">
            <CardHeader background="accent-2" pad="small">
              <Text color="white">Countdown to Isa's Birthday</Text>
            </CardHeader>
            <CardBody pad="x-small" align="center">
              <FlipCountdown 
                size="small"
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
          <Card  height="medium" width="medium">
            <CardHeader background="accent-2" pad="small">
              <Text color="white">Birthday Algorithm Learning</Text>
            </CardHeader>
            <CardBody pad="x-small" align="center">
              <Box align="center" pad="large">
                <Stack anchor="center">
                  <Meter
                    type="circle"
                    background="accent-2"
                    color='white'
                    value={12}
                    size="small"
                    thickness="small"
                  />
                  <Box direction="row" align="center" pad={{ bottom: 'xsmall' }}>
                    <Text size="xlarge" weight="bold">
                      {12}
                    </Text>
                    <Text size="small">%</Text>
                  </Box>
                </Stack>
              </Box>
            </CardBody>
            <CardFooter pad="medium" background="accent-3">
              <Text textAlign='center'>Insufficient information for birthday recommendations!</Text>
            </CardFooter>
          </Card>
        </Box>
        <Box animation={{ type: 'jiggle', duration: 2000}} gridArea="main">
          <Image src={pusheenCheeseburger} fit="contain"/>
        </Box>
        <Box background="accent-3" gridArea="right-bar">
          <Card  width="medium">
            <CardHeader background="accent-2" pad="small">
              <Text color="white">The more you tell, the better I can plan!</Text>
            </CardHeader>
            <CardBody>
              <Grid
                  columns={['1/2', '1/2']}
                  rows={['xsmall', 'large', 'xsmall']}
                  areas={[
                    ['chat-header', 'chat-header'],
                    ['chat', 'chat'],
                    ['chat-footer', 'chat-footer'],
                  ]}
                >
                  <Box gridArea='chat' pad="xxsmall">
                      {messages.map(message => { 
                        return message.sender === 'bot' ? 
                          (
                            <Card elevation='none' align="end" gridArea="bot">
                              <CardBody >
                                <Box pad="small" background="light-4" elevation="large" round={{corner: 'bottom-left'}}>
                                  <Text>{message.text}</Text>
                                </Box>
                              </CardBody>
                            </Card>
                          )
                          :
                          (
                            <Card elevation='none' align="start" gridArea="isa">
                              <CardBody >
                                <Box pad="small" background="light-1" elevation="large" round={{corner: 'bottom-right'}}>
                                  <Text>{message.text}</Text>
                                </Box>
                              </CardBody>
                            </Card>
                          )
                      })}
                  </Box>
                </Grid>
            </CardBody>
            <CardFooter background="brand">
              <Footer pad="small" gridArea='chat-footer'>
                <TextInput 
                  placeholder="tell me more about you!"
                  value={value}
                  onChange={event => setValue(event.target.value)}>
                </TextInput>
                <Box pad="small" align="center">
                  <Button primary label="Send" onClick={() => { addMessage() }}/>
                </Box>
              </Footer>
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

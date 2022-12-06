import {Box, Footer, Header, Image, ResponsiveContext, Text, Main, Heading, Page, PageContent, Clock, Button, Card, CardBody, CardFooter, CardHeader} from 'grommet'
import React from 'react';
import pusheenCheeseburger from './assets/pusheeen-cheeseburger.png'
import * as Icons from 'grommet-icons'
import FlipCountdown from '@rumess/react-flip-countdown';

function App() {
  
  const size = React.useContext(ResponsiveContext);

  return (
    <Box background="brand" height="100%" fill flex pad="x-small" gap="medium" overflow="auto">
      <Box background="accent-2">
        <Heading color="white" alignSelf='center'>Welcome to Isa's Birthday Site!</Heading>
      </Box>
      <Box height="large">
        <Box flex overflow="auto" gap="medium" pad="medium">
          <Box height="medium">
          <Card  height="small" width="medium">
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
          </Box>
          <Box animation={{ type: 'jiggle', duration: 2000}}>
            <Image src={pusheenCheeseburger} fit="contain"/>
          </Box>
          <Box></Box>
        </Box>
      </Box>
      <Box background="accent-2" pad="medium" flex>
        <Text  alignSelf='center' color="white">A creation of the Birthday Organizing Bot 9000 aka BOB</Text>
      </Box>
    </Box>
  )
}

export default App

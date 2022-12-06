import {Box, Footer, Header, Image, ResponsiveContext, Text, Main, Heading, Page, PageContent, Clock, Button, Card, CardBody, CardFooter, CardHeader, Meter, Stack, Sidebar, Grid} from 'grommet'
import React from 'react';
import pusheenCheeseburger from './assets/pusheeen-cheeseburger.png'
import * as Icons from 'grommet-icons'
import FlipCountdown from '@rumess/react-flip-countdown';

function App() {
  
  const size = React.useContext(ResponsiveContext);

  return (
    <Box background="brand" height="100%" fill flex pad="x-small" gap="medium" overflow="auto">
      <Grid
        gap="small"
        columns={['4/10', '6/10']}
        rows={['xsmall', 'large', 'xsmall']}
        areas={[
          ['header', 'header'],
          ['left-bar', 'main'],
          ['footer', 'footer']
        ]}
        height="100%" 
        width="100vw"
        fill
    >
        <Box background="accent-2" gridArea="header">
          <Heading color="white" alignSelf='center'>Welcome to Isa's Birthday Site!</Heading>
        </Box>
          <Box flex overflow="auto" gap="medium" pad="medium" height="large" background="accent-3" gridArea="left-bar">
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
        <Box align="center" background="accent-2" pad="medium" flex gridArea='footer'>
          <Text  alignSelf='center' color="white">A creation of the Birthday Organizing Bot 9000 aka BOB</Text>
        </Box>
      </Grid>
    </Box>
  )
}

export default App

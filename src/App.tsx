import {Box, Footer, Header, Image, ResponsiveContext, Text, Main, Heading, Page, PageContent, Clock} from 'grommet'
import React from 'react';
import pusheenCheeseburger from './assets/pusheeen-cheeseburger.png'


function App() {
  
  const size = React.useContext(ResponsiveContext);

  return (
    <Box background="brand" height="100%" fill flex pad="x-small" overflow="auto">
      <Box background="accent-2">
        <Heading color="white" alignSelf='center'>Welcome to Isa's Birthday Site!</Heading>
      </Box>
      <Box height="large">
        <Main animation={{ type: 'jiggle', duration: 2000}}>
          <Image src={pusheenCheeseburger} fit="contain"/>
        </Main>
      </Box>
      <Box background="accent-2" pad="medium" flex>
        <Text  alignSelf='center' color="white">A creation of the Birthday Organizing Bot 9000 aka BOB</Text>
      </Box>
    </Box>
  )
}

export default App

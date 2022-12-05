import {Box, Footer, Header, Image, ResponsiveContext, Text, Main, Heading, Page, PageContent} from 'grommet'
import React from 'react';

function App() {
  
  const size = React.useContext(ResponsiveContext);

  return (
    <div className="App">
      <Page background="brand">
        <PageContent>
          <Header background="accent-2" sticky='scrollup'           pad={{ vertical: 'small' }}>
            <Heading>Welcome to Isa's Birthday Site!</Heading>
          </Header>
          <Box height="large" animation={{ type: 'jiggle', duration: 2000}}>
            <Main>
              <Image src='pusheeen-cheeseburger.png' fit="contain"/>
            </Main>
          </Box>
          <Footer background="accent-2" pad="medium">
            <Text>A creation of the Birthday Organizing Bot 9000 aka BOB</Text>
          </Footer>
        </PageContent>
      </Page>
    </div>
  )
}

export default App

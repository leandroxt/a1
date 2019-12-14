import React, { FC, ReactElement } from 'react';
import { ApolloProvider } from 'react-apollo';

import apolloClient from './service';

import Header from './view/header';
import Jobs from './view/jobs';

const App: FC = (): ReactElement => {
  return (
    <ApolloProvider client={apolloClient}>
      <Header />
      <Jobs />
    </ApolloProvider>
  );
}

export default App;

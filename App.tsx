/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, Text, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import RNShake from 'react-native-shake';
import {PlanetType, PLANET_LIST} from './src/data';

import {
  ApolloProvider,
  gql,
  useQuery,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client';

export const baseURL = 'https://graphql.org/swapi-graphql';
// Initialize Apollo Client
const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: baseURL,
  cache,
  defaultOptions: {watchQuery: {fetchPolicy: 'cache-and-network'}},
});
const CHAPTERS_QUERY = gql`
  query Chapters {
    chapters {
      id
      number
      title
    }
  }
`;
const MyRootComponent = () => {
  const [planet, setPlanet] = useState<PlanetType>();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const query = gql`
    query {
      planet(planetID: 1) {
        name
        filmConnection {
          films {
            title
          }
        }
      }
    }
  `;
  const {data, loading} = useQuery(query);
  useEffect(() => {
    console.log('data', loading, data);

    client
      .query({query})
      .then(response => {
        console.log(response.data);
      })
      .catch(err => console.log(err));
    const subscription = RNShake.addListener(() => {
      console.log('shaaaaake');
      var RandomNumber: number = Math.floor(Math.random() * 10) + 1;
      setPlanet(PLANET_LIST[RandomNumber]);
      client
        .query({
          query: gql`
            query {
              planet(planetID: 1) {
                name
                filmConnection {
                  films {
                    title
                  }
                }
              }
            }
          `,
        })
        .then(result => console.log(result))
        .catch(err => console.log(err));
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text>{planet?.name}</Text>
      <Text>{JSON.stringify(data) + JSON.stringify(loading)}</Text>
    </SafeAreaView>
  );
};

const App = () => (
  <ApolloProvider client={client}>
    <MyRootComponent />
  </ApolloProvider>
);

export default App;

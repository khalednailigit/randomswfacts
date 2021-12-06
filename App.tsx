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
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import RNShake from 'react-native-shake';

import {ApolloProvider, gql, ApolloClient, InMemoryCache} from '@apollo/client';

export const baseURL =
  'https://swapi-graphql.netlify.app/.netlify/functions/index';
// Initialize Apollo Client
const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: baseURL,
  cache,
  defaultOptions: {watchQuery: {fetchPolicy: 'cache-and-network'}},
});

const MyRootComponent = () => {
  const [planet, setPlanet] = useState<any>();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
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
    client
      .query({query})
      .then(response => {
        console.log(response.data.planet);
        setPlanet(response.data.planet);
      })
      .catch(err => console.log(err));
    const subscription = RNShake.addListener(() => {
      console.log('shaaaaake');
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text style={{fontSize: 34}}>{planet?.name}</Text>
      <FlatList
        data={planet?.filmConnection?.films}
        renderItem={({title}) => <Text>{title}</Text>}
      />
    </SafeAreaView>
  );
};

const App = () => (
  <ApolloProvider client={client}>
    <MyRootComponent />
  </ApolloProvider>
);

export default App;

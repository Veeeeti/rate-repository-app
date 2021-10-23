import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';

import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8'
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  // console.log('data',repositories)
  const repositoryNodes = repositories
    ? repositories.repositories.edges.map(edge => edge.node)
    : [];
  
  const renderItem = ({ item }) => {
    return(
      <>
        <RepositoryItem key={item.id} item={item}/>
      </>
    )
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
    />
  );
}

const RepositoryList = () => {
    const { data, error, loading } = useRepositories();
    // console.log('data:',data);

    // const repositoryNodes = data
    //   ? data.repositories.edges.map(edge => edge.node)
    //   : [];

    // const renderItem = ({ item }) => {
    //   return(
    //     <>
    //       <RepositoryItem key={item.id} item={item}/>
    //     </>
    //   )
    // };

    // return (
    //   <FlatList
    //     data={repositoryNodes}
    //     ItemSeparatorComponent={ItemSeparator}
    //     renderItem={renderItem}
    //   />
    // );
    return <RepositoryListContainer repositories={data}/>;
};

export default RepositoryList;
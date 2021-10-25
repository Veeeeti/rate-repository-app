import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import { Picker } from '@react-native-picker/picker';
import theme from '../theme';
import TextInput from './TextInput';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8'
  },
  textInput: {
    display: 'flex',
    padding: 5,
    margin: 10,
    borderWidth: 2,
    borderColor: theme.colors.textSecondary
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, order, setOrder, search, setSearch}) => {

  console.log('data',repositories)
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
    <View>
      <TextInput 
        style={styles.textInput} 
        placeholder="Search for a repository..." 
        value={search.value} 
        onChangeText={(text)=> setSearch(text)}/>
      <Picker
      selectedValue={order}
      onValueChange={(itemValue, itemIndex) => setOrder(itemValue)}
      >
        <Picker.Item label="Latest repositories" value="latestRepositories"/>
        <Picker.Item label="Highest rated repositories" value="highestRated"/>
        <Picker.Item label="Lowest rated repositories" value="lowestRated"/>
      </Picker>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
      />
    </View>
  );
}

const RepositoryList = () => {
    const [order, setOrder] = useState('CREATED_AT');

    const [search, setSearch] = useState('');
    const [searchValue] = useDebounce(search,500);

    const { data, error, loading } = useRepositories({order, searchValue});
    console.log('search:',search)

    console.log('order',order);
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
    return (
    <RepositoryListContainer 
      repositories={data}
      order={order}
      setOrder={setOrder}
      search={search}
      setSearch={setSearch}
      />
    );
};

export default RepositoryList;
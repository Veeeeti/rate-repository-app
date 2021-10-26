import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';


const useRepositories = ({order, searchValue, first}) => {

  const parseOrder = (order) => {
    switch (order) {
      case 'latestRepositories': {
        return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
      }
      case 'highestRated': {
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
      }
      case 'lowestRated': {
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
      }
      default: {
        return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
      }
    }
  };
  
  const variables = {...parseOrder(order), searchKeyword: searchValue, first};
  console.log('order variables:',variables);
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
    // Other options
  });
  // console.log('date',data);
  console.log('date',data?.repositories?.pageInfo);
  console.log('fetched repositories...')
  
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  };


  console.log('fetched more..');

  // console.log(data)
  return {
    repositories: data?.repositories, 
    fetchMore: handleFetchMore,
    loading,
    ...result
  };
};

export default useRepositories;
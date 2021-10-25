import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';


const useRepositories = ({order}) => {

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
  
  const variables = {...parseOrder(order)};
  console.log('order variables:',variables);
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
    // Other options
  });
  console.log('fetched repositories...')
  // console.log(data)
  return {data, error, loading};
};

export default useRepositories;
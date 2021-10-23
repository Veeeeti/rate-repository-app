import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  console.log('id to be fetched',id);
  const { data, loading, result } = useQuery(GET_REPOSITORY, {
    variables:{id},
    fetchPolicy: 'cache-and-network'
  });
  return {repository: data?.repository, result};
};

export default useRepository;
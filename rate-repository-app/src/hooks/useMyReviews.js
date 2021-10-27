import { useQuery } from "@apollo/client";
import { GET_AUTHORIZED_USER } from "../graphql/queries";
import { useCallback } from "react";

const useMyReviews = () => {
    const { data, loading, error, refetch: _refetch} = useQuery(
        GET_AUTHORIZED_USER, 
        {
            fetchPolicy: 'cache-and-network'
        }
    );

    const refetch = useCallback(() => {d
        setTimeout(() => _refetch(), 0);
    }, [_refetch]);

    return {
        authorizedUser: data?.authorizedUser,
        loading,
        error,
        refetch
    };
};

export default useMyReviews;
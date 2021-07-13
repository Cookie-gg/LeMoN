import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Director = {
  __typename?: 'Director';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Int']>;
  movies?: Maybe<Array<Maybe<Movie>>>;
};

export type Movie = {
  __typename?: 'Movie';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  genre?: Maybe<Scalars['String']>;
  director?: Maybe<Director>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMovie?: Maybe<Movie>;
  addDirector?: Maybe<Director>;
  updateDirector?: Maybe<Director>;
  updateMovie?: Maybe<Movie>;
  deleteDirector?: Maybe<Director>;
  deleteMovie?: Maybe<Movie>;
};


export type MutationAddMovieArgs = {
  name?: Maybe<Scalars['String']>;
  genre?: Maybe<Scalars['String']>;
  directorId?: Maybe<Scalars['ID']>;
};


export type MutationAddDirectorArgs = {
  name?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Int']>;
};


export type MutationUpdateDirectorArgs = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Int']>;
};


export type MutationUpdateMovieArgs = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  genre?: Maybe<Scalars['Int']>;
  directorId?: Maybe<Scalars['ID']>;
};


export type MutationDeleteDirectorArgs = {
  name: Scalars['String'];
};


export type MutationDeleteMovieArgs = {
  name: Scalars['String'];
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  movie?: Maybe<Movie>;
  director?: Maybe<Director>;
  movies?: Maybe<Array<Maybe<Movie>>>;
  directors?: Maybe<Array<Maybe<Director>>>;
};


export type RootQueryTypeMovieArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type RootQueryTypeDirectorArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type MoviesQueryVariables = Exact<{ [key: string]: never; }>;


export type MoviesQuery = (
  { __typename?: 'RootQueryType' }
  & { movies?: Maybe<Array<Maybe<(
    { __typename?: 'Movie' }
    & Pick<Movie, 'name' | 'genre'>
  )>>> }
);


export const MoviesDocument = gql`
    query movies {
  movies {
    name
    genre
  }
}
    `;

/**
 * __useMoviesQuery__
 *
 * To run a query within a React component, call `useMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMoviesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMoviesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMoviesQuery(baseOptions?: Apollo.QueryHookOptions<MoviesQuery, MoviesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MoviesQuery, MoviesQueryVariables>(MoviesDocument, options);
      }
export function useMoviesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MoviesQuery, MoviesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MoviesQuery, MoviesQueryVariables>(MoviesDocument, options);
        }
export type MoviesQueryHookResult = ReturnType<typeof useMoviesQuery>;
export type MoviesLazyQueryHookResult = ReturnType<typeof useMoviesLazyQuery>;
export type MoviesQueryResult = Apollo.QueryResult<MoviesQuery, MoviesQueryVariables>;
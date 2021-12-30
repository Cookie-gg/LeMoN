import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  /** `Date` type as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
};

export type ArticleInput = {
  articleId: Scalars['String'];
  emoji: Scalars['String'];
  html: Scalars['String'];
  markdown: Scalars['String'];
  published: Scalars['Boolean'];
  releaseDate: Scalars['Timestamp'];
  title: Scalars['String'];
  topics: Array<Scalars['String']>;
  type: Scalars['String'];
  updateDate: Scalars['Timestamp'];
};

export type ArticleObject = {
  __typename?: 'ArticleObject';
  allTopics: Array<TopicObject>;
  articleId: Scalars['String'];
  emoji: Scalars['String'];
  html: Scalars['String'];
  id: Scalars['ID'];
  markdown: Scalars['String'];
  published: Scalars['Boolean'];
  relations: Array<ArticleObject>;
  releaseDate: Scalars['Timestamp'];
  title: Scalars['String'];
  topicIcons: Array<TopicObject>;
  topics: Array<Scalars['String']>;
  type: Scalars['String'];
  typeIcon: TopicObject;
  updateDate: Scalars['Timestamp'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addTopic: TopicObject;
  changeArticle: ArticleObject;
  deleteArticle: ArticleObject;
  updateTopic: TopicObject;
};


export type MutationAddTopicArgs = {
  args: TopicInput;
};


export type MutationChangeArticleArgs = {
  args: ArticleInput;
  id: Scalars['String'];
};


export type MutationDeleteArticleArgs = {
  id: Scalars['String'];
};


export type MutationUpdateTopicArgs = {
  args: TopicInput;
};

export type Query = {
  __typename?: 'Query';
  countAllArticles: Scalars['Int'];
  findAllArticles: Array<ArticleObject>;
  findAllTopics: Array<TopicObject>;
  findArticle: ArticleObject;
  findMoreArticles: Array<ArticleObject>;
  findTopic: TopicObject;
};


export type QueryFindArticleArgs = {
  articleId: Scalars['String'];
};


export type QueryFindMoreArticlesArgs = {
  current: Scalars['String'];
};


export type QueryFindTopicArgs = {
  name: Scalars['String'];
};

export type TopicInput = {
  displayName: Scalars['String'];
  icon: Scalars['String'];
  name: Scalars['String'];
};

export type TopicObject = {
  __typename?: 'TopicObject';
  allArticles: Array<ArticleObject>;
  displayName: Scalars['String'];
  icon: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  someArticles: Array<ArticleObject>;
};

export type ChangeArticleMutationVariables = Exact<{
  id: Scalars['String'];
  articleId: Scalars['String'];
  published: Scalars['Boolean'];
  releaseDate: Scalars['Timestamp'];
  updateDate: Scalars['Timestamp'];
  title: Scalars['String'];
  emoji: Scalars['String'];
  type: Scalars['String'];
  topics: Array<Scalars['String']> | Scalars['String'];
  markdown: Scalars['String'];
  html: Scalars['String'];
}>;


export type ChangeArticleMutation = { __typename?: 'Mutation', changeArticle: { __typename?: 'ArticleObject', id: string } };

export type DeleteArticleMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteArticleMutation = { __typename?: 'Mutation', deleteArticle: { __typename?: 'ArticleObject', id: string } };

export type CreateTopicMutationVariables = Exact<{
  name: Scalars['String'];
  displayName: Scalars['String'];
  icon: Scalars['String'];
}>;


export type CreateTopicMutation = { __typename?: 'Mutation', addTopic: { __typename?: 'TopicObject', id: string } };

export type FindAllArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllArticlesQuery = { __typename?: 'Query', length: number, articles: Array<{ __typename?: 'ArticleObject', id: string, articleId: string, published: boolean, releaseDate: any, updateDate: any, title: string, emoji: string, markdown: string, html: string, topicIcons: Array<{ __typename?: 'TopicObject', displayName: string, icon: string }>, typeIcon: { __typename?: 'TopicObject', displayName: string, icon: string }, relations: Array<{ __typename?: 'ArticleObject', articleId: string, published: boolean, releaseDate: any, title: string, emoji: string, type: string, topicIcons: Array<{ __typename?: 'TopicObject', displayName: string }> }> }> };

export type FindMoreArticlesQueryVariables = Exact<{
  current: Scalars['String'];
}>;


export type FindMoreArticlesQuery = { __typename?: 'Query', articles: Array<{ __typename?: 'ArticleObject', articleId: string, published: boolean, releaseDate: any, title: string, emoji: string, type: string, topicIcons: Array<{ __typename?: 'TopicObject', displayName: string }> }> };

export type FindArticleQueryVariables = Exact<{
  articleId: Scalars['String'];
}>;


export type FindArticleQuery = { __typename?: 'Query', article: { __typename?: 'ArticleObject', id: string, title: string, articleId: string, emoji: string, type: string, topics: Array<string>, published: boolean, releaseDate: any, updateDate: any, markdown: string, html: string, allTopics: Array<{ __typename?: 'TopicObject', displayName: string, name: string }> } };

export type FindAllTopicsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllTopicsQuery = { __typename?: 'Query', topics: Array<{ __typename?: 'TopicObject', displayName: string, icon: string, allArticles: Array<{ __typename?: 'ArticleObject', articleId: string, published: boolean, releaseDate: any, title: string, emoji: string, type: string, topicIcons: Array<{ __typename?: 'TopicObject', displayName: string }> }> }> };

export type FindAllOnlyTopicsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllOnlyTopicsQuery = { __typename?: 'Query', topics: Array<{ __typename?: 'TopicObject', displayName: string, name: string }> };


export const ChangeArticleDocument = gql`
    mutation ChangeArticle($id: String!, $articleId: String!, $published: Boolean!, $releaseDate: Timestamp!, $updateDate: Timestamp!, $title: String!, $emoji: String!, $type: String!, $topics: [String!]!, $markdown: String!, $html: String!) {
  changeArticle(
    id: $id
    args: {articleId: $articleId, published: $published, releaseDate: $releaseDate, updateDate: $updateDate, title: $title, emoji: $emoji, type: $type, topics: $topics, markdown: $markdown, html: $html}
  ) {
    id
  }
}
    `;
export type ChangeArticleMutationFn = Apollo.MutationFunction<ChangeArticleMutation, ChangeArticleMutationVariables>;

/**
 * __useChangeArticleMutation__
 *
 * To run a mutation, you first call `useChangeArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeArticleMutation, { data, loading, error }] = useChangeArticleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      articleId: // value for 'articleId'
 *      published: // value for 'published'
 *      releaseDate: // value for 'releaseDate'
 *      updateDate: // value for 'updateDate'
 *      title: // value for 'title'
 *      emoji: // value for 'emoji'
 *      type: // value for 'type'
 *      topics: // value for 'topics'
 *      markdown: // value for 'markdown'
 *      html: // value for 'html'
 *   },
 * });
 */
export function useChangeArticleMutation(baseOptions?: Apollo.MutationHookOptions<ChangeArticleMutation, ChangeArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeArticleMutation, ChangeArticleMutationVariables>(ChangeArticleDocument, options);
      }
export type ChangeArticleMutationHookResult = ReturnType<typeof useChangeArticleMutation>;
export type ChangeArticleMutationResult = Apollo.MutationResult<ChangeArticleMutation>;
export type ChangeArticleMutationOptions = Apollo.BaseMutationOptions<ChangeArticleMutation, ChangeArticleMutationVariables>;
export const DeleteArticleDocument = gql`
    mutation DeleteArticle($id: String!) {
  deleteArticle(id: $id) {
    id
  }
}
    `;
export type DeleteArticleMutationFn = Apollo.MutationFunction<DeleteArticleMutation, DeleteArticleMutationVariables>;

/**
 * __useDeleteArticleMutation__
 *
 * To run a mutation, you first call `useDeleteArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteArticleMutation, { data, loading, error }] = useDeleteArticleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteArticleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteArticleMutation, DeleteArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteArticleMutation, DeleteArticleMutationVariables>(DeleteArticleDocument, options);
      }
export type DeleteArticleMutationHookResult = ReturnType<typeof useDeleteArticleMutation>;
export type DeleteArticleMutationResult = Apollo.MutationResult<DeleteArticleMutation>;
export type DeleteArticleMutationOptions = Apollo.BaseMutationOptions<DeleteArticleMutation, DeleteArticleMutationVariables>;
export const CreateTopicDocument = gql`
    mutation CreateTopic($name: String!, $displayName: String!, $icon: String!) {
  addTopic(args: {name: $name, displayName: $displayName, icon: $icon}) {
    id
  }
}
    `;
export type CreateTopicMutationFn = Apollo.MutationFunction<CreateTopicMutation, CreateTopicMutationVariables>;

/**
 * __useCreateTopicMutation__
 *
 * To run a mutation, you first call `useCreateTopicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTopicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTopicMutation, { data, loading, error }] = useCreateTopicMutation({
 *   variables: {
 *      name: // value for 'name'
 *      displayName: // value for 'displayName'
 *      icon: // value for 'icon'
 *   },
 * });
 */
export function useCreateTopicMutation(baseOptions?: Apollo.MutationHookOptions<CreateTopicMutation, CreateTopicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTopicMutation, CreateTopicMutationVariables>(CreateTopicDocument, options);
      }
export type CreateTopicMutationHookResult = ReturnType<typeof useCreateTopicMutation>;
export type CreateTopicMutationResult = Apollo.MutationResult<CreateTopicMutation>;
export type CreateTopicMutationOptions = Apollo.BaseMutationOptions<CreateTopicMutation, CreateTopicMutationVariables>;
export const FindAllArticlesDocument = gql`
    query FindAllArticles {
  articles: findAllArticles {
    id
    articleId
    published
    releaseDate
    updateDate
    title
    emoji
    topicIcons {
      displayName
      icon
    }
    typeIcon {
      displayName
      icon
    }
    markdown
    html
    relations {
      articleId
      published
      releaseDate
      title
      emoji
      type
      topicIcons {
        displayName
      }
    }
  }
  length: countAllArticles
}
    `;

/**
 * __useFindAllArticlesQuery__
 *
 * To run a query within a React component, call `useFindAllArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllArticlesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllArticlesQuery(baseOptions?: Apollo.QueryHookOptions<FindAllArticlesQuery, FindAllArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllArticlesQuery, FindAllArticlesQueryVariables>(FindAllArticlesDocument, options);
      }
export function useFindAllArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllArticlesQuery, FindAllArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllArticlesQuery, FindAllArticlesQueryVariables>(FindAllArticlesDocument, options);
        }
export type FindAllArticlesQueryHookResult = ReturnType<typeof useFindAllArticlesQuery>;
export type FindAllArticlesLazyQueryHookResult = ReturnType<typeof useFindAllArticlesLazyQuery>;
export type FindAllArticlesQueryResult = Apollo.QueryResult<FindAllArticlesQuery, FindAllArticlesQueryVariables>;
export const FindMoreArticlesDocument = gql`
    query FindMoreArticles($current: String!) {
  articles: findMoreArticles(current: $current) {
    articleId
    published
    releaseDate
    title
    emoji
    type
    topicIcons {
      displayName
    }
  }
}
    `;

/**
 * __useFindMoreArticlesQuery__
 *
 * To run a query within a React component, call `useFindMoreArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMoreArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMoreArticlesQuery({
 *   variables: {
 *      current: // value for 'current'
 *   },
 * });
 */
export function useFindMoreArticlesQuery(baseOptions: Apollo.QueryHookOptions<FindMoreArticlesQuery, FindMoreArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindMoreArticlesQuery, FindMoreArticlesQueryVariables>(FindMoreArticlesDocument, options);
      }
export function useFindMoreArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindMoreArticlesQuery, FindMoreArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindMoreArticlesQuery, FindMoreArticlesQueryVariables>(FindMoreArticlesDocument, options);
        }
export type FindMoreArticlesQueryHookResult = ReturnType<typeof useFindMoreArticlesQuery>;
export type FindMoreArticlesLazyQueryHookResult = ReturnType<typeof useFindMoreArticlesLazyQuery>;
export type FindMoreArticlesQueryResult = Apollo.QueryResult<FindMoreArticlesQuery, FindMoreArticlesQueryVariables>;
export const FindArticleDocument = gql`
    query FindArticle($articleId: String!) {
  article: findArticle(articleId: $articleId) {
    id
    title
    articleId
    emoji
    type
    topics
    published
    releaseDate
    updateDate
    markdown
    html
    allTopics {
      displayName
      name
    }
  }
}
    `;

/**
 * __useFindArticleQuery__
 *
 * To run a query within a React component, call `useFindArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindArticleQuery({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useFindArticleQuery(baseOptions: Apollo.QueryHookOptions<FindArticleQuery, FindArticleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindArticleQuery, FindArticleQueryVariables>(FindArticleDocument, options);
      }
export function useFindArticleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindArticleQuery, FindArticleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindArticleQuery, FindArticleQueryVariables>(FindArticleDocument, options);
        }
export type FindArticleQueryHookResult = ReturnType<typeof useFindArticleQuery>;
export type FindArticleLazyQueryHookResult = ReturnType<typeof useFindArticleLazyQuery>;
export type FindArticleQueryResult = Apollo.QueryResult<FindArticleQuery, FindArticleQueryVariables>;
export const FindAllTopicsDocument = gql`
    query FindAllTopics {
  topics: findAllTopics {
    displayName
    icon
    allArticles {
      articleId
      published
      releaseDate
      title
      emoji
      type
      topicIcons {
        displayName
      }
    }
  }
}
    `;

/**
 * __useFindAllTopicsQuery__
 *
 * To run a query within a React component, call `useFindAllTopicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllTopicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllTopicsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllTopicsQuery(baseOptions?: Apollo.QueryHookOptions<FindAllTopicsQuery, FindAllTopicsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllTopicsQuery, FindAllTopicsQueryVariables>(FindAllTopicsDocument, options);
      }
export function useFindAllTopicsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllTopicsQuery, FindAllTopicsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllTopicsQuery, FindAllTopicsQueryVariables>(FindAllTopicsDocument, options);
        }
export type FindAllTopicsQueryHookResult = ReturnType<typeof useFindAllTopicsQuery>;
export type FindAllTopicsLazyQueryHookResult = ReturnType<typeof useFindAllTopicsLazyQuery>;
export type FindAllTopicsQueryResult = Apollo.QueryResult<FindAllTopicsQuery, FindAllTopicsQueryVariables>;
export const FindAllOnlyTopicsDocument = gql`
    query FindAllOnlyTopics {
  topics: findAllTopics {
    displayName
    name
  }
}
    `;

/**
 * __useFindAllOnlyTopicsQuery__
 *
 * To run a query within a React component, call `useFindAllOnlyTopicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllOnlyTopicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllOnlyTopicsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllOnlyTopicsQuery(baseOptions?: Apollo.QueryHookOptions<FindAllOnlyTopicsQuery, FindAllOnlyTopicsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllOnlyTopicsQuery, FindAllOnlyTopicsQueryVariables>(FindAllOnlyTopicsDocument, options);
      }
export function useFindAllOnlyTopicsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllOnlyTopicsQuery, FindAllOnlyTopicsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllOnlyTopicsQuery, FindAllOnlyTopicsQueryVariables>(FindAllOnlyTopicsDocument, options);
        }
export type FindAllOnlyTopicsQueryHookResult = ReturnType<typeof useFindAllOnlyTopicsQuery>;
export type FindAllOnlyTopicsLazyQueryHookResult = ReturnType<typeof useFindAllOnlyTopicsLazyQuery>;
export type FindAllOnlyTopicsQueryResult = Apollo.QueryResult<FindAllOnlyTopicsQuery, FindAllOnlyTopicsQueryVariables>;
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
  /** `Date` type as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
};

export type ArticleInput = {
  articleId: Scalars['String'];
  published: Scalars['Boolean'];
  releaseDate: Scalars['Timestamp'];
  updateDate: Scalars['Timestamp'];
  title: Scalars['String'];
  emoji: Scalars['String'];
  type: Scalars['String'];
  topics: Array<Scalars['String']>;
  body: Scalars['String'];
};

export type ArticleObject = {
  __typename?: 'ArticleObject';
  id: Scalars['ID'];
  articleId: Scalars['String'];
  published: Scalars['Boolean'];
  releaseDate: Scalars['Timestamp'];
  updateDate: Scalars['Timestamp'];
  title: Scalars['String'];
  emoji: Scalars['String'];
  type: Scalars['String'];
  topics: Array<Scalars['String']>;
  typeIcon: TopicObject;
  topicIcons: Array<TopicObject>;
  body: Scalars['String'];
  relations: Array<ArticleObject>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addTopic: TopicObject;
  updateTopic: TopicObject;
  addArticle: ArticleObject;
  updateArticle: ArticleObject;
};


export type MutationAddTopicArgs = {
  args: TopicInput;
};


export type MutationUpdateTopicArgs = {
  args: TopicInput;
};


export type MutationAddArticleArgs = {
  args: ArticleInput;
};


export type MutationUpdateArticleArgs = {
  args: ArticleInput;
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  findTopic: TopicObject;
  findAllTopics: Array<TopicObject>;
  findArticles: Array<ArticleObject>;
  findAllArticles: Array<ArticleObject>;
};


export type QueryFindTopicArgs = {
  name: Scalars['String'];
};


export type QueryFindArticlesArgs = {
  latest: Scalars['Boolean'];
};


export type TopicInput = {
  name: Scalars['String'];
  displayName: Scalars['String'];
  icon: Scalars['String'];
};

export type TopicObject = {
  __typename?: 'TopicObject';
  id: Scalars['ID'];
  name: Scalars['String'];
  displayName: Scalars['String'];
  icon: Scalars['String'];
  someArticles: Array<ArticleObject>;
  allArticles: Array<ArticleObject>;
};

export type BlogQueryVariables = Exact<{ [key: string]: never; }>;


export type BlogQuery = { __typename?: 'Query', latest: Array<{ __typename?: 'ArticleObject', articleId: string, published: boolean, releaseDate: any, title: string, emoji: string, type: string, topicIcons: Array<{ __typename?: 'TopicObject', displayName: string }> }>, all: Array<{ __typename?: 'ArticleObject', articleId: string, published: boolean, releaseDate: any, title: string, emoji: string, type: string, topicIcons: Array<{ __typename?: 'TopicObject', displayName: string }> }>, topics: Array<{ __typename?: 'TopicObject', displayName: string, icon: string, allArticles: Array<{ __typename?: 'ArticleObject', articleId: string, published: boolean }>, someArticles: Array<{ __typename?: 'ArticleObject', articleId: string, published: boolean, releaseDate: any, title: string, emoji: string, type: string, topicIcons: Array<{ __typename?: 'TopicObject', displayName: string }> }> }> };

export type PostQueryVariables = Exact<{ [key: string]: never; }>;


export type PostQuery = { __typename?: 'Query', allArticles: Array<{ __typename?: 'ArticleObject', articleId: string, published: boolean, releaseDate: any, updateDate: any, title: string, emoji: string, body: string, topicIcons: Array<{ __typename?: 'TopicObject', icon: string, displayName: string }>, typeIcon: { __typename?: 'TopicObject', icon: string, displayName: string }, relations: Array<{ __typename?: 'ArticleObject', articleId: string, published: boolean, releaseDate: any, title: string, emoji: string, type: string, topicIcons: Array<{ __typename?: 'TopicObject', displayName: string }> }> }> };

export type PostIdQueryVariables = Exact<{ [key: string]: never; }>;


export type PostIdQuery = { __typename?: 'Query', articleId: Array<{ __typename?: 'ArticleObject', articleId: string }> };

export type TopicsQueryVariables = Exact<{ [key: string]: never; }>;


export type TopicsQuery = { __typename?: 'Query', topics: Array<{ __typename?: 'TopicObject', displayName: string, icon: string, allArticles: Array<{ __typename?: 'ArticleObject', articleId: string, published: boolean, releaseDate: any, title: string, emoji: string, type: string, topicIcons: Array<{ __typename?: 'TopicObject', displayName: string }> }> }> };


export const BlogDocument = gql`
    query Blog {
  latest: findArticles(latest: true) {
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
  all: findArticles(latest: false) {
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
  topics: findAllTopics {
    displayName
    icon
    allArticles {
      articleId
      published
    }
    someArticles {
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
 * __useBlogQuery__
 *
 * To run a query within a React component, call `useBlogQuery` and pass it any options that fit your needs.
 * When your component renders, `useBlogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBlogQuery({
 *   variables: {
 *   },
 * });
 */
export function useBlogQuery(baseOptions?: Apollo.QueryHookOptions<BlogQuery, BlogQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BlogQuery, BlogQueryVariables>(BlogDocument, options);
      }
export function useBlogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BlogQuery, BlogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BlogQuery, BlogQueryVariables>(BlogDocument, options);
        }
export type BlogQueryHookResult = ReturnType<typeof useBlogQuery>;
export type BlogLazyQueryHookResult = ReturnType<typeof useBlogLazyQuery>;
export type BlogQueryResult = Apollo.QueryResult<BlogQuery, BlogQueryVariables>;
export const PostDocument = gql`
    query Post {
  allArticles: findAllArticles {
    articleId
    published
    releaseDate
    updateDate
    title
    emoji
    topicIcons {
      icon
      displayName
    }
    typeIcon {
      icon
      displayName
    }
    body
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
}
    `;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostQuery(baseOptions?: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostIdDocument = gql`
    query PostId {
  articleId: findAllArticles {
    articleId
  }
}
    `;

/**
 * __usePostIdQuery__
 *
 * To run a query within a React component, call `usePostIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostIdQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostIdQuery(baseOptions?: Apollo.QueryHookOptions<PostIdQuery, PostIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostIdQuery, PostIdQueryVariables>(PostIdDocument, options);
      }
export function usePostIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostIdQuery, PostIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostIdQuery, PostIdQueryVariables>(PostIdDocument, options);
        }
export type PostIdQueryHookResult = ReturnType<typeof usePostIdQuery>;
export type PostIdLazyQueryHookResult = ReturnType<typeof usePostIdLazyQuery>;
export type PostIdQueryResult = Apollo.QueryResult<PostIdQuery, PostIdQueryVariables>;
export const TopicsDocument = gql`
    query Topics {
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
 * __useTopicsQuery__
 *
 * To run a query within a React component, call `useTopicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTopicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopicsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTopicsQuery(baseOptions?: Apollo.QueryHookOptions<TopicsQuery, TopicsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TopicsQuery, TopicsQueryVariables>(TopicsDocument, options);
      }
export function useTopicsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TopicsQuery, TopicsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TopicsQuery, TopicsQueryVariables>(TopicsDocument, options);
        }
export type TopicsQueryHookResult = ReturnType<typeof useTopicsQuery>;
export type TopicsLazyQueryHookResult = ReturnType<typeof useTopicsLazyQuery>;
export type TopicsQueryResult = Apollo.QueryResult<TopicsQuery, TopicsQueryVariables>;
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

export type FindAllArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllArticlesQuery = { __typename?: 'Query', all: Array<{ __typename?: 'ArticleObject', id: string, articleId: string, published: boolean, releaseDate: any, updateDate: any, title: string, emoji: string, markdown: string, html: string, topicIcons: Array<{ __typename?: 'TopicObject', icon: string, displayName: string }>, typeIcon: { __typename?: 'TopicObject', icon: string, displayName: string }, relations: Array<{ __typename?: 'ArticleObject', articleId: string, published: boolean, releaseDate: any, title: string, emoji: string, type: string, topicIcons: Array<{ __typename?: 'TopicObject', displayName: string }> }> }> };

export type FindMoreArticlesQueryVariables = Exact<{
  current: Scalars['String'];
}>;


export type FindMoreArticlesQuery = { __typename?: 'Query', more: Array<{ __typename?: 'ArticleObject', articleId: string, published: boolean, releaseDate: any, title: string, emoji: string, type: string, topicIcons: Array<{ __typename?: 'TopicObject', displayName: string }> }> };

export type FindArticleQueryVariables = Exact<{
  articleId: Scalars['String'];
}>;


export type FindArticleQuery = { __typename?: 'Query', one: { __typename?: 'ArticleObject', id: string, title: string, articleId: string, emoji: string, type: string, topics: Array<string>, published: boolean, releaseDate: any, updateDate: any, markdown: string, html: string } };

export type BlogQueryVariables = Exact<{ [key: string]: never; }>;


export type BlogQuery = { __typename?: 'Query', num: number, all: Array<{ __typename?: 'ArticleObject', articleId: string, published: boolean, releaseDate: any, title: string, emoji: string, type: string, topicIcons: Array<{ __typename?: 'TopicObject', displayName: string }> }>, topics: Array<{ __typename?: 'TopicObject', displayName: string, icon: string, allArticles: Array<{ __typename?: 'ArticleObject', articleId: string, published: boolean }>, someArticles: Array<{ __typename?: 'ArticleObject', articleId: string, published: boolean, releaseDate: any, title: string, emoji: string, type: string, topicIcons: Array<{ __typename?: 'TopicObject', displayName: string }> }> }> };

export type EditorQueryVariables = Exact<{ [key: string]: never; }>;


export type EditorQuery = { __typename?: 'Query', topics: Array<{ __typename?: 'TopicObject', displayName: string, name: string }> };

export type EditQueryVariables = Exact<{ [key: string]: never; }>;


export type EditQuery = { __typename?: 'Query', all: Array<{ __typename?: 'ArticleObject', articleId: string, published: boolean, releaseDate: any, title: string, emoji: string, type: string, topicIcons: Array<{ __typename?: 'TopicObject', displayName: string }> }> };

export type TopicsQueryVariables = Exact<{ [key: string]: never; }>;


export type TopicsQuery = { __typename?: 'Query', topics: Array<{ __typename?: 'TopicObject', displayName: string, icon: string, allArticles: Array<{ __typename?: 'ArticleObject', articleId: string, published: boolean, releaseDate: any, title: string, emoji: string, type: string, topicIcons: Array<{ __typename?: 'TopicObject', displayName: string }> }> }> };


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
export const FindAllArticlesDocument = gql`
    query FindAllArticles {
  all: findAllArticles {
    id
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
  more: findMoreArticles(current: $current) {
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
  one: findArticle(articleId: $articleId) {
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
export const BlogDocument = gql`
    query Blog {
  all: findAllArticles {
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
  num: countAllArticles
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
export const EditorDocument = gql`
    query Editor {
  topics: findAllTopics {
    displayName
    name
  }
}
    `;

/**
 * __useEditorQuery__
 *
 * To run a query within a React component, call `useEditorQuery` and pass it any options that fit your needs.
 * When your component renders, `useEditorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEditorQuery({
 *   variables: {
 *   },
 * });
 */
export function useEditorQuery(baseOptions?: Apollo.QueryHookOptions<EditorQuery, EditorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EditorQuery, EditorQueryVariables>(EditorDocument, options);
      }
export function useEditorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EditorQuery, EditorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EditorQuery, EditorQueryVariables>(EditorDocument, options);
        }
export type EditorQueryHookResult = ReturnType<typeof useEditorQuery>;
export type EditorLazyQueryHookResult = ReturnType<typeof useEditorLazyQuery>;
export type EditorQueryResult = Apollo.QueryResult<EditorQuery, EditorQueryVariables>;
export const EditDocument = gql`
    query Edit {
  all: findAllArticles {
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
 * __useEditQuery__
 *
 * To run a query within a React component, call `useEditQuery` and pass it any options that fit your needs.
 * When your component renders, `useEditQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEditQuery({
 *   variables: {
 *   },
 * });
 */
export function useEditQuery(baseOptions?: Apollo.QueryHookOptions<EditQuery, EditQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EditQuery, EditQueryVariables>(EditDocument, options);
      }
export function useEditLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EditQuery, EditQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EditQuery, EditQueryVariables>(EditDocument, options);
        }
export type EditQueryHookResult = ReturnType<typeof useEditQuery>;
export type EditLazyQueryHookResult = ReturnType<typeof useEditLazyQuery>;
export type EditQueryResult = Apollo.QueryResult<EditQuery, EditQueryVariables>;
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
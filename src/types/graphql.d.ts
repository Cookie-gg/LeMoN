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

export type ImageInput = {
  data: Scalars['String'];
  name: Scalars['String'];
};

export type ImageObject = {
  __typename?: 'ImageObject';
  id: Scalars['ID'];
  data: Scalars['String'];
  name: Scalars['String'];
};

export type ListBodyInput = {
  title: Scalars['String'];
  icon?: Maybe<Scalars['String']>;
};

export type ListBodyObject = {
  __typename?: 'ListBodyObject';
  title: Scalars['String'];
  icon?: Maybe<Scalars['String']>;
};

export type ListInput = {
  list: Array<ListBodyInput>;
  name: Scalars['String'];
  section: Scalars['String'];
};

export type ListObject = {
  __typename?: 'ListObject';
  id: Scalars['ID'];
  list: Array<ListBodyObject>;
  name: Scalars['String'];
  section: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addList: ListObject;
  updateList: ListObject;
  addTopic: TopicObject;
  updateTopic: TopicObject;
  addArticle: ArticleObject;
  updateArticle: ArticleObject;
  addTitle: TitleObject;
  updateTitle: TitleObject;
  addSentence: SentenceObject;
  updateSentence: SentenceObject;
  addImage: ImageObject;
  updateImage: ImageObject;
  addPath: PathObject;
  updatePath: PathObject;
};


export type MutationAddListArgs = {
  args: ListInput;
};


export type MutationUpdateListArgs = {
  args: ListInput;
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


export type MutationAddTitleArgs = {
  args: TitleInput;
};


export type MutationUpdateTitleArgs = {
  args: TitleInput;
};


export type MutationAddSentenceArgs = {
  args: SentenceInput;
};


export type MutationUpdateSentenceArgs = {
  args: SentenceInput;
};


export type MutationAddImageArgs = {
  args: ImageInput;
};


export type MutationUpdateImageArgs = {
  args: ImageInput;
};


export type MutationAddPathArgs = {
  args: PathInput;
};


export type MutationUpdatePathArgs = {
  args: PathInput;
  name: Scalars['String'];
};

export type PathInput = {
  name: Scalars['String'];
  path: Scalars['String'];
  icon: Scalars['String'];
  order?: Maybe<Scalars['Int']>;
};

export type PathObject = {
  __typename?: 'PathObject';
  id: Scalars['ID'];
  name: Scalars['String'];
  path: Scalars['String'];
  icon: Scalars['String'];
  order?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  findList: ListObject;
  findListBySection: Array<ListObject>;
  findTopic: TopicObject;
  findAllTopics: Array<TopicObject>;
  findArticles: Array<ArticleObject>;
  findAllArticles: Array<ArticleObject>;
  findTitle: Array<TitleObject>;
  findSentence: Array<SentenceObject>;
  findImage: ImageObject;
  findPath: PathObject;
  findAllPaths: Array<PathObject>;
  findPathByOrder: PathObject;
};


export type QueryFindListArgs = {
  section: Scalars['String'];
  name: Scalars['String'];
};


export type QueryFindListBySectionArgs = {
  section: Scalars['String'];
};


export type QueryFindTopicArgs = {
  name: Scalars['String'];
};


export type QueryFindArticlesArgs = {
  latest: Scalars['Boolean'];
};


export type QueryFindTitleArgs = {
  page: Scalars['String'];
};


export type QueryFindSentenceArgs = {
  page: Scalars['String'];
};


export type QueryFindImageArgs = {
  name: Scalars['String'];
};


export type QueryFindPathArgs = {
  name: Scalars['String'];
};


export type QueryFindPathByOrderArgs = {
  order: Scalars['Float'];
};

export type SentenceInput = {
  text: Array<Scalars['String']>;
  page: Scalars['String'];
  section: Scalars['String'];
};

export type SentenceObject = {
  __typename?: 'SentenceObject';
  id: Scalars['ID'];
  text: Array<Scalars['String']>;
  page: Scalars['String'];
  section: Scalars['String'];
};


export type TitleInput = {
  text: Scalars['String'];
  page: Scalars['String'];
  section: Scalars['String'];
  icon?: Maybe<Scalars['String']>;
};

export type TitleObject = {
  __typename?: 'TitleObject';
  id: Scalars['ID'];
  text: Scalars['String'];
  page: Scalars['String'];
  section: Scalars['String'];
  icon?: Maybe<Scalars['String']>;
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

export type AboutQueryVariables = Exact<{ [key: string]: never; }>;


export type AboutQuery = { __typename?: 'Query', titles: Array<{ __typename?: 'TitleObject', text: string, section: string, icon?: Maybe<string> }>, sentences: Array<{ __typename?: 'SentenceObject', text: Array<string>, section: string }>, info: { __typename?: 'ListObject', list: Array<{ __typename?: 'ListBodyObject', title: string, icon?: Maybe<string> }> }, feelingProud: { __typename?: 'ImageObject', data: string }, front: Array<{ __typename?: 'ListObject', name: string, list: Array<{ __typename?: 'ListBodyObject', title: string }> }>, back: Array<{ __typename?: 'ListObject', name: string, list: Array<{ __typename?: 'ListBodyObject', title: string }> }>, others: Array<{ __typename?: 'ListObject', name: string, list: Array<{ __typename?: 'ListBodyObject', title: string }> }> };

export type BlogQueryVariables = Exact<{ [key: string]: never; }>;


export type BlogQuery = { __typename?: 'Query', titles: Array<{ __typename?: 'TitleObject', text: string, section: string }>, latest: Array<{ __typename?: 'ArticleObject', articleId: string, published: boolean, releaseDate: any, title: string, emoji: string, type: string, topicIcons: Array<{ __typename?: 'TopicObject', displayName: string }> }>, all: Array<{ __typename?: 'ArticleObject', articleId: string, published: boolean, releaseDate: any, title: string, emoji: string, type: string, topicIcons: Array<{ __typename?: 'TopicObject', displayName: string }> }>, topics: Array<{ __typename?: 'TopicObject', displayName: string, icon: string, allArticles: Array<{ __typename?: 'ArticleObject', articleId: string, published: boolean }>, someArticles: Array<{ __typename?: 'ArticleObject', articleId: string, published: boolean, releaseDate: any, title: string, emoji: string, type: string, topicIcons: Array<{ __typename?: 'TopicObject', displayName: string }> }> }> };

export type ContactQueryVariables = Exact<{ [key: string]: never; }>;


export type ContactQuery = { __typename?: 'Query', titles: Array<{ __typename?: 'TitleObject', text: string, section: string }>, adressDelivery: { __typename?: 'ImageObject', data: string } };

export type PostQueryVariables = Exact<{ [key: string]: never; }>;


export type PostQuery = { __typename?: 'Query', titles: Array<{ __typename?: 'TitleObject', text: string, section: string }>, allArticles: Array<{ __typename?: 'ArticleObject', articleId: string, published: boolean, releaseDate: any, updateDate: any, title: string, emoji: string, body: string, topicIcons: Array<{ __typename?: 'TopicObject', icon: string, displayName: string }>, typeIcon: { __typename?: 'TopicObject', icon: string, displayName: string }, relations: Array<{ __typename?: 'ArticleObject', articleId: string, published: boolean, releaseDate: any, title: string, emoji: string, type: string, topicIcons: Array<{ __typename?: 'TopicObject', displayName: string }> }> }> };

export type PostIdQueryVariables = Exact<{ [key: string]: never; }>;


export type PostIdQuery = { __typename?: 'Query', articleId: Array<{ __typename?: 'ArticleObject', articleId: string }> };

export type TopicsQueryVariables = Exact<{ [key: string]: never; }>;


export type TopicsQuery = { __typename?: 'Query', titles: Array<{ __typename?: 'TitleObject', text: string, section: string }>, topics: Array<{ __typename?: 'TopicObject', displayName: string, icon: string, allArticles: Array<{ __typename?: 'ArticleObject', articleId: string, published: boolean, releaseDate: any, title: string, emoji: string, type: string, topicIcons: Array<{ __typename?: 'TopicObject', displayName: string }> }> }> };


export const AboutDocument = gql`
    query About {
  titles: findTitle(page: "about") {
    text
    section
    icon
  }
  sentences: findSentence(page: "about") {
    text
    section
  }
  info: findList(name: "info", section: "profile") {
    list {
      title
      icon
    }
  }
  feelingProud: findImage(name: "feeling proud") {
    data
  }
  front: findListBySection(section: "front") {
    name
    list {
      title
    }
  }
  back: findListBySection(section: "back") {
    name
    list {
      title
    }
  }
  others: findListBySection(section: "others") {
    name
    list {
      title
    }
  }
}
    `;

/**
 * __useAboutQuery__
 *
 * To run a query within a React component, call `useAboutQuery` and pass it any options that fit your needs.
 * When your component renders, `useAboutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAboutQuery({
 *   variables: {
 *   },
 * });
 */
export function useAboutQuery(baseOptions?: Apollo.QueryHookOptions<AboutQuery, AboutQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AboutQuery, AboutQueryVariables>(AboutDocument, options);
      }
export function useAboutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AboutQuery, AboutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AboutQuery, AboutQueryVariables>(AboutDocument, options);
        }
export type AboutQueryHookResult = ReturnType<typeof useAboutQuery>;
export type AboutLazyQueryHookResult = ReturnType<typeof useAboutLazyQuery>;
export type AboutQueryResult = Apollo.QueryResult<AboutQuery, AboutQueryVariables>;
export const BlogDocument = gql`
    query Blog {
  titles: findTitle(page: "blog") {
    text
    section
  }
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
export const ContactDocument = gql`
    query Contact {
  titles: findTitle(page: "contact") {
    text
    section
  }
  adressDelivery: findImage(name: "address delivery") {
    data
  }
}
    `;

/**
 * __useContactQuery__
 *
 * To run a query within a React component, call `useContactQuery` and pass it any options that fit your needs.
 * When your component renders, `useContactQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContactQuery({
 *   variables: {
 *   },
 * });
 */
export function useContactQuery(baseOptions?: Apollo.QueryHookOptions<ContactQuery, ContactQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContactQuery, ContactQueryVariables>(ContactDocument, options);
      }
export function useContactLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContactQuery, ContactQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContactQuery, ContactQueryVariables>(ContactDocument, options);
        }
export type ContactQueryHookResult = ReturnType<typeof useContactQuery>;
export type ContactLazyQueryHookResult = ReturnType<typeof useContactLazyQuery>;
export type ContactQueryResult = Apollo.QueryResult<ContactQuery, ContactQueryVariables>;
export const PostDocument = gql`
    query Post {
  titles: findTitle(page: "post") {
    text
    section
  }
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
  titles: findTitle(page: "topics") {
    text
    section
  }
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
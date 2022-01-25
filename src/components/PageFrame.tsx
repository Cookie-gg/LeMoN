import { memo, ReactElement } from 'react';
import { client } from 'graphql/config.gql';
import { ApolloProvider } from '@apollo/client';
import styles from '../assets/scss/components/PageFrame.module.scss';

function PageFrame({ children, className }: { children: ReactElement; className?: string }) {
  return (
    <ApolloProvider {...{ client }}>
      <div className={`${styles.entire} ${className}`}>{children}</div>
    </ApolloProvider>
  );
}

export default memo(PageFrame);

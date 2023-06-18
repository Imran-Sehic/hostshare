import { SearchProvider } from 'context-providers/search-provider';
import { UIFooter } from 'modules/footer';
import { UINavBar } from 'modules/navigation-bar';
import Head from 'next/head';
import { ReactElement } from 'react';

export const UILayout: React.FC<{
  children?: ReactElement;
  shouldHideNav?: boolean;
  pageTitle: string;
  shrinkFooter?: boolean;
}> = ({ children, shouldHideNav, pageTitle, shrinkFooter }) => {
  return (
    <SearchProvider>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      {!shouldHideNav && <UINavBar />}
      {children}
      <UIFooter shrinkFooter={shrinkFooter} />
    </SearchProvider>
  );
};

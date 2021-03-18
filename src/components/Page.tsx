import React from 'react';
import { NextSeo } from 'next-seo';

export const Page = ({ name, path, children }) => {
  const title = `aiteBet – ${name}`;
  const url = `https://aitebet.com${path}`;

  return (
    <>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title,
        }}
      />
      {children}
    </>
  );
};

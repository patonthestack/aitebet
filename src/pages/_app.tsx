import React, { useEffect } from 'react';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import { FuegoProvider } from '@nandorojo/swr-firestore';
import { Fuego } from 'lib/fuego';
import { ChakraProvider } from '@chakra-ui/react';
import { MDXProvider } from '@mdx-js/react';
import Router from 'next/router';
// import * as Fathom from 'fathom-client'
import MDXComponents from 'components/MDXComponents';
import { AuthProvider } from 'lib/auth';
// import { useRouter } from 'next/router'
import theme from 'styles/theme';
import 'focus-visible/dist/focus-visible';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_API_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_ANALYTICS,
};

const fuego = new Fuego(firebaseConfig);

// export function reportWebVitals(metric) {
//   if (metric.label === 'web-vital') {
//     console.log(metric); // The metric object ({ id, name, startTime, value, label }) is logged to the console
//   }
// }

// Analytics
// Router.events.on('routeChangeComplete', () => {
//   firebase.analytics().logEvent<string>('screen_view', {
//     firstName: 'Eric',
//   });
//   // Fathom.trackPageview()
// });

const App = ({ Component, pageProps, children }) => {
  // const router = useRouter()

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      // Fathom.load(process.env.NEXT_PUBLIC_FATHOM_SITE_ID, {
      //   includedDomains: ['gradgreenhouse.com']
      // })
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <FuegoProvider fuego={fuego}>
        <AuthProvider>
          <MDXProvider components={MDXComponents}>
            <Component {...pageProps}>{children}</Component>
          </MDXProvider>
        </AuthProvider>
      </FuegoProvider>
    </ChakraProvider>
  );
};

export default App;

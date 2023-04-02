import type { LinksFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { createHead } from 'remix-island';

import globalStylesheetUrl from './styles/index.css';
import { getCssText } from './@designSystem/stitches.config';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: globalStylesheetUrl },
    // TODO: figure-out why the typechecker doesn't like those preconnect links
    // { rel: 'preconnect', href: 'https://fonts.googleapis.com'},
    // { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: true },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Anton&family=Inter&display=swap',
    },
  ];
};

export const Head = createHead(() => (
  <>
    <Meta />
    <Links />
    <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
  </>
));

export default function App() {
  return (
    <>
      <Head />
      <Outlet />
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </>
  );
}

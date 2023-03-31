import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { createHead } from "remix-island";

import globalStylesheetUrl from "./styles/index.css";
import { getUser } from "./session.server";
import { getCssText } from "./@designSystem/stitches.config";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: globalStylesheetUrl }];
};

// export async function loader({ request }: LoaderArgs) {
//   return json({
//     user: await getUser(request),
//   });
// }

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

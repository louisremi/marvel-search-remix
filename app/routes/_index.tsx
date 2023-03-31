import type { V2_MetaFunction } from "@remix-run/node";
import { Link, useSearchParams } from "@remix-run/react";
import { styled } from "~/@designSystem/stitches.config";
import { AppContent } from "~/layout/AppContent";
import { AppHeader } from "~/layout/AppHeader";
import { AppWrapper } from "~/layout/AppWrapper";

export const meta: V2_MetaFunction = () => [{ title: "Remix Notes" }];

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  return (
    <AppWrapper>
      <AppHeader>
        <SearchBox
          placeholder="Who's you favorite hero?"
          type="text"
          value={search}
          onChange={(e) => setSearchParams({ search: e.currentTarget.value })}
        />
      </AppHeader>
      <AppContent>results</AppContent>
    </AppWrapper>
  );
}

const SearchBox = styled("input", {
  width: "100%",
  padding: "$2",
});

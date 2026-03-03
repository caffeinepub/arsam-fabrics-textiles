/**
 * react-router-dom compatibility shim using @tanstack/react-router
 *
 * This file re-exports TanStack Router primitives with react-router-dom-compatible
 * APIs so that existing components require no API changes beyond the import path.
 */
import {
  Link as TanstackLink,
  useNavigate as useTanstackNavigate,
  useParams as useTanstackParams,
  useSearch as useTanstackSearch,
} from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import type { AnchorHTMLAttributes, ReactNode } from "react";

// ---------------------------------------------------------------------------
// Link
// ---------------------------------------------------------------------------
interface CompatLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: string;
  children?: ReactNode;
}

export function Link({ to, children, ...rest }: CompatLinkProps) {
  // TanStack Link accepts `to` directly; spread the rest as standard props
  return (
    <TanstackLink
      to={to as LinkProps["to"]}
      {...(rest as Omit<LinkProps, "to">)}
    >
      {children}
    </TanstackLink>
  );
}

// ---------------------------------------------------------------------------
// useNavigate — returns a function matching react-router-dom's navigate(path)
// ---------------------------------------------------------------------------
export function useNavigate() {
  const navigate = useTanstackNavigate();
  return (to: string) => {
    navigate({ to });
  };
}

// ---------------------------------------------------------------------------
// useParams — returns { id: string } generically, same shape as RRD
// ---------------------------------------------------------------------------
export function useParams<T extends Record<string, string | undefined>>(): T {
  // TanStack useParams requires an `{from}` option; using `{strict: false}`
  // returns all matched params (cast to T for compatibility)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useTanstackParams({ strict: false } as any) as T;
}

// ---------------------------------------------------------------------------
// useSearchParams — matches RRD's [searchParams, setSearchParams] tuple
// ---------------------------------------------------------------------------
export function useSearchParams(): [
  URLSearchParams,
  (next: URLSearchParams) => void,
] {
  // TanStack useSearch requires a route reference; using strict: false gives
  // the raw search object. We convert to/from URLSearchParams.
  const search = useTanstackSearch({ strict: false }) as Record<string, string>;
  const navigate = useTanstackNavigate();

  const searchParams = new URLSearchParams(
    Object.entries(search)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => [k, String(v)]),
  );

  const setSearchParams = (next: URLSearchParams) => {
    const newSearch: Record<string, string> = {};
    next.forEach((value, key) => {
      newSearch[key] = value;
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigate({ search: () => newSearch } as any);
  };

  return [searchParams, setSearchParams];
}

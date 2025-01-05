import type { LayoutLoad } from "./$types";

export const prerender = true;

export const load: LayoutLoad = ({ url }) => {
  const { pathname } = url;
  
  return {
    pathname
  };
}
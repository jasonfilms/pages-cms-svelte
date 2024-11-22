import type { LayoutServerLoad } from "./$types";
import { posts } from "$lib/data/posts";

export const load: LayoutServerLoad = async () => {
  return { 
    data: posts.map((post) => ({
      slug: post.slug,
      title: post.title
    }))
  };
}
import type { PageServerLoad } from "./$types";
import { posts } from "$lib/data/posts";

export const load: PageServerLoad = async ({ params }) => {
  return {
    post: posts.find((post) => post.slug === params.slug)
  }
}
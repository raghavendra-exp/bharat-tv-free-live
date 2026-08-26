import type { Plugin } from "vite";

export declare function prerenderBlog(options: {
  root: string;
  outDir: string;
}): Promise<number>;

export declare function prerenderBlogPlugin(): Plugin;

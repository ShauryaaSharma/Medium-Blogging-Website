import { useEffect, useState } from "react";
import { api } from "../lib/api";

export interface Blog {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
}

export function useBlogs() {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    let cancelled = false;
    api
      .get("/blog/bulk")
      .then((response) => {
        if (cancelled) return;
        setBlogs(response.data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { loading, blogs };
}

export function useBlog({ id }: { id: string }) {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api
      .get(`/blog/${id}`)
      .then((response) => {
        if (cancelled) return;
        setBlog(response.data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { loading, blog };
}

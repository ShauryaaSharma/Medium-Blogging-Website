import { Navigate, useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Avatar } from "../components/Avatar";
import { FullBlogSkeleton } from "../components/BlogSkeleton";
import { useBlog } from "../hooks";
import { estimateReadingTime } from "../lib/readingTime";

export function Blog() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const { loading, blog } = useBlog({ id: id ?? "" });

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  if (loading) {
    return (
      <div>
        <Appbar />
        <FullBlogSkeleton />
      </div>
    );
  }

  if (!blog) {
    return (
      <div>
        <Appbar />
        <p className="text-center text-gray-500 mt-16">
          This story couldn&apos;t be found.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 max-w-5xl mx-auto px-6 pt-12">
        <article>
          <h1 className="font-serif text-4xl font-bold text-gray-900 leading-tight mb-4">
            {blog.title}
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            {estimateReadingTime(blog.content)} min read
          </p>
          <div className="font-serif text-lg leading-relaxed text-gray-800 whitespace-pre-wrap">
            {blog.content}
          </div>
        </article>

        <aside className="border-t lg:border-t-0 lg:border-l border-gray-200 pt-6 lg:pt-0 lg:pl-8">
          <div className="flex items-center gap-3">
            <Avatar name={blog.authorId} size="big" />
            <div>
              <p className="font-semibold text-gray-900">Anonymous</p>
              <p className="text-gray-500 text-sm">
                {blog.published ? "Published" : "Draft"}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

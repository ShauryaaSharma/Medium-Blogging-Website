import { Navigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export function Blogs() {
  const token = localStorage.getItem("token");
  const { loading, blogs } = useBlogs();

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center px-6">
        <div className="w-full max-w-2xl pt-4">
          {loading &&
            Array.from({ length: 5 }).map((_, i) => <BlogSkeleton key={i} />)}

          {!loading && blogs.length === 0 && (
            <p className="text-gray-500 text-center mt-16">
              No stories published yet.
            </p>
          )}

          {!loading &&
            blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                authorId={blog.authorId}
                title={blog.title}
                content={blog.content}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

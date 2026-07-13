import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
import { estimateReadingTime } from "../lib/readingTime";

export function BlogCard({
  id,
  authorId,
  title,
  content,
}: {
  id: string;
  authorId: string;
  title: string;
  content: string;
}) {
  return (
    <Link to={`/blog/${id}`} className="block">
      <div className="max-w-2xl border-b border-gray-200 py-6">
        <div className="flex items-center gap-2 mb-2">
          <Avatar name={authorId} size="small" />
          <span className="text-sm text-gray-700">Anonymous</span>
        </div>

        <h2 className="font-serif text-xl font-bold text-gray-900 leading-snug">
          {title}
        </h2>
        <p className="text-gray-600 mt-1 line-clamp-2">{content}</p>

        <span className="text-xs text-gray-500 mt-3 inline-block">
          {estimateReadingTime(content)} min read
        </span>
      </div>
    </Link>
  );
}

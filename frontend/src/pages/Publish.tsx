import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { publishBlog, type publishInf } from "shaurya-zod-medium";
import { Appbar } from "../components/Appbar";
import { api } from "../lib/api";

export function Publish() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [postInputs, setPostInputs] = useState<publishInf>({
    title: "",
    content: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof publishInf, string>>>({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  async function publish() {
    const parsed = publishBlog.safeParse(postInputs);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof publishInf, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof publishInf;
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitError("");
    setLoading(true);
    try {
      const response = await api.post("/blog", postInputs);
      navigate(`/blog/${response.data.id}`);
    } catch (e) {
      setSubmitError("Couldn't publish this story. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Appbar />
      <div className="max-w-3xl mx-auto px-6 pt-12">
        <input
          value={postInputs.title}
          onChange={(e) =>
            setPostInputs((c) => ({ ...c, title: e.target.value }))
          }
          placeholder="Title"
          className="w-full font-serif text-4xl font-bold placeholder:text-gray-300 outline-none mb-2"
        />
        {errors.title && (
          <p className="text-red-600 text-sm mb-2">{errors.title}</p>
        )}

        <textarea
          value={postInputs.content}
          onChange={(e) =>
            setPostInputs((c) => ({ ...c, content: e.target.value }))
          }
          placeholder="Tell your story…"
          rows={16}
          className="w-full font-serif text-lg leading-relaxed placeholder:text-gray-300 outline-none resize-none mb-2"
        />
        {errors.content && (
          <p className="text-red-600 text-sm mb-2">{errors.content}</p>
        )}

        {submitError && (
          <p className="text-red-600 text-sm mb-4">{submitError}</p>
        )}

        <div className="pb-16">
          <button
            onClick={publish}
            disabled={loading}
            className="bg-black text-white rounded-full px-6 py-2.5 font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Publishing…" : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}

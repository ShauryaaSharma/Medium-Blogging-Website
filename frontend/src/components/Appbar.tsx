import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./Avatar";

export function Appbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function signOut() {
    localStorage.removeItem("token");
    navigate("/signin");
  }

  return (
    <header className="border-b border-gray-200">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
        <Link to="/blogs" className="font-serif text-2xl font-bold tracking-tight">
          Medium
        </Link>

        {token ? (
          <div className="flex items-center gap-5">
            <Link
              to="/publish"
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Write
            </Link>
            <button
              onClick={signOut}
              className="text-sm text-gray-600 hover:text-black transition-colors cursor-pointer"
            >
              Sign out
            </button>
            <Avatar name={token} size="medium" />
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <Link to="/signin" className="text-sm text-gray-800 hover:text-black">
              Sign in
            </Link>
            <Link
              to="/signup"
              className="text-sm bg-black text-white rounded-full px-4 py-2 hover:bg-gray-800 transition-colors"
            >
              Get started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

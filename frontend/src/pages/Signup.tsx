import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup, type signupInf } from "shaurya-zod-medium";
import { LabelledInput } from "../components/LabelledInput";
import { Quote } from "../components/Quote";
import { api } from "../lib/api";

export function Signup() {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<signupInf>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof signupInf, string>>>({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendRequest() {
    const parsed = signup.safeParse(postInputs);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof signupInf, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof signupInf;
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitError("");
    setLoading(true);
    try {
      const response = await api.post("/user/signup", postInputs);
      localStorage.setItem("token", response.data.jwt);
      navigate("/blogs");
    } catch (e) {
      setSubmitError("Something went wrong. That email might already be taken.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col justify-center h-screen px-6 sm:px-16">
        <div className="max-w-sm mx-auto w-full">
          <h1 className="font-serif text-4xl font-bold text-gray-900 mb-2">
            Join Medium.
          </h1>
          <p className="text-gray-600 mb-8">
            Already have an account?{" "}
            <Link to="/signin" className="text-black underline underline-offset-2">
              Sign in
            </Link>
          </p>

          <LabelledInput
            label="Email"
            placeholder="you@example.com"
            error={errors.email}
            onChange={(e) =>
              setPostInputs((c) => ({ ...c, email: e.target.value }))
            }
          />
          <LabelledInput
            label="Password"
            type="password"
            placeholder="At least 6 characters"
            error={errors.password}
            onChange={(e) =>
              setPostInputs((c) => ({ ...c, password: e.target.value }))
            }
          />

          {submitError && (
            <p className="text-red-600 text-sm mb-4">{submitError}</p>
          )}

          <button
            onClick={sendRequest}
            disabled={loading}
            className="w-full bg-black text-white rounded-full py-2.5 font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Creating account…" : "Sign up"}
          </button>
        </div>
      </div>

      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import LogoHeader from "../components/logo-header";
import ICIllustration from "../assets/images/ic_illustration3.svg";
import { useEffect } from "react";

const schema = yup
  .object()
  .shape({
    email: yup.string().email().required("Please provide a valid email"),
    password: yup.string().required("Please provide a valid password"),
  })
  .required();

export default function Login() {
  const { user, loading, loginUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <main>
      <section className="flex items-center justify-center lg:h-screen lg:items-start">
        <div className="hidden h-full flex-1 self-center bg-ic-green bg-opacity-30 lg:block">
          <img
            src={ICIllustration}
            alt="ic_illustration"
            className="mt-10 h-3/4 w-full object-contain"
          />
        </div>
        <div className="w-full py-10 md:max-w-xl md:px-10 md:py-10">
          <div className="mb-8">
            <LogoHeader />
          </div>
          <div className="mb-6">
            <h2 className="mb-1 text-2xl font-bold text-black">
              Login to continue
            </h2>
            <p className="text-sm text-neutral-600">
              Please fill your details below
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="block">
            <div className="mb-4">
              <label htmlFor="email">
                <span className="mb-1 block">Email address</span>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Email address"
                  name="email"
                  id="email"
                  autoComplete="on"
                  className="w-full rounded border border-neutral-600 p-3 outline-none placeholder:text-sm focus:border-ic-green focus:ring-1 focus:ring-ic-green"
                />
                <span className="mt-1 block text-sm text-red-600">
                  {errors.email?.message}
                </span>
              </label>
            </div>
            <div className="mb-4">
              <label htmlFor="password">
                <span className="mb-1 flex items-center justify-between">
                  <span>Password</span>
                  <Link
                    to="/account/forgot-password"
                    className="text-sm text-ic-green hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </span>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="Password"
                  name="password"
                  id="password"
                  className="w-full rounded border border-neutral-600 p-3 outline-none placeholder:text-sm focus:border-ic-green focus:ring-1 focus:ring-ic-green"
                />
                <span className="mt-1 block text-sm text-red-600">
                  {errors.password?.message}
                </span>
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="my-4 w-full rounded bg-ic-green py-3 text-base text-white"
            >
              {loading ? "Please wait..." : "Login"}
            </button>

            <div className="mt-4 text-start">
              <span className="text-sm text-neutral-600">
                Don&apos;t have an account?{" "}
                <Link
                  to="/auth/signup"
                  className="text-ic-green hover:underline"
                >
                  Signup
                </Link>
              </span>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import useAuth from "../hooks/useAuth";
import LogoHeader from "../components/logo-header";
import ICIllustration from "../assets/images/ic_illustration3.svg";

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Please provide a valid name"),
    email: yup.string().email().required("Please provide a valid email"),
    password: yup.string().required("Please provide a valid password"),
  })
  .required();

export default function Signup() {
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const { loading, signupUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await signupUser(data.email, data.password, data.name);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <main>
      <section className="flex items-center justify-center lg:h-full lg:items-start">
        <div className="hidden h-full flex-1 bg-ic-green bg-opacity-30 p-28 lg:block">
          <img
            src={ICIllustration}
            alt="ic_illustration"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="w-full py-10 md:max-w-xl md:px-10 md:py-10">
          <div className="mb-8">
            <LogoHeader />
          </div>
          <div className="mb-6">
            <h2 className="mb-1 text-2xl font-bold text-black">
              Signup to get started
            </h2>
            <p className="text-sm text-neutral-600">
              Please fill all the required details below to signup
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="block">
            <div className="mb-4">
              <label htmlFor="name">
                <span className="mb-1 block">Name</span>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Name"
                  name="name"
                  id="name"
                  autoComplete="on"
                  className="w-full rounded border border-neutral-600 p-3 outline-none placeholder:text-sm focus:border-ic-green focus:ring-1 focus:ring-ic-green"
                />
                <span className="mt-1 block text-sm text-red-600">
                  {errors.name?.message}
                </span>
              </label>
            </div>
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
                <span className="mt-1 block text-sm text-red-600 first-letter:uppercase">
                  {errors.email?.message}
                </span>
              </label>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="relative block">
                <span className="mb-1 block">Password</span>
                <input
                  {...register("password")}
                  type={showSignupPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  id="password"
                  className="w-full rounded border border-neutral-600 p-3 outline-none placeholder:text-sm focus:border-ic-green focus:ring-1 focus:ring-ic-green"
                />
                <span
                  role="button"
                  onClick={() => setShowSignupPassword(!showSignupPassword)}
                  className="absolute right-3 top-1/2 translate-y-1/2 transform text-lg"
                >
                  {showSignupPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
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
              {loading ? "Please wait..." : "Signup"}
            </button>

            <div className="mt-4 text-start">
              <span className="text-sm text-neutral-600">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="text-ic-green hover:underline"
                >
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

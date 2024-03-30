import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuth from "../hooks/useAuth";
import LogoHeader from "../components/logo-header";
import ICIllustration from "../assets/images/ic_illustration4.svg";

const schema = yup
  .object()
  .shape({
    email: yup.string().email().required("Please provide your email address"),
  })
  .required();

export default function ForgotPassword() {
  const { loading, createPasswordRecovery } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    await createPasswordRecovery(data.email);
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password | Chatroom - Innovation Club</title>
        <meta
          name="description"
          content="Reset password to continue to Innovation Club Chatroom"
        />
        <meta
          name="keywords"
          content="Chatroom system, Meru University of Science and Technology, Meru University Innovation Club, Meru University Innovation Club Chatroom, Meru University Innovation Club Chatroom System, Innovation Club, Innovation Club Chatroom, Innovation Club Chatroom System"
        />
      </Helmet>
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
                Reset Your Password
              </h2>
              <p className="text-sm text-neutral-600">
                Enter your email address to reset your password.
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
                  <span className="mt-1 block text-sm text-red-600 first-letter:uppercase">
                    {errors.email?.message}
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="my-4 w-full rounded bg-ic-green py-3 text-base text-white"
              >
                {loading ? "Please wait..." : "Get Reset Link"}
              </button>

              <div className="mt-4 text-start">
                <span className="text-sm text-neutral-600">
                  Return back to{" "}
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
    </>
  );
}

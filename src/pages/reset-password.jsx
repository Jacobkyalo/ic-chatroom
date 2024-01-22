import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuth from "../hooks/useAuth";
import LogoHeader from "../components/logo-header";
import ICIllustration from "../assets/images/ic_illustration4.svg";

const schema = yup
  .object()
  .shape({
    password: yup.string().min(8).required("Please provide a valid password"),
    passwordAgain: yup
      .string()
      .min(8)
      .required("Please provide a valid password"),
  })
  .required();

export default function ResetPassword() {
  const { loading, updatePasswordRecovery } = useAuth();
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");
  const secret = urlParams.get("secret");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    await updatePasswordRecovery(
      userId,
      secret,
      data.password,
      data.passwordAgain,
    );
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
              Reset Your Password
            </h2>
            <p className="text-sm text-neutral-600">
              Enter your new password here.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="block">
            <div className="mb-4">
              <label htmlFor="password">
                <span className="mb-1 block">New Password</span>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="New Password"
                  name="password"
                  id="password"
                  autoComplete="off"
                  className="w-full rounded border border-neutral-600 p-3 outline-none placeholder:text-sm focus:border-ic-green focus:ring-1 focus:ring-ic-green"
                />
                <span className="mt-1 block text-sm text-red-600 first-letter:uppercase">
                  {errors.password?.message}
                </span>
              </label>
            </div>
            <div className="mb-4">
              <label htmlFor="passwordAgain">
                <span className="mb-1 block">Confirm New Password</span>
                <input
                  {...register("passwordAgain")}
                  type="password"
                  placeholder="Confirm New Password"
                  name="passwordAgain"
                  id="passwordAgain"
                  autoComplete="off"
                  className="w-full rounded border border-neutral-600 p-3 outline-none placeholder:text-sm focus:border-ic-green focus:ring-1 focus:ring-ic-green"
                />
                <span className="mt-1 block text-sm text-red-600 first-letter:uppercase">
                  {errors.passwordAgain?.message}
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="my-4 w-full rounded bg-ic-green py-3 text-base text-white"
            >
              {loading ? "Please wait..." : "Reset Password"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

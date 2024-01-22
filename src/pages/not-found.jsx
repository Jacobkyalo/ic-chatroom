import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main>
      <section className="flex h-screen flex-col items-center justify-center">
        <h3 className="mb-4 text-base font-medium text-neutral-600">
          404 | Page not found
        </h3>
        <Link
          to="/"
          className="bg-ic-green rounded px-6 py-3 text-base text-white"
        >
          Go back home
        </Link>
      </section>
    </main>
  );
}

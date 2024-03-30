import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page not found | Chatroom - Innovation Club</title>
        <meta
          name="description"
          content="Innovation Club Chatroom page not found"
        />
        <meta
          name="keywords"
          content="Chatroom system, Meru University of Science and Technology, Meru University Innovation Club, Meru University Innovation Club Chatroom, Meru University Innovation Club Chatroom System, Innovation Club, Innovation Club Chatroom, Innovation Club Chatroom System"
        />
      </Helmet>
      <main>
        <section className="flex h-screen flex-col items-center justify-center">
          <h3 className="mb-4 text-base font-medium text-neutral-600">
            404 | Page not found
          </h3>
          <Link
            to="/"
            className="rounded bg-ic-green px-6 py-3 text-base text-white"
          >
            Go back home
          </Link>
        </section>
      </main>
    </>
  );
}

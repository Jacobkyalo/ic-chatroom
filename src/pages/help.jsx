import { Link } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import Container from "../components/container";
import { helpStrings } from "../utils/help";

export default function Help() {
  return (
    <main>
      <Container>
        <header className="mt-8 flex items-center justify-between py-3">
          <Link
            to="/"
            className="flex items-center gap-x-2 text-lg font-medium text-black hover:text-ic-green"
          >
            <IoChevronBack size={20} />
            Chatroom
          </Link>
        </header>
        <section className="my-10">
          <h1 className="text-5xl font-black text-black">Help</h1>
          <p className="mt-2 text-neutral-600">
            If you have any problems navigating the app, please use this guide
            to help you.
          </p>
        </section>
        <section className="mb-10">
          {helpStrings?.map((help, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-semibold text-black">{help.title}</h3>
              <p className="my-2 text-sm text-neutral-600">
                {help.description}
              </p>
              {help.image && (
                <img
                  src={help.image}
                  alt={help.title}
                  className="mt-4 block rounded-lg border border-ic-green/70"
                />
              )}
            </div>
          ))}
        </section>
      </Container>
    </main>
  );
}

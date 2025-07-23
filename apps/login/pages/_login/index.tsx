/* eslint-disable @next/next/no-img-element */

export default function Page(): React.JSX.Element {
  return (
    <>
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Welcome
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Enter your email address and password to get started.
                  </p>
                </div>
                <form>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <label>
                      Email:
                      <input
                        className="remote:border remote:border-input"
                        id="email"
                        type="email"
                      />
                    </label>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <label>
                      Password:
                      <input
                        className="remote:border remote:border-input"
                        id="password"
                        type="password"
                      />
                    </label>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <button
                      className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 gap-1"
                      type="button"
                    >
                      Log In
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export const getServerSideProps = () => {
  return {
    props: {},
  };
};

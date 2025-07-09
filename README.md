# Elixir/Phoenix with Vite, InertiaJS, Svelte, Typescript, TailwindCSS4

Sample Elixir/Phoenix project with a setup tutorial to serve Svelte app via InertiaJS.

Includes Typescript.
Includes TailwindCSS.

## Reasons
* My favorite stack for personal and proof-of-concept projects
* I like Elixir/Phoenix/Ecto
* I like Svelte
* I like Typescript
* I don't know ᶜ𝓈ˢ so I use Tailwind. Phoenix out of the box uses TailwindCSS 3. This setup uses TailwindCSS 4.
* Having a Monorepo for backend and frontend makes testing and typegen easier.
* Vite is easier to setup compared to ESBuild.
* I had issues setting up Vite 7 with TailwindCSS 4 at the time of writing this. So figured this could help someone out. [Link to TailwindCSS github issue](https://github.com/tailwindlabs/tailwindcss/issues/18393)


## If you just want to get started without checking out the setup tutorial:
  * Clone the project
  * Move into the directory created
  * Run `mix deps.get`
  * Edit the `dev.exs` file to add a valid PostgreSQL `username`, `password`
  * Run `mix ecto.create`
  * Run `iex -S mix phx.server`
  * Go to http://localhost:4000 in your browser


# Setup Tutorial
  Divided into the following stages
  1. Setting up Elixir/Phoenix
  2. Setting up Svelte+Typescript with Vite
  3. Setting up TailwindCSS 4
  4. Adding inertia-phoenix to the backend
  5. Adding InertiaJS to Svelte
  6. Adding multiple pages with persistent and conditional layouts
  7. Adding shared props
  8. Adding Jest for some simple frontend tests

__NOTE__: Every stage from the second onwards has a PR associated with it. The stage will have a link to the PR so you can see the changes made. Your changes should look something similar to the PRs.
## 1. Setting up Elixir/Phoenix
  * This is tested with `elixir 1.18.4-otp-27` so make sure you have that or something close enough
  * Run `mix phx.new phx_inertia_svelte_ts_tw` to create an Elixir/Phoenix project(replace phx_inertia_svelte_ts_tw as you desire)
  * __NOTE__: From here on, replace `phx_inertia_svelte_ts_tw` with the name you used
  * Go to the new directory created
  * Run `mix deps.get`
  * Open `test.exs` and add a valid `username` and `password` (usually, on MacOS `username="<your-login-username>"` and `password=""`)
  * Run `mix test`. All your tests should pass
  * Open `dev.exs` and add a valid `username` and `password` (usually, on MacOS `username="<your-login-username>"` and `password=""`)
  * Run `mix ecto.create` to create the PostgreSQL database
  * Run `iex -S mix phx.server`
  * Visit http://localhost:4000 on your browser and make sure you see the default Phoenix Welcome screen
  * If everything works as expected, we can move on to Step 2
  * _OPTIONAL_: You should initialize and make a git commit here as a good practice with `git init && git add -A && git commit -m "Setup Elixir Phoenix"`

## 2. Setting up Svelte+Typescript with Vite
  * PR Link: [Setup Vite Svelte PR](https://github.com/0ff1ane/phx_inertia_svelte_ts_tw/pull/1)
  * __NOTE__: As of writing this tutorial, there is an issue with `TailwindCSS 4` and `Vite 7`. So we will use `Vite 6`
  * This is tested with `nodejs 22.12.0` so make sure you have something close to that
  * __NOTE__: We will put all the frontend into a `frontend/` directory instead of `assets/` like how most Phoenix projects do it
  * Run `npm create vite@6 frontend -- --template svelte-ts` in your phoenix root directory
  * Go to the created directory with `cd frontend`
  * Run `npm install` to install the dependencies
  * Run `npm i --save-dev @types/node` because typescript projects usually need some node type definitions
  * Run `npm run dev`. (Watch the port it listens on. Use that port in the next step if it is different from 5174)
  * Visit http://localhost:5174/ on your browser and make sure everything works. You should see a `Vite + Svelte` page with a basic counter.
  * _OPTIONAL_: 0ff1ane a git commit here `git add -A && git commit -m "Setup Vite Svelte"`
  * Great! You have a working Vite+Svelte project
  * At the end of this stage your changes should look something like this PR: [Setup Vite Svelte PR](https://github.com/0ff1ane/phx_inertia_svelte_ts_tw/pull/1)
  * Now lets add TailwindCSS 4 in the next step

## 3. Setting up TailwindCSS 4
  * PR Link: [Setup TailwindCSS 4](https://github.com/0ff1ane/phx_inertia_svelte_ts_tw/pull/2)
  * In your `frontend/` directory, run `npm install tailwindcss @tailwindcss/vite`
  * Open `vite.config.ts` and
    * Add `import tailwindcss from "@tailwindcss/vite";`
    * Add `tailwindcss()` to the plugins field
      ```diff
      -   plugins: [svelte()],
      +   plugins: [svelte(), tailwindcss()],
      ```
  * In the `frontend/app.css`, replace the whole file with just `@import "tailwindcss";`
  * Change the `frontend/src/App.svelte` content to
    ```
    <script lang="ts">
      let lineNumber = $state(32);
    </script>

    <main>
        <div class="max-w-md bg-white mx-auto my-20 p-5 shadow-xl">
            <div class="text-red-500">Roses are red</div>
            <div class="text-violet-500">Violets are blue</div>
            <div class="text-gray-600">Cannot Read Property of Undefined</div>
            <div class="text-gray-600">
                On <span class="underline">line {lineNumber}</span>
            </div>
        </div>
    </main>
    ```
  * Make sure the vite server is running with `npm run dev` in `frontend/` directory
  * Visit http://localhost:5174/ on your browser and make sure tailwind classes work and the lines are appropriately colored
  * Tailwind setup done!
  * At the end of this stage your changes should look something like this PR: [Setup TailwindCSS 4](https://github.com/0ff1ane/phx_inertia_svelte_ts_tw/pull/2)


## 4. Adding inertia-phoenix to the backend
  * PR Link: [Setup inertia-phoenix](https://github.com/0ff1ane/phx_inertia_svelte_ts_tw/pull/3)
  * Go to the [inertia-phoenix project page](https://github.com/inertiajs/inertia-phoenix) and follow the instructions there.
  * The changes you make should be similar to the below
  * add `{:inertia, "~> 2.5.1"},` to your mix.exs deps
  * Run `mix deps.get` to get the dependencies.
  * Add inertia config in config.exs as
    ```
    config :inertia,
      endpoint: PhxInertiaSvelteTsTwWeb.Endpoint,
      static_paths: ["/assets/app.js"],
      default_version: "1",
      camelize_props: false,
      history: [encrypt: false],
      ssr: false,
      raise_on_ssr_failure: config_env() != :prod

    ```
  * In `phx_inertia_svelte_ts_tw_web.ex` file, in the `def controller do ... end` block add this line after the `use Phoenix.Controller, ...` statement
    ```diff
    use Phoenix.Controller,
      formats: [:html, :json],
      layouts: [html: PhxInertiaSvelteTsTwWeb.Layouts]

    + import Inertia.Controller
    ```
  * In the same file, in the `def html do ... end` block add this line after the `import Phoenix.Controller, ...` statement
    ```diff
    import Phoenix.Controller,
      only: [get_csrf_token: 0, view_module: 1, view_template: 1]

    + import Inertia.HTML
    ```
  * In your `router.ex` file add the Inertia.Plug to at the end of the `:browser` pipeline
  ```diff
  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {PhxInertiaSvelteTsTwWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  + plug Inertia.Plug
  end
  ```
  * We will bypass existing phoenix layouts and create our minimal root.html.heex file and will handle layouts with InertiaJS persistent layouts(in the later steps)
  * Now in root.html.heex, make the following changes
      ```diff
      - <.live_title default="PhxInertiaSvelteTsTw" suffix=" · Phoenix Framework">
      -   {assigns[:page_title]}
      - </.live_title>
      - <link phx-track-static rel="stylesheet" href={~p"/assets/app.css"} />
      - <script defer phx-track-static type="text/javascript" src={~p"/assets/app.js"}>
      + <.inertia_title>{assigns[:page_title]}</.inertia_title>
      + <.inertia_head content={@inertia_head} />
      + <link phx-track-static rel="stylesheet" href={~p"/assets/main.css"} />
      + <script defer phx-track-static type="text/javascript" src={~p"/assets/main.js"}>
      ```
  * Now replace the contents of `app.html.heex` with the following line
    ```
    {@inner_content}
    ```
  * Replace lib/my_phx_svelte_app_web/controllers/page_controller.ex with
    ```
    defmodule PhxInertiaSvelteTsTwWeb.PageController do
      use PhxInertiaSvelteTsTwWeb, :controller

      def home(conn, _params) do
        conn
        |> assign_prop(:title, "Welcome to the home page")
        |> render_inertia("Home")
      end
    end
    ```
  * In `dev.exs` we want to add our Vite watcher. So replace the watchers field with
    ```diff
    watchers: [
    esbuild:
      {Esbuild, :install_and_run, [:phx_inertia_svelte_ts_tw, ~w(--sourcemap=inline --watch)]},
    - tailwind: {Tailwind, :install_and_run, [:phx_inertia_svelte_ts_tw, ~w(--watch)]}
    + tailwind: {Tailwind, :install_and_run, [:phx_inertia_svelte_ts_tw, ~w(--watch)]},
    + npx: [
    +   "vite",
    +   "build",
    +   "--mode",
    +   "development",
    +   "--watch",
    +   "--config",
    +   "vite.config.js",
    +   cd: Path.expand("../frontend", __DIR__)
    + ]
    ]
    ```
  * Replace the `"assets.setup", "assets.build", "assets.deploy"` tasks in your mix.exs with
    ```diff
    - "assets.setup": ["tailwind.install --if-missing", "esbuild.install --if-missing"],
    + "assets.setup": [
    +   "tailwind.install --if-missing",
    +   "esbuild.install --if-missing",
    +   "cmd --cd frontend npm install"
    + ],
    - "assets.build": ["tailwind phx_inertia_svelte_ts_tw", "esbuild phx_inertia_svelte_ts_tw"],
    + "assets.build": [
    +   "tailwind phx_inertia_svelte_ts_tw",
    +   "esbuild phx_inertia_svelte_ts_tw",
    +   "cmd --cd frontend npx vite build --config vite.config.js"
    + ],
    "assets.deploy": [
      "tailwind phx_inertia_svelte_ts_tw --minify",
      "esbuild phx_inertia_svelte_ts_tw --minify",
    + "cmd --cd frontend npx vite build --mode production --config vite.config.js",
      "phx.digest"
    ]
    ```
  * Replace your page_controller_test.exs with
    ```
    defmodule PhxInertiaSvelteTsTwWeb.PageControllerTest do
      use PhxInertiaSvelteTsTwWeb.ConnCase
      import Inertia.Testing

      describe "GET /" do
        test "renders the home page", %{conn: conn} do
          conn = get(conn, "/")
          assert inertia_component(conn) == "Home"

          page_props = inertia_props(conn)

          assert %{
                  # from home() controller props
                  title: "Welcome to the home page"
                } = page_props
        end
      end
    end
    ```
  * Run `mix test` and our test should pass!
  * At the end of this stage your changes should look something like this PR: [Setup inertia-phoenix](https://github.com/0ff1ane/phx_inertia_svelte_ts_tw/pull/3)
  * Next we will update our svelte app to use inertiajs


## 5. Adding InertiaJS to Svelte
  * PR Link: [Setup @inertiajs/svelte](https://github.com/0ff1ane/phx_inertia_svelte_ts_tw/pull/4)
  * Make sure you are in `frontend/` directory
  * Run `npm install @inertiajs/svelte`
  * Replace the `frontend/main.ts` file with
    ```
    import { createInertiaApp, type ResolvedComponent } from "@inertiajs/svelte";
    import { mount } from "svelte";
    import "./app.css";

    createInertiaApp({
      resolve: (name) => {
        const pages: Record<string, ResolvedComponent> = import.meta.glob(
          "./pages/**/*.svelte",
          { eager: true }
        );
        let page = pages[`./pages/${name}.svelte`];
        return { default: page.default, layout: undefined }

      },
      setup({ el, App, props }) {
        if (el) {
          mount(App, { target: el, props });
        }
      },
    });
    ```
  * We will put all our pages in `frontend/src/pages` so with `frontend/` as the current directory, run `mkdir -p src/pages`
  * Run `mv src/App.svelte src/pages/Home.svelte`
  * We want to edit the vite.config.ts file to build our assets to Phoenix's /priv/static path. So replace your vite.config.ts with
    ```
    import { loadEnv, defineConfig } from "vite";
    import tailwindcss from "@tailwindcss/vite";
    import { svelte } from '@sveltejs/vite-plugin-svelte'

    export default defineConfig(({ mode }) => {
      const env = loadEnv(mode, process.cwd(), "");

      return {
        publicDir: false,
        plugins: [tailwindcss(), svelte()],
        build: {
          outDir: "../priv/static",
          target: ["es2022"],
          rollupOptions: {
            input: "src/main.ts",
            output: {
              assetFileNames: "assets/[name][extname]",
              chunkFileNames: "[name].js",
              entryFileNames: "assets/[name].js",
            },
          },
          commonjsOptions: {
            exclude: [],
            // include: []
          },
        },
        define: {
          __APP_ENV__: env.APP_ENV,
        },
      };
    });
    ```
  * Remove `index.html` as InertiaJS will inject the Svelte component into root.html.heex
  * Now make sure your vite server(npm run dev) is not running
  * Run `iex -S mix phx.server` in your phoenix root directory.
  * Visit http://localhost:4000 . Your phoenix app is now serving inertiajs pages!
  * At the end of this stage your changes should look something like this PR: [Setup @inertiajs/svelte](https://github.com/0ff1ane/phx_inertia_svelte_ts_tw/pull/4)


## 6. Adding multiple pages with persistent and conditional layouts
  * PR Link: [Setup persistent layouts](https://github.com/0ff1ane/phx_inertia_svelte_ts_tw/pull/5)
  * Now lets add some more sample pages and wrap some of them in a layout.
  * We will add a Layout.svelte file and configure inertiaJS to use it as a persistent layout for some pages
  * Add a `Layout.svelte` in `frontend/src/layouts` with these contents
    ```
    <script lang="ts">
      import { page } from "@inertiajs/svelte";
      // `children` is passed by inertiaJS
      // `title` is passed from our controller functions' assign_prop
      let { children, title } = $props();

      // get the page url from inertiaJS page store
      let currentPageUrl = $state<string | null>(null);
      page.subscribe((page) => {
          currentPageUrl = page.url;
      });

      // function to underline(show active) the link for current route
      function pageClasses(url: string) {
          return `text-white text-base ${currentPageUrl === url ? "underline" : ""}`;
      }
    </script>

    <svelte:head><title>{title ?? "Page Title"}</title></svelte:head>

    <main class="h-screen overflow-scroll bg-gray-200">
        <nav class="bg-gray-800 p-4 flex justify-between items-center">
            <div class="flex gap-3 items-end">
                <div class="text-gray-100 text-lg font-semibold">Sinph</div>
                <a href="/counter" class={pageClasses("/counter")}>Counter</a>
                <a href="/todos" class={pageClasses("/todos")}>Todos</a>
            </div>
            <div class="flex items-center space-x-4">
                <span class="text-white">TODO - username</span>
                <a
                    href="/"
                    class="bg-gray-200 hover:bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
                    >Logout</a
                >
            </div>
        </nav>
        <article>
            {@render children()}
        </article>
    </main>
    ```
  * Note the usage of the InertiaJS `<Link>` component. For more details visit https://inertiajs.com/links
  * Replace your main.ts file with
    ```diff
      import { createInertiaApp, type   ResolvedComponent } from "@inertiajs/svelte"  ;
      import { mount } from "svelte";
      import "./app.css";
    + import Layout from "./layouts/Layout.svelte";

    + // In case you want some pages without   layout: "Login","Register" etc
    + const NO_LAYOUT_ROUTES = ["Login"];

      createInertiaApp({
        resolve: (name) => {
          const pages: Record<string,   ResolvedComponent> = import.meta.glob(
            "./pages/**/*.svelte",
            { eager: true }
          );
          let page = pages[`./pages/${name}.svelte  `];
    +     let layout = (NO_LAYOUT_ROUTES.includes  (name))
    +        ? undefined : Layout as unknown as   ResolvedComponent["layout"];
    +     return { default: page.default, layout   }
    -     return { default: page.default,   layout: undefined }

        },
        setup({ el, App, props }) {
          if (el) {
            mount(App, { target: el, props });
          }
        },
      });
    ```
  * Now lets add some simple Login, Counter and Todos pages. The content is a bit bigger than what
    I would like to paste here, so each step below has the link to the page commited
    * Add `frontend/src/pages/Login.svelte` with the contents from [simple Login.svelte](https://github.com/0ff1ane/phx_inertia_svelte_ts_tw/blob/fcabd1ea796568d4fdc90eea79707823eb50224e/frontend/src/pages/Login.svelte)
    * Add `frontend/src/pages/Counter.svelte` with the contents from [simple Counter.svelte](https://github.com/0ff1ane/phx_inertia_svelte_ts_tw/blob/fcabd1ea796568d4fdc90eea79707823eb50224e/frontend/src/pages/Counter.svelte)
    * Add `frontend/src/pages/Todos.svelte` with the contents from [simple Todos.svelte](https://github.com/0ff1ane/phx_inertia_svelte_ts_tw/blob/fcabd1ea796568d4fdc90eea79707823eb50224e/frontend/src/pages/Todos.svelte)
  * Now lets add controller functions to serve these pages.

    Replace lib/my_phx_svelte_app_web/controllers/page_controller.ex with
      ```
      defmodule PhxInertiaSvelteTsTwWeb.PageController do
        use PhxInertiaSvelteTsTwWeb, :controller

        def login(conn, _params) do
          conn
          |> assign_prop(:title, "Welcome to the login page")
          |> render_inertia("Login")
        end

        def counter(conn, _params) do
          conn
          |> assign_prop(:title, "A simple svelte counter")
          |> render_inertia("Counter")
        end

        def todos(conn, _params) do
          conn
          |> assign_prop(:title, "A simple svelte todo app")
          |> render_inertia("Todos")
        end
      end
      ```
  * Change the routes in router.ex with
    ```diff
    - get "/", PageController, :home
    + get "/", PageController, :login
    + get "/counter", PageController, :counter
    + get "/todos", PageController, :todos
    ```

  * Run `iex -S mix phx.server`
  * Visit http://localhost:4000 and check that a navbar is visible only in the http://localhost:4000/counter and http://localhost:4000/todos page and the current link is underlined in the navbar
  * At the end of this stage your changes should look something like this PR: [Setup persistent layouts](https://github.com/0ff1ane/phx_inertia_svelte_ts_tw/pull/5)

## 7. Adding shared props
  * PR Link: [Adding shared props](https://github.com/0ff1ane/phx_inertia_svelte_ts_tw/pull/6)
  * In InertiaJS, we can use create a custom plug to insert shared props to all pages(for example current_user details or roles etc)
  * Run `mkdir lib/phx_inertia_svelte_ts_tw_web/plugs/` and create a file `lib/my_phx_svelte_app_web/plugs/dummy_user_auth.ex`
  * Add the following contents to the file
    ```
    defmodule PhxInertiaSvelteTsTwWeb.DummyUserAuthPlug do
      import Inertia.Controller
      import Plug.Conn

      def init(opts) do
        opts
      end

      def call(conn, opts) do
        dummy_authenticate_user(conn, opts)
      end

      defp dummy_authenticate_user(conn, _opts) do
        user = %{"email" => "some.email@gg.wp", "name" => "Ook Oook"}

        # Here we are storing the user in the conn assigns (so
        # we can use it for things like checking permissions later on),
        # AND we are assigning a serialized represention of the user
        # to our Inertia props.
        conn
        # for other controllers etc
        |> assign(:current_user, user)
        # for inertia page props
        |> assign_prop(:me, user)
      end
    end
    ```
  * Add this plug to the end of the `:browser` pipeline in our `router.ex`
    ```diff
      plug :put_secure_browser_headers
      plug Inertia.Plug
    + plug PhxInertiaSvelteTsTwWeb.DummyUserAuthPlug
    ```
  * Replace your page_controller_test.exs with
    ```
    defmodule PhxInertiaSvelteTsTwWeb.PageControllerTest do
      use PhxInertiaSvelteTsTwWeb.ConnCase, async: true
      import Inertia.Testing

      describe "GET /" do
        test "renders the home page", %{conn: conn} do
          conn = get(conn, "/")
          assert inertia_component(conn) == "Login"

          page_props = inertia_props(conn)
          assert %{
                  # from shared props
                  me: %{email: "some.email@gg.wp", name: "Ook Oook"},
                  # from login() controller props
                  title: "Welcome to the login page"
                } = page_props
        end
      end
    end
    ```
  * In your phoenix root directory, run `mix test`
  * Aha! We have some failing tests!
    ```
    1) test GET / renders the home page .../controllers/page_controller_test.exs:7
      ...
      left:  %{me: %{email: "some.email@gg.wp", name: "Ook Oook"}, title: "Welcome to the login page"}
      right: %{me: %{"email" => "some.email@gg.wp", "name" => "Ook Oook"}, title: "Welcome to the login page", errors: %{}, flash: %{}}
      ...
    ```
  * Looks like we mixed up string-keyed maps in our dummy_user_auth.ex plug with atom-keyed maps in our controllers
  * Lets fix the dummy_user_auth.ex file we created and change
    ```diff
    - user = %{"email" => "some.email@gg.wp", "name" => "Ook Oook"}
    + user = %{email: "some.email@gg.wp", name: "Ook Oook"}
    ```
  * Now run the tests again.
  * All the tests should pass!
  * At the end of this stage your changes should look something like this PR: [Adding shared props](https://github.com/0ff1ane/phx_inertia_svelte_ts_tw/pull/6)

## 8. Adding Jest for some simple frontend tests
  * PR Link: [Adding Jest tests](https://github.com/0ff1ane/phx_inertia_svelte_ts_tw/pull/7)
  * Make sure you are in `frontend/` directory
  * Run `npm install --save-dev @testing-library/svelte @testing-library/jest-dom jsdom vitest`
  * Add the following fields to the vite.config.ts file
    ```diff
    + test: {
    +   globals: true,
    +   environment: 'jsdom',
    + },
    + resolve: {
    +   conditions: mode === 'test' ? ['browser'] : [],
    + },
    ```
  * Lets remove some of the tests that came with the vite/vitest setup
  * Create a directory for tests. Run `mkdir -p tests/pages`
  * Add a `tests/pages/login.test.ts` with these contents
    ```
    import { describe, it, expect } from 'vitest';
    import '@testing-library/jest-dom';
    import { render } from '@testing-library/svelte';

    import Login from '../../src/pages/Login.svelte';

    describe('Login Page', () => {
      it('renders the Login page with card title', () => {
        const result = render(Login);

        const headerText = result.getByText('Sign in to your account');

        expect(headerText).toBeInTheDocument();
      });
    });
    ```
  * Add a `tests/pages/counter.test.ts` with the contents as
    ```
    import { describe, it, expect } from 'vitest';
    import '@testing-library/jest-dom';
    import { render } from '@testing-library/svelte';

    import Counter from '../../src/pages/Counter.svelte';

    describe('Counter Page', () => {
      it('renders the counter page with count and buttons', () => {
        const result = render(Counter);

        const countText = result.getByText('0');

        expect(countText).toBeInTheDocument();
      });
    });
    ```
  * Add a `tests/pages/todos.test.ts` with the contents as
    ```
    import { describe, it, expect } from 'vitest';
    import '@testing-library/jest-dom';
    import { render } from '@testing-library/svelte';

    import Todos from '../../src/pages/Todos.svelte';

    describe('Todos Page', () => {
      it('renders the counter page with count and buttons', () => {
        const result = render(Todos);

        const countText = result.getByText('Complete svelte tutorial');

        expect(countText).toBeInTheDocument();
      });
    });
    ```
  * Add the testing npm tasks to `package.json` file
    ```diff
    - "check": "svelte-check --tsconfig ./tsconfig.app.json && tsc -p tsconfig.node.json"
    + "check": "svelte-check --tsconfig ./tsconfig.app.json && tsc -p tsconfig.node.json",
    + "test:unit": "vitest",
    + "test": "npm run test:unit -- --run"
    ```
  * Run `npm run test`
  * All your tests should pass!
    ```
    ✓ tests/pages/counter.test.ts (1 test) 17ms
    ✓ tests/pages/login.test.ts (1 test) 20ms
    ✓ tests/pages/todos.test.ts (1 test) 24ms

    Test Files  3 passed (3)
         Tests  3 passed (3)
    ```
  * At the end of this stage your changes should look something like this PR: [Adding jest tests](https://github.com/0ff1ane/phx_inertia_svelte_ts_tw/pull/7)

## Cleanup(Optional)
  * If we are not planning to using the ESBuild, TailwindCSS and HeroIcons that comes packaged with Phoenix, we can remove these dependencies and their config
    * Run `mix deps.unlock esbuild tailwind heroicons` in your phoenix root directory(where the mix.exs file is located)
    * Remove the `esbuild`, `tailwind`, `heroicons` deps from mix.exs
    * Remove the `config :esbuild, ...` block from config.exs
    * Remove the `config :tailwind, ...` block from config.exs
    * Remove the esbuild and tailwind items from `assets.setup`, `assets.build` and `assets.deploy` in mix.exs
    * Remove the esbuild and tailwind watchers from dev.exs
  * I usually remove my `./assets` directory because I don't use anything from it.
  * Remove the Home.svelte file as it is not used in any of our routes

## Other library recommendations

  * Frontend
    * [Tanstack Query](https://tanstack.com/query/v5/docs/framework/svelte/overview)
    * [shadcdn-svelte](https://www.shadcn-svelte.com/): Simple and minimalistic UI library
    * [ts-pattern](https://github.com/gvergnaud/ts-pattern): For typescript pattern matching instead of switch
  * Backend
    * [PaperTrail](https://hexdocs.pm/paper_trail/readme.html): Great library for tracking(audit-logging) changes in Ecto changesets
    * [phoenix_live_dashboard](https://github.com/phoenixframework/phoenix_live_dashboard): Great library for viewing app metrics without having to setup a Prometheus/Grafana stack

## Official References

  * Phoenix website: https://www.phoenixframework.org/
  * InertiaJS website: https://inertiajs.com/
  * Vite website: https://vite.dev/
  * inertia-phoenix website: https://github.com/inertiajs/inertia-phoenix

## Some useful blogs/tutorials/resources
  * https://github.com/thisistonydang/phoenix-inertia-svelte
  * Simplify React and Phoenix using Inertia JS: A quick look: https://www.youtube.com/watch?v=uyfyFRvng3c
  * https://elixirforum.com/t/can-someone-please-explain-how-to-get-inertiajs-running-with-svelte5-and-phoenix-just-a-hello-world/68350/1

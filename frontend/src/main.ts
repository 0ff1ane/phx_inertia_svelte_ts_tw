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

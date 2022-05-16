import { SvelteComponent, init, safe_not_equal, space, element, text, query_selector_all, detach, claim_space, claim_element, children, claim_text, attr, insert_hydration, append_hydration, noop } from "../chunks/index-4d7732b1.js";
const browser = true;
const dev = false;
var about_svelte_svelte_type_style_lang = "";
function create_fragment(ctx) {
  let t0;
  let div;
  let h1;
  let t1;
  let t2;
  let p0;
  let t3;
  let a;
  let t4;
  let t5;
  let t6;
  let pre;
  let t7;
  let t8;
  let p1;
  let t9;
  return {
    c() {
      t0 = space();
      div = element("div");
      h1 = element("h1");
      t1 = text("About this app");
      t2 = space();
      p0 = element("p");
      t3 = text("This is a ");
      a = element("a");
      t4 = text("SvelteKit");
      t5 = text(" app. You can make your own by typing the\n		following into your command line and following the prompts:");
      t6 = space();
      pre = element("pre");
      t7 = text("npm init svelte@next");
      t8 = space();
      p1 = element("p");
      t9 = text("The page you're looking at is purely static HTML, with no client-side interactivity needed.\n		Because of that, we don't need to load any JavaScript. Try viewing the page's source, or opening\n		the devtools network panel and reloading.");
      this.h();
    },
    l(nodes) {
      const head_nodes = query_selector_all('[data-svelte="svelte-1ine71f"]', document.head);
      head_nodes.forEach(detach);
      t0 = claim_space(nodes);
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      h1 = claim_element(div_nodes, "H1", {});
      var h1_nodes = children(h1);
      t1 = claim_text(h1_nodes, "About this app");
      h1_nodes.forEach(detach);
      t2 = claim_space(div_nodes);
      p0 = claim_element(div_nodes, "P", {});
      var p0_nodes = children(p0);
      t3 = claim_text(p0_nodes, "This is a ");
      a = claim_element(p0_nodes, "A", { href: true });
      var a_nodes = children(a);
      t4 = claim_text(a_nodes, "SvelteKit");
      a_nodes.forEach(detach);
      t5 = claim_text(p0_nodes, " app. You can make your own by typing the\n		following into your command line and following the prompts:");
      p0_nodes.forEach(detach);
      t6 = claim_space(div_nodes);
      pre = claim_element(div_nodes, "PRE", {});
      var pre_nodes = children(pre);
      t7 = claim_text(pre_nodes, "npm init svelte@next");
      pre_nodes.forEach(detach);
      t8 = claim_space(div_nodes);
      p1 = claim_element(div_nodes, "P", {});
      var p1_nodes = children(p1);
      t9 = claim_text(p1_nodes, "The page you're looking at is purely static HTML, with no client-side interactivity needed.\n		Because of that, we don't need to load any JavaScript. Try viewing the page's source, or opening\n		the devtools network panel and reloading.");
      p1_nodes.forEach(detach);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      document.title = "About";
      attr(a, "href", "https://kit.svelte.dev");
      attr(div, "class", "content svelte-cf77e8");
    },
    m(target, anchor) {
      insert_hydration(target, t0, anchor);
      insert_hydration(target, div, anchor);
      append_hydration(div, h1);
      append_hydration(h1, t1);
      append_hydration(div, t2);
      append_hydration(div, p0);
      append_hydration(p0, t3);
      append_hydration(p0, a);
      append_hydration(a, t4);
      append_hydration(p0, t5);
      append_hydration(div, t6);
      append_hydration(div, pre);
      append_hydration(pre, t7);
      append_hydration(div, t8);
      append_hydration(div, p1);
      append_hydration(p1, t9);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(t0);
      if (detaching)
        detach(div);
    }
  };
}
const hydrate = dev;
const router = browser;
const prerender = true;
class About extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment, safe_not_equal, {});
  }
}
export { About as default, hydrate, prerender, router };
//# sourceMappingURL=about.svelte-fa342e68.js.map

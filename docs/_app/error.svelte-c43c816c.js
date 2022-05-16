import { SvelteComponent, init, safe_not_equal, element, text, claim_element, children, claim_text, detach, insert_hydration, append_hydration, set_data, space, empty, claim_space, noop } from "./chunks/index-4d7732b1.js";
function create_if_block_1(ctx) {
  let pre;
  let t_value = ctx[1].frame + "";
  let t;
  return {
    c() {
      pre = element("pre");
      t = text(t_value);
    },
    l(nodes) {
      pre = claim_element(nodes, "PRE", {});
      var pre_nodes = children(pre);
      t = claim_text(pre_nodes, t_value);
      pre_nodes.forEach(detach);
    },
    m(target, anchor) {
      insert_hydration(target, pre, anchor);
      append_hydration(pre, t);
    },
    p(ctx2, dirty) {
      if (dirty & 2 && t_value !== (t_value = ctx2[1].frame + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching)
        detach(pre);
    }
  };
}
function create_if_block(ctx) {
  let pre;
  let t_value = ctx[1].stack + "";
  let t;
  return {
    c() {
      pre = element("pre");
      t = text(t_value);
    },
    l(nodes) {
      pre = claim_element(nodes, "PRE", {});
      var pre_nodes = children(pre);
      t = claim_text(pre_nodes, t_value);
      pre_nodes.forEach(detach);
    },
    m(target, anchor) {
      insert_hydration(target, pre, anchor);
      append_hydration(pre, t);
    },
    p(ctx2, dirty) {
      if (dirty & 2 && t_value !== (t_value = ctx2[1].stack + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching)
        detach(pre);
    }
  };
}
function create_fragment(ctx) {
  let h1;
  let t0;
  let t1;
  let pre;
  let t2_value = ctx[1].message + "";
  let t2;
  let t3;
  let t4;
  let if_block1_anchor;
  let if_block0 = ctx[1].frame && create_if_block_1(ctx);
  let if_block1 = ctx[1].stack && create_if_block(ctx);
  return {
    c() {
      h1 = element("h1");
      t0 = text(ctx[0]);
      t1 = space();
      pre = element("pre");
      t2 = text(t2_value);
      t3 = space();
      if (if_block0)
        if_block0.c();
      t4 = space();
      if (if_block1)
        if_block1.c();
      if_block1_anchor = empty();
    },
    l(nodes) {
      h1 = claim_element(nodes, "H1", {});
      var h1_nodes = children(h1);
      t0 = claim_text(h1_nodes, ctx[0]);
      h1_nodes.forEach(detach);
      t1 = claim_space(nodes);
      pre = claim_element(nodes, "PRE", {});
      var pre_nodes = children(pre);
      t2 = claim_text(pre_nodes, t2_value);
      pre_nodes.forEach(detach);
      t3 = claim_space(nodes);
      if (if_block0)
        if_block0.l(nodes);
      t4 = claim_space(nodes);
      if (if_block1)
        if_block1.l(nodes);
      if_block1_anchor = empty();
    },
    m(target, anchor) {
      insert_hydration(target, h1, anchor);
      append_hydration(h1, t0);
      insert_hydration(target, t1, anchor);
      insert_hydration(target, pre, anchor);
      append_hydration(pre, t2);
      insert_hydration(target, t3, anchor);
      if (if_block0)
        if_block0.m(target, anchor);
      insert_hydration(target, t4, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert_hydration(target, if_block1_anchor, anchor);
    },
    p(ctx2, [dirty]) {
      if (dirty & 1)
        set_data(t0, ctx2[0]);
      if (dirty & 2 && t2_value !== (t2_value = ctx2[1].message + ""))
        set_data(t2, t2_value);
      if (ctx2[1].frame) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_1(ctx2);
          if_block0.c();
          if_block0.m(t4.parentNode, t4);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (ctx2[1].stack) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block(ctx2);
          if_block1.c();
          if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(h1);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(pre);
      if (detaching)
        detach(t3);
      if (if_block0)
        if_block0.d(detaching);
      if (detaching)
        detach(t4);
      if (if_block1)
        if_block1.d(detaching);
      if (detaching)
        detach(if_block1_anchor);
    }
  };
}
function load({ error, status }) {
  return { props: { error, status } };
}
function instance($$self, $$props, $$invalidate) {
  let { status } = $$props;
  let { error } = $$props;
  $$self.$$set = ($$props2) => {
    if ("status" in $$props2)
      $$invalidate(0, status = $$props2.status);
    if ("error" in $$props2)
      $$invalidate(1, error = $$props2.error);
  };
  return [status, error];
}
class Error extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, { status: 0, error: 1 });
  }
}
export { Error as default, load };
//# sourceMappingURL=error.svelte-c43c816c.js.map

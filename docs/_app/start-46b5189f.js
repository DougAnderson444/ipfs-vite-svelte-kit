var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
import { safe_not_equal, noop, SvelteComponent, init, element, claim_element, children, detach, attr, set_style, insert_hydration, text, claim_text, set_data, space, empty, claim_space, group_outros, transition_out, check_outros, transition_in, setContext, afterUpdate, onMount, create_component, claim_component, mount_component, get_spread_update, get_spread_object, destroy_component, assign, tick } from "./chunks/index-4d7732b1.js";
import { set_paths, assets } from "./chunks/paths-aded2850.js";
import { __vitePreload } from "./chunks/preload-helper-05a83733.js";
const subscriber_queue = [];
function writable(value, start2 = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start2(set) || noop;
    }
    run(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe };
}
function create_else_block_1(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [ctx[1] || {}];
  var switch_value = ctx[0][0];
  function switch_props(ctx2) {
    let switch_instance_props = {};
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props());
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l(nodes) {
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, nodes);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }
      insert_hydration(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const switch_instance_changes = dirty & 2 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(ctx2[1] || {})]) : {};
      if (switch_value !== (switch_value = ctx2[0][0])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props());
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function create_if_block_2(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [ctx[1] || {}];
  var switch_value = ctx[0][0];
  function switch_props(ctx2) {
    let switch_instance_props = {
      $$slots: { default: [create_default_slot] },
      $$scope: { ctx: ctx2 }
    };
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l(nodes) {
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, nodes);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }
      insert_hydration(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const switch_instance_changes = dirty & 2 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(ctx2[1] || {})]) : {};
      if (dirty & 525) {
        switch_instance_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (switch_value !== (switch_value = ctx2[0][0])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function create_else_block(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [ctx[2] || {}];
  var switch_value = ctx[0][1];
  function switch_props(ctx2) {
    let switch_instance_props = {};
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props());
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l(nodes) {
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, nodes);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }
      insert_hydration(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const switch_instance_changes = dirty & 4 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(ctx2[2] || {})]) : {};
      if (switch_value !== (switch_value = ctx2[0][1])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props());
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function create_if_block_3(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [ctx[2] || {}];
  var switch_value = ctx[0][1];
  function switch_props(ctx2) {
    let switch_instance_props = {
      $$slots: { default: [create_default_slot_1] },
      $$scope: { ctx: ctx2 }
    };
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l(nodes) {
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, nodes);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }
      insert_hydration(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const switch_instance_changes = dirty & 4 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(ctx2[2] || {})]) : {};
      if (dirty & 521) {
        switch_instance_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (switch_value !== (switch_value = ctx2[0][1])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function create_default_slot_1(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [ctx[3] || {}];
  var switch_value = ctx[0][2];
  function switch_props(ctx2) {
    let switch_instance_props = {};
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props());
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l(nodes) {
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, nodes);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }
      insert_hydration(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const switch_instance_changes = dirty & 8 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(ctx2[3] || {})]) : {};
      if (switch_value !== (switch_value = ctx2[0][2])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props());
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function create_default_slot(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block_3, create_else_block];
  const if_blocks = [];
  function select_block_type_1(ctx2, dirty) {
    if (ctx2[0][2])
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type_1(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_1(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_if_block(ctx) {
  let div;
  let if_block = ctx[5] && create_if_block_1(ctx);
  return {
    c() {
      div = element("div");
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", {
        id: true,
        "aria-live": true,
        "aria-atomic": true,
        style: true
      });
      var div_nodes = children(div);
      if (if_block)
        if_block.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "id", "svelte-announcer");
      attr(div, "aria-live", "assertive");
      attr(div, "aria-atomic", "true");
      set_style(div, "position", "absolute");
      set_style(div, "left", "0");
      set_style(div, "top", "0");
      set_style(div, "clip", "rect(0 0 0 0)");
      set_style(div, "clip-path", "inset(50%)");
      set_style(div, "overflow", "hidden");
      set_style(div, "white-space", "nowrap");
      set_style(div, "width", "1px");
      set_style(div, "height", "1px");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (if_block)
        if_block.m(div, null);
    },
    p(ctx2, dirty) {
      if (ctx2[5]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_1(ctx2);
          if_block.c();
          if_block.m(div, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (if_block)
        if_block.d();
    }
  };
}
function create_if_block_1(ctx) {
  let t;
  return {
    c() {
      t = text(ctx[6]);
    },
    l(nodes) {
      t = claim_text(nodes, ctx[6]);
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 64)
        set_data(t, ctx2[6]);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_fragment(ctx) {
  let current_block_type_index;
  let if_block0;
  let t;
  let if_block1_anchor;
  let current;
  const if_block_creators = [create_if_block_2, create_else_block_1];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (ctx2[0][1])
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  let if_block1 = ctx[4] && create_if_block(ctx);
  return {
    c() {
      if_block0.c();
      t = space();
      if (if_block1)
        if_block1.c();
      if_block1_anchor = empty();
    },
    l(nodes) {
      if_block0.l(nodes);
      t = claim_space(nodes);
      if (if_block1)
        if_block1.l(nodes);
      if_block1_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_hydration(target, t, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert_hydration(target, if_block1_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block0 = if_blocks[current_block_type_index];
        if (!if_block0) {
          if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block0.c();
        } else {
          if_block0.p(ctx2, dirty);
        }
        transition_in(if_block0, 1);
        if_block0.m(t.parentNode, t);
      }
      if (ctx2[4]) {
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
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      current = false;
    },
    d(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach(t);
      if (if_block1)
        if_block1.d(detaching);
      if (detaching)
        detach(if_block1_anchor);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let { stores } = $$props;
  let { page } = $$props;
  let { components: components2 } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  let mounted = false;
  let navigated = false;
  let title = null;
  onMount(() => {
    const unsubscribe = stores.page.subscribe(() => {
      if (mounted) {
        $$invalidate(5, navigated = true);
        $$invalidate(6, title = document.title || "untitled page");
      }
    });
    $$invalidate(4, mounted = true);
    return unsubscribe;
  });
  $$self.$$set = ($$props2) => {
    if ("stores" in $$props2)
      $$invalidate(7, stores = $$props2.stores);
    if ("page" in $$props2)
      $$invalidate(8, page = $$props2.page);
    if ("components" in $$props2)
      $$invalidate(0, components2 = $$props2.components);
    if ("props_0" in $$props2)
      $$invalidate(1, props_0 = $$props2.props_0);
    if ("props_1" in $$props2)
      $$invalidate(2, props_1 = $$props2.props_1);
    if ("props_2" in $$props2)
      $$invalidate(3, props_2 = $$props2.props_2);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 384) {
      stores.page.set(page);
    }
  };
  return [components2, props_0, props_1, props_2, mounted, navigated, title, stores, page];
}
class Root extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {
      stores: 7,
      page: 8,
      components: 0,
      props_0: 1,
      props_1: 2,
      props_2: 3
    });
  }
}
const matchers = {};
const components = [
  () => __vitePreload(() => import("./pages/__layout.svelte-bcd69d82.js"), true ? ["pages/__layout.svelte-bcd69d82.js","assets/pages/__layout.svelte-9bdd7e97.css","chunks/index-4d7732b1.js","chunks/paths-aded2850.js"] : void 0),
  () => __vitePreload(() => import("./error.svelte-c43c816c.js"), true ? ["error.svelte-c43c816c.js","chunks/index-4d7732b1.js"] : void 0),
  () => __vitePreload(() => import("./pages/about.svelte-fa342e68.js"), true ? ["pages/about.svelte-fa342e68.js","assets/pages/about.svelte-4db5be0d.css","chunks/index-4d7732b1.js"] : void 0),
  () => __vitePreload(() => import("./pages/index.svelte-a8538c16.js"), true ? ["pages/index.svelte-a8538c16.js","assets/pages/index.svelte-a55cefe2.css","chunks/preload-helper-05a83733.js","chunks/index-4d7732b1.js"] : void 0)
];
const dictionary = {
  "": [[0, 3], [1]],
  "about": [[0, 2], [1]]
};
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
function normalize(loaded) {
  if (loaded.fallthrough) {
    throw new Error("fallthrough is no longer supported. Use matchers instead: https://kit.svelte.dev/docs/routing#advanced-routing-matching");
  }
  if ("maxage" in loaded) {
    throw new Error("maxage should be replaced with cache: { maxage }");
  }
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return { status: status || 500, error: new Error() };
    }
    const error = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error };
    }
    return { status, error };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  if (loaded.dependencies) {
    if (!Array.isArray(loaded.dependencies) || loaded.dependencies.some((dep) => typeof dep !== "string")) {
      return {
        status: 500,
        error: new Error('"dependencies" property returned from load() must be of type string[]')
      };
    }
  }
  if (loaded.context) {
    throw new Error('You are returning "context" from a load function. "context" was renamed to "stuff", please adjust your code accordingly.');
  }
  return loaded;
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function hash(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
function get_base_uri(doc) {
  let baseURI = doc.baseURI;
  if (!baseURI) {
    const baseTags = doc.getElementsByTagName("base");
    baseURI = baseTags.length ? baseTags[0].href : doc.URL;
  }
  return baseURI;
}
function scroll_state() {
  return {
    x: pageXOffset,
    y: pageYOffset
  };
}
function find_anchor(event) {
  const node = event.composedPath().find((e) => e instanceof Node && e.nodeName.toUpperCase() === "A");
  return node;
}
function get_href(node) {
  return node instanceof SVGAElement ? new URL(node.href.baseVal, document.baseURI) : new URL(node.href);
}
function notifiable_store(value) {
  const store = writable(value);
  let ready = true;
  function notify() {
    ready = true;
    store.update((val) => val);
  }
  function set(new_value) {
    ready = false;
    store.set(new_value);
  }
  function subscribe(run) {
    let old_value;
    return store.subscribe((new_value) => {
      if (old_value === void 0 || ready && new_value !== old_value) {
        run(old_value = new_value);
      }
    });
  }
  return { notify, set, subscribe };
}
function create_updated_store() {
  const { set, subscribe } = writable(false);
  const initial = "1652719806051";
  let timeout;
  async function check() {
    clearTimeout(timeout);
    const file = "_app/version.json";
    const res = await fetch(`${assets}/${file}`, {
      headers: {
        pragma: "no-cache",
        "cache-control": "no-cache"
      }
    });
    if (res.ok) {
      const { version } = await res.json();
      const updated = version !== initial;
      if (updated) {
        set(true);
        clearTimeout(timeout);
      }
      return updated;
    } else {
      throw new Error(`Version check failed: ${res.status}`);
    }
  }
  return {
    subscribe,
    check
  };
}
function initial_fetch(resource, opts) {
  const url = JSON.stringify(typeof resource === "string" ? resource : resource.url);
  let selector = `script[sveltekit\\:data-type="data"][sveltekit\\:data-url=${url}]`;
  if (opts && typeof opts.body === "string") {
    selector += `[sveltekit\\:data-body="${hash(opts.body)}"]`;
  }
  const script = document.querySelector(selector);
  if (script && script.textContent) {
    const _a = JSON.parse(script.textContent), { body } = _a, init2 = __objRest(_a, ["body"]);
    return Promise.resolve(new Response(body, init2));
  }
  return fetch(resource, opts);
}
const param_pattern = /^(\.\.\.)?(\w+)(?:=(\w+))?$/;
function parse_route_id(id) {
  const names = [];
  const types = [];
  let add_trailing_slash = true;
  const pattern = id === "" ? /^\/$/ : new RegExp(`^${decodeURIComponent(id).split(/(?:@[a-zA-Z0-9_-]+)?(?:\/|$)/).map((segment, i, segments) => {
    const match = /^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(segment);
    if (match) {
      names.push(match[1]);
      types.push(match[2]);
      return "(?:/(.*))?";
    }
    const is_last = i === segments.length - 1;
    return segment && "/" + segment.split(/\[(.+?)\]/).map((content, i2) => {
      if (i2 % 2) {
        const [, rest, name, type] = param_pattern.exec(content);
        names.push(name);
        types.push(type);
        return rest ? "(.*?)" : "([^/]+?)";
      }
      if (is_last && content.includes("."))
        add_trailing_slash = false;
      return content.normalize().replace(/%5[Bb]/g, "[").replace(/%5[Dd]/g, "]").replace(/#/g, "%23").replace(/\?/g, "%3F").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }).join("");
  }).join("")}${add_trailing_slash ? "/?" : ""}$`);
  return { pattern, names, types };
}
function exec(match, names, types, matchers2) {
  const params = {};
  for (let i = 0; i < names.length; i += 1) {
    const name = names[i];
    const type = types[i];
    const value = match[i + 1] || "";
    if (type) {
      const matcher = matchers2[type];
      if (!matcher)
        throw new Error(`Missing "${type}" param matcher`);
      if (!matcher(value))
        return;
    }
    params[name] = value;
  }
  return params;
}
function parse(components2, dictionary2, matchers2) {
  const routes2 = Object.entries(dictionary2).map(([id, [a, b, has_shadow]]) => {
    const { pattern, names, types } = parse_route_id(id);
    return {
      id,
      exec: (path) => {
        const match = pattern.exec(path);
        if (match)
          return exec(match, names, types, matchers2);
      },
      a: a.map((n) => components2[n]),
      b: b.map((n) => components2[n]),
      has_shadow: !!has_shadow
    };
  });
  return routes2;
}
const SCROLL_KEY = "sveltekit:scroll";
const INDEX_KEY = "sveltekit:index";
const routes = parse(components, dictionary, matchers);
const default_layout = components[0]();
const default_error = components[1]();
const root_stuff = {};
let scroll_positions = {};
try {
  scroll_positions = JSON.parse(sessionStorage[SCROLL_KEY]);
} catch {
}
function update_scroll_positions(index) {
  scroll_positions[index] = scroll_state();
}
function create_client({ target, session, base, trailing_slash }) {
  var _a;
  const cache = /* @__PURE__ */ new Map();
  const invalidated = [];
  const stores = {
    url: notifiable_store({}),
    page: notifiable_store({}),
    navigating: writable(null),
    session: writable(session),
    updated: create_updated_store()
  };
  const load_cache = {
    id: null,
    promise: null
  };
  const callbacks = {
    before_navigate: [],
    after_navigate: []
  };
  let current = {
    branch: [],
    error: null,
    session_id: 0,
    stuff: root_stuff,
    url: null
  };
  let started = false;
  let autoscroll = true;
  let updating = false;
  let session_id = 1;
  let invalidating = null;
  let root;
  let $session;
  let ready = false;
  stores.session.subscribe(async (value) => {
    $session = value;
    if (!ready)
      return;
    session_id += 1;
    update(new URL(location.href), [], true);
  });
  ready = true;
  let router_enabled = true;
  let current_history_index = (_a = history.state) == null ? void 0 : _a[INDEX_KEY];
  if (!current_history_index) {
    current_history_index = Date.now();
    history.replaceState(__spreadProps(__spreadValues({}, history.state), { [INDEX_KEY]: current_history_index }), "", location.href);
  }
  const scroll = scroll_positions[current_history_index];
  if (scroll) {
    history.scrollRestoration = "manual";
    scrollTo(scroll.x, scroll.y);
  }
  let hash_navigating = false;
  let page;
  let token;
  async function goto(href, { noscroll = false, replaceState = false, keepfocus = false, state = {} }, redirect_chain) {
    const url = new URL(href, get_base_uri(document));
    if (router_enabled) {
      return navigate({
        url,
        scroll: noscroll ? scroll_state() : null,
        keepfocus,
        redirect_chain,
        details: {
          state,
          replaceState
        },
        accepted: () => {
        },
        blocked: () => {
        }
      });
    }
    await native_navigation(url);
  }
  async function prefetch(url) {
    const intent = get_navigation_intent(url);
    if (!intent) {
      throw new Error("Attempted to prefetch a URL that does not belong to this app");
    }
    load_cache.promise = load_route(intent, false);
    load_cache.id = intent.id;
    return load_cache.promise;
  }
  async function update(url, redirect_chain, no_cache, opts) {
    var _a2, _b, _c;
    const intent = get_navigation_intent(url);
    const current_token = token = {};
    let navigation_result = intent && await load_route(intent, no_cache);
    if (!navigation_result && url.origin === location.origin && url.pathname === location.pathname) {
      navigation_result = await load_root_error_page({
        status: 404,
        error: new Error(`Not found: ${url.pathname}`),
        url,
        routeId: null
      });
    }
    if (!navigation_result) {
      await native_navigation(url);
      return false;
    }
    if (token !== current_token)
      return false;
    invalidated.length = 0;
    if (navigation_result.redirect) {
      if (redirect_chain.length > 10 || redirect_chain.includes(url.pathname)) {
        navigation_result = await load_root_error_page({
          status: 500,
          error: new Error("Redirect loop"),
          url,
          routeId: null
        });
      } else {
        if (router_enabled) {
          goto(new URL(navigation_result.redirect, url).href, {}, [
            ...redirect_chain,
            url.pathname
          ]);
        } else {
          await native_navigation(new URL(navigation_result.redirect, location.href));
        }
        return false;
      }
    } else if (((_b = (_a2 = navigation_result.props) == null ? void 0 : _a2.page) == null ? void 0 : _b.status) >= 400) {
      const updated = await stores.updated.check();
      if (updated) {
        await native_navigation(url);
      }
    }
    updating = true;
    if (opts && opts.details) {
      const { details } = opts;
      const change = details.replaceState ? 0 : 1;
      details.state[INDEX_KEY] = current_history_index += change;
      history[details.replaceState ? "replaceState" : "pushState"](details.state, "", url);
    }
    if (started) {
      current = navigation_result.state;
      root.$set(navigation_result.props);
    } else {
      initialize(navigation_result);
    }
    if (opts) {
      const { scroll: scroll2, keepfocus } = opts;
      if (!keepfocus) {
        const root2 = document.body;
        const tabindex = root2.getAttribute("tabindex");
        (_c = getSelection()) == null ? void 0 : _c.removeAllRanges();
        root2.tabIndex = -1;
        root2.focus();
        if (tabindex !== null) {
          root2.setAttribute("tabindex", tabindex);
        } else {
          root2.removeAttribute("tabindex");
        }
      }
      await tick();
      if (autoscroll) {
        const deep_linked = url.hash && document.getElementById(url.hash.slice(1));
        if (scroll2) {
          scrollTo(scroll2.x, scroll2.y);
        } else if (deep_linked) {
          deep_linked.scrollIntoView();
        } else {
          scrollTo(0, 0);
        }
      }
    } else {
      await tick();
    }
    load_cache.promise = null;
    load_cache.id = null;
    autoscroll = true;
    updating = false;
    if (navigation_result.props.page) {
      page = navigation_result.props.page;
    }
    const leaf_node = navigation_result.state.branch[navigation_result.state.branch.length - 1];
    router_enabled = (leaf_node == null ? void 0 : leaf_node.module.router) !== false;
    return true;
  }
  function initialize(result) {
    current = result.state;
    const style = document.querySelector("style[data-sveltekit]");
    if (style)
      style.remove();
    page = result.props.page;
    root = new Root({
      target,
      props: __spreadProps(__spreadValues({}, result.props), { stores }),
      hydrate: true
    });
    started = true;
    if (router_enabled) {
      const navigation = { from: null, to: new URL(location.href) };
      callbacks.after_navigate.forEach((fn) => fn(navigation));
    }
  }
  async function get_navigation_result_from_branch({
    url,
    params,
    stuff,
    branch,
    status,
    error,
    routeId
  }) {
    var _a2, _b;
    const filtered = branch.filter(Boolean);
    const redirect = filtered.find((f) => {
      var _a3;
      return (_a3 = f.loaded) == null ? void 0 : _a3.redirect;
    });
    const result = {
      redirect: (_a2 = redirect == null ? void 0 : redirect.loaded) == null ? void 0 : _a2.redirect,
      state: {
        url,
        params,
        branch,
        error,
        stuff,
        session_id
      },
      props: {
        components: filtered.map((node) => node.module.default)
      }
    };
    for (let i = 0; i < filtered.length; i += 1) {
      const loaded = filtered[i].loaded;
      result.props[`props_${i}`] = loaded ? await loaded.props : null;
    }
    const page_changed = !current.url || url.href !== current.url.href || current.error !== error || current.stuff !== stuff;
    if (page_changed) {
      result.props.page = { error, params, routeId, status, stuff, url };
      const print_error = (property, replacement) => {
        Object.defineProperty(result.props.page, property, {
          get: () => {
            throw new Error(`$page.${property} has been replaced by $page.url.${replacement}`);
          }
        });
      };
      print_error("origin", "origin");
      print_error("path", "pathname");
      print_error("query", "searchParams");
    }
    const leaf = filtered[filtered.length - 1];
    const load_cache2 = (_b = leaf == null ? void 0 : leaf.loaded) == null ? void 0 : _b.cache;
    if (load_cache2) {
      const key = url.pathname + url.search;
      let ready2 = false;
      const clear = () => {
        if (cache.get(key) === result) {
          cache.delete(key);
        }
        unsubscribe();
        clearTimeout(timeout);
      };
      const timeout = setTimeout(clear, load_cache2.maxage * 1e3);
      const unsubscribe = stores.session.subscribe(() => {
        if (ready2)
          clear();
      });
      ready2 = true;
      cache.set(key, result);
    }
    return result;
  }
  async function load_node({ status, error, module, url, params, stuff, props, routeId }) {
    const node = {
      module,
      uses: {
        params: /* @__PURE__ */ new Set(),
        url: false,
        session: false,
        stuff: false,
        dependencies: /* @__PURE__ */ new Set()
      },
      loaded: null,
      stuff
    };
    function add_dependency(dep) {
      const { href } = new URL(dep, url);
      node.uses.dependencies.add(href);
    }
    if (props) {
      node.uses.dependencies.add(url.href);
    }
    const uses_params = {};
    for (const key in params) {
      Object.defineProperty(uses_params, key, {
        get() {
          node.uses.params.add(key);
          return params[key];
        },
        enumerable: true
      });
    }
    const session2 = $session;
    if (module.load) {
      const load_input = {
        routeId,
        params: uses_params,
        props: props || {},
        get url() {
          node.uses.url = true;
          return url;
        },
        get session() {
          node.uses.session = true;
          return session2;
        },
        get stuff() {
          node.uses.stuff = true;
          return __spreadValues({}, stuff);
        },
        fetch(resource, info) {
          const requested = typeof resource === "string" ? resource : resource.url;
          add_dependency(requested);
          return started ? fetch(resource, info) : initial_fetch(resource, info);
        },
        status: status != null ? status : null,
        error: error != null ? error : null
      };
      const loaded = await module.load.call(null, load_input);
      if (!loaded) {
        throw new Error("load function must return a value");
      }
      node.loaded = normalize(loaded);
      if (node.loaded.stuff)
        node.stuff = node.loaded.stuff;
      if (node.loaded.dependencies) {
        node.loaded.dependencies.forEach(add_dependency);
      }
    } else if (props) {
      node.loaded = normalize({ props });
    }
    return node;
  }
  async function load_route({ id, url, params, route }, no_cache) {
    var _a2, _b, _c;
    if (load_cache.id === id && load_cache.promise) {
      return load_cache.promise;
    }
    if (!no_cache) {
      const cached = cache.get(id);
      if (cached)
        return cached;
    }
    const { a, b, has_shadow } = route;
    const changed = current.url && {
      url: id !== current.url.pathname + current.url.search,
      params: Object.keys(params).filter((key) => current.params[key] !== params[key]),
      session: session_id !== current.session_id
    };
    let branch = [];
    let stuff = root_stuff;
    let stuff_changed = false;
    let status = 200;
    let error = null;
    a.forEach((loader) => loader());
    load:
      for (let i = 0; i < a.length; i += 1) {
        let node;
        try {
          if (!a[i])
            continue;
          const module = await a[i]();
          const previous = current.branch[i];
          const changed_since_last_render = !previous || module !== previous.module || changed.url && previous.uses.url || changed.params.some((param) => previous.uses.params.has(param)) || changed.session && previous.uses.session || Array.from(previous.uses.dependencies).some((dep) => invalidated.some((fn) => fn(dep))) || stuff_changed && previous.uses.stuff;
          if (changed_since_last_render) {
            let props = {};
            const is_shadow_page = has_shadow && i === a.length - 1;
            if (is_shadow_page) {
              const res = await fetch(`${url.pathname}${url.pathname.endsWith("/") ? "" : "/"}__data.json${url.search}`, {
                headers: {
                  "x-sveltekit-load": "true"
                }
              });
              if (res.ok) {
                const redirect = res.headers.get("x-sveltekit-location");
                if (redirect) {
                  return {
                    redirect,
                    props: {},
                    state: current
                  };
                }
                props = res.status === 204 ? {} : await res.json();
              } else {
                status = res.status;
                error = new Error("Failed to load data");
              }
            }
            if (!error) {
              node = await load_node({
                module,
                url,
                params,
                props,
                stuff,
                routeId: route.id
              });
            }
            if (node) {
              if (is_shadow_page) {
                node.uses.url = true;
              }
              if (node.loaded) {
                if (node.loaded.error) {
                  status = node.loaded.status;
                  error = node.loaded.error;
                }
                if (node.loaded.redirect) {
                  return {
                    redirect: node.loaded.redirect,
                    props: {},
                    state: current
                  };
                }
                if (node.loaded.stuff) {
                  stuff_changed = true;
                }
              }
            }
          } else {
            node = previous;
          }
        } catch (e) {
          status = 500;
          error = coalesce_to_error(e);
        }
        if (error) {
          while (i--) {
            if (b[i]) {
              let error_loaded;
              let node_loaded;
              let j = i;
              while (!(node_loaded = branch[j])) {
                j -= 1;
              }
              try {
                error_loaded = await load_node({
                  status,
                  error,
                  module: await b[i](),
                  url,
                  params,
                  stuff: node_loaded.stuff,
                  routeId: route.id
                });
                if ((_a2 = error_loaded == null ? void 0 : error_loaded.loaded) == null ? void 0 : _a2.error) {
                  continue;
                }
                if ((_b = error_loaded == null ? void 0 : error_loaded.loaded) == null ? void 0 : _b.stuff) {
                  stuff = __spreadValues(__spreadValues({}, stuff), error_loaded.loaded.stuff);
                }
                branch = branch.slice(0, j + 1).concat(error_loaded);
                break load;
              } catch (e) {
                continue;
              }
            }
          }
          return await load_root_error_page({
            status,
            error,
            url,
            routeId: route.id
          });
        } else {
          if ((_c = node == null ? void 0 : node.loaded) == null ? void 0 : _c.stuff) {
            stuff = __spreadValues(__spreadValues({}, stuff), node.loaded.stuff);
          }
          branch.push(node);
        }
      }
    return await get_navigation_result_from_branch({
      url,
      params,
      stuff,
      branch,
      status,
      error,
      routeId: route.id
    });
  }
  async function load_root_error_page({ status, error, url, routeId }) {
    var _a2, _b;
    const params = {};
    const root_layout = await load_node({
      module: await default_layout,
      url,
      params,
      stuff: {},
      routeId
    });
    const root_error = await load_node({
      status,
      error,
      module: await default_error,
      url,
      params,
      stuff: root_layout && root_layout.loaded && root_layout.loaded.stuff || {},
      routeId
    });
    return await get_navigation_result_from_branch({
      url,
      params,
      stuff: __spreadValues(__spreadValues({}, (_a2 = root_layout == null ? void 0 : root_layout.loaded) == null ? void 0 : _a2.stuff), (_b = root_error == null ? void 0 : root_error.loaded) == null ? void 0 : _b.stuff),
      branch: [root_layout, root_error],
      status,
      error,
      routeId
    });
  }
  function get_navigation_intent(url) {
    if (url.origin !== location.origin || !url.pathname.startsWith(base))
      return;
    const path = decodeURI(url.pathname.slice(base.length) || "/");
    for (const route of routes) {
      const params = route.exec(path);
      if (params) {
        const intent = {
          id: url.pathname + url.search,
          route,
          params,
          url
        };
        return intent;
      }
    }
  }
  async function navigate({ url, scroll: scroll2, keepfocus, redirect_chain, details, accepted, blocked }) {
    const from = current.url;
    let should_block = false;
    const navigation = {
      from,
      to: url,
      cancel: () => should_block = true
    };
    callbacks.before_navigate.forEach((fn) => fn(navigation));
    if (should_block) {
      blocked();
      return;
    }
    const pathname = normalize_path(url.pathname, trailing_slash);
    const normalized = new URL(url.origin + pathname + url.search + url.hash);
    update_scroll_positions(current_history_index);
    accepted();
    if (started) {
      stores.navigating.set({
        from: current.url,
        to: normalized
      });
    }
    const completed = await update(normalized, redirect_chain, false, {
      scroll: scroll2,
      keepfocus,
      details
    });
    if (completed) {
      const navigation2 = { from, to: normalized };
      callbacks.after_navigate.forEach((fn) => fn(navigation2));
      stores.navigating.set(null);
    }
  }
  function native_navigation(url) {
    location.href = url.href;
    return new Promise(() => {
    });
  }
  return {
    after_navigate: (fn) => {
      onMount(() => {
        callbacks.after_navigate.push(fn);
        return () => {
          const i = callbacks.after_navigate.indexOf(fn);
          callbacks.after_navigate.splice(i, 1);
        };
      });
    },
    before_navigate: (fn) => {
      onMount(() => {
        callbacks.before_navigate.push(fn);
        return () => {
          const i = callbacks.before_navigate.indexOf(fn);
          callbacks.before_navigate.splice(i, 1);
        };
      });
    },
    disable_scroll_handling: () => {
      if (updating || !started) {
        autoscroll = false;
      }
    },
    goto: (href, opts = {}) => goto(href, opts, []),
    invalidate: (resource) => {
      if (typeof resource === "function") {
        invalidated.push(resource);
      } else {
        const { href } = new URL(resource, location.href);
        invalidated.push((dep) => dep === href);
      }
      if (!invalidating) {
        invalidating = Promise.resolve().then(async () => {
          await update(new URL(location.href), [], true);
          invalidating = null;
        });
      }
      return invalidating;
    },
    prefetch: async (href) => {
      const url = new URL(href, get_base_uri(document));
      await prefetch(url);
    },
    prefetch_routes: async (pathnames) => {
      const matching = pathnames ? routes.filter((route) => pathnames.some((pathname) => route.exec(pathname))) : routes;
      const promises = matching.map((r) => Promise.all(r.a.map((load) => load())));
      await Promise.all(promises);
    },
    _start_router: () => {
      history.scrollRestoration = "manual";
      addEventListener("beforeunload", (e) => {
        let should_block = false;
        const navigation = {
          from: current.url,
          to: null,
          cancel: () => should_block = true
        };
        callbacks.before_navigate.forEach((fn) => fn(navigation));
        if (should_block) {
          e.preventDefault();
          e.returnValue = "";
        } else {
          history.scrollRestoration = "auto";
        }
      });
      addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
          update_scroll_positions(current_history_index);
          try {
            sessionStorage[SCROLL_KEY] = JSON.stringify(scroll_positions);
          } catch {
          }
        }
      });
      const trigger_prefetch = (event) => {
        const a = find_anchor(event);
        if (a && a.href && a.hasAttribute("sveltekit:prefetch")) {
          prefetch(get_href(a));
        }
      };
      let mousemove_timeout;
      const handle_mousemove = (event) => {
        clearTimeout(mousemove_timeout);
        mousemove_timeout = setTimeout(() => {
          var _a2;
          (_a2 = event.target) == null ? void 0 : _a2.dispatchEvent(new CustomEvent("sveltekit:trigger_prefetch", { bubbles: true }));
        }, 20);
      };
      addEventListener("touchstart", trigger_prefetch);
      addEventListener("mousemove", handle_mousemove);
      addEventListener("sveltekit:trigger_prefetch", trigger_prefetch);
      addEventListener("click", (event) => {
        if (!router_enabled)
          return;
        if (event.button || event.which !== 1)
          return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
          return;
        if (event.defaultPrevented)
          return;
        const a = find_anchor(event);
        if (!a)
          return;
        if (!a.href)
          return;
        const is_svg_a_element = a instanceof SVGAElement;
        const url = get_href(a);
        if (!is_svg_a_element && url.origin === "null")
          return;
        const rel = (a.getAttribute("rel") || "").split(/\s+/);
        if (a.hasAttribute("download") || rel.includes("external") || a.hasAttribute("sveltekit:reload")) {
          return;
        }
        if (is_svg_a_element ? a.target.baseVal : a.target)
          return;
        const [base2, hash2] = url.href.split("#");
        if (hash2 !== void 0 && base2 === location.href.split("#")[0]) {
          hash_navigating = true;
          update_scroll_positions(current_history_index);
          stores.page.set(__spreadProps(__spreadValues({}, page), { url }));
          stores.page.notify();
          return;
        }
        navigate({
          url,
          scroll: a.hasAttribute("sveltekit:noscroll") ? scroll_state() : null,
          keepfocus: false,
          redirect_chain: [],
          details: {
            state: {},
            replaceState: url.href === location.href
          },
          accepted: () => event.preventDefault(),
          blocked: () => event.preventDefault()
        });
      });
      addEventListener("popstate", (event) => {
        if (event.state && router_enabled) {
          if (event.state[INDEX_KEY] === current_history_index)
            return;
          navigate({
            url: new URL(location.href),
            scroll: scroll_positions[event.state[INDEX_KEY]],
            keepfocus: false,
            redirect_chain: [],
            details: null,
            accepted: () => {
              current_history_index = event.state[INDEX_KEY];
            },
            blocked: () => {
              const delta = current_history_index - event.state[INDEX_KEY];
              history.go(delta);
            }
          });
        }
      });
      addEventListener("hashchange", () => {
        if (hash_navigating) {
          hash_navigating = false;
          history.replaceState(__spreadProps(__spreadValues({}, history.state), { [INDEX_KEY]: ++current_history_index }), "", location.href);
        }
      });
    },
    _hydrate: async ({ status, error, nodes, params, routeId }) => {
      const url = new URL(location.href);
      const branch = [];
      let stuff = {};
      let result;
      let error_args;
      try {
        for (let i = 0; i < nodes.length; i += 1) {
          const is_leaf = i === nodes.length - 1;
          let props;
          if (is_leaf) {
            const serialized = document.querySelector('script[sveltekit\\:data-type="props"]');
            if (serialized) {
              props = JSON.parse(serialized.textContent);
            }
          }
          const node = await load_node({
            module: await nodes[i],
            url,
            params,
            stuff,
            status: is_leaf ? status : void 0,
            error: is_leaf ? error : void 0,
            props,
            routeId
          });
          if (props) {
            node.uses.dependencies.add(url.href);
            node.uses.url = true;
          }
          branch.push(node);
          if (node && node.loaded) {
            if (node.loaded.error) {
              if (error)
                throw node.loaded.error;
              error_args = {
                status: node.loaded.status,
                error: node.loaded.error,
                url,
                routeId
              };
            } else if (node.loaded.stuff) {
              stuff = __spreadValues(__spreadValues({}, stuff), node.loaded.stuff);
            }
          }
        }
        result = error_args ? await load_root_error_page(error_args) : await get_navigation_result_from_branch({
          url,
          params,
          stuff,
          branch,
          status,
          error,
          routeId
        });
      } catch (e) {
        if (error)
          throw e;
        result = await load_root_error_page({
          status: 500,
          error: coalesce_to_error(e),
          url,
          routeId
        });
      }
      if (result.redirect) {
        await native_navigation(new URL(result.redirect, location.href));
      }
      initialize(result);
    }
  };
}
async function start({ paths, target, session, route, spa, trailing_slash, hydrate }) {
  const client = create_client({
    target,
    session,
    base: paths.base,
    trailing_slash
  });
  set_paths(paths);
  if (hydrate) {
    await client._hydrate(hydrate);
  }
  if (route) {
    if (spa)
      client.goto(location.href, { replaceState: true });
    client._start_router();
  }
  dispatchEvent(new CustomEvent("sveltekit:start"));
}
export { start };
//# sourceMappingURL=start-46b5189f.js.map

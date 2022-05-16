# IPFS with Vite, SvelteKit

## Steps to Reproduce

- Install SvelteKit

```
npm init svelte@next myIPFSexperiment
npm i
```

- Install IPFS-core

`npm i ipfs-core`

- Install process and util, as it comes in node but not the browser

`npm i process util`

- We also need some globals, save them to `src/node-globals.js`:

```js
// file: src/node-globals.js
export const Buffer = require('buffer').Buffer;
export const process = require('process/browser');
export const global =
	typeof global !== 'undefined'
		? global
		: typeof globalThis !== 'undefined'
		? globalThis
		: typeof self !== 'undefined'
		? self
		: typeof window !== 'undefined'
		? window
		: {};

if (globalThis && globalThis.process && globalThis.process.env)
	globalThis.process.env.LIBP2P_FORCE_PNET = false;
```

- We need to build ipfs-core for the browser, use esbuild to do so

`npm i -D esbuild`

- Add a shotcut for the above in package.json

```js
	"scripts": {
		"build:ipfs": "esbuild ./node_modules/ipfs-core --bundle --format=esm --sourcemap --main-fields=browser,module,main --inject:./src/node-globals.js --define:globalThis.process.env.NODE_ENV='\"production\"' --splitting --outdir=./src/modules/ipfs-core"
	},
```

- run the esbuild script:

```
npm run build:ipfs
```

Results are now in

`src\modules\ipfs-core\ipfs-core.js`

- Import IPFS in the app. Need to do this inside svelte's onMount to ensure the DOM is loaded in the browser

```js
// src/routes/index.svelte

import { onMount } from 'svelte';

onMount(async () => {
	// In Svelte, a hot module refresh can cause lockfile problems
	// so we assign the ipfs node to globalThis to avoid lock file issues
	if (!globalThis.ipfsNode) {
		// no ipfs saved to globalThis, so load it up
		const IPFSmodule = await import('../modules/ipfs-core/ipfs-core.js');
		const IPFS = IPFSmodule.default;
		ipfsNode = await IPFS.create();
		globalThis.ipfsNode = ipfsNode;
	} else {
		ipfsNode = globalThis.ipfsNode;
	}
});
```

- Run the app:

```
npm run dev
```

- Build the app:

Install the [adapater for static](https://github.com/sveltejs/kit/tree/master/packages/adapter-static) sites:

```
npm i -D @sveltejs/adapter-static@next
```

then add the adapter to your `svelte.config.js`:

```js
// svelte.config.js
import adapter from '@sveltejs/adapter-static';

export default {
	kit: {
		adapter: adapter()
	}
};
```

and build

```
npm run build
```

and preview

```
npm run preview
```

open in localhost

## process.env.NODE_ENV in Svelte Dev

Note that in dev mode, sveltekit replaces `globalThis.process.env.NODE_ENV` with `globalThis."development"` thus screwing up the dev process. When we esbuild, to prevent sveltekit from doing this, we replace `globalThis.process.env.NODE_ENV` accordingly.

```cli
// package.json

"build:ipfs": "esbuild ... --define:globalThis.process.env.NODE_ENV='\"production\"' ... "
```

### DAG Building

The example usage is using ipfs.dag.put() with dag-pb to mimic what happens by default with ipfs.add()

### Thanks

Many credits go to Gozala's [https://github.com/Gozala/replicator](https://github.com/Gozala/replicator) for figuring much of this out.

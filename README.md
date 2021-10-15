# IPFS with Vite, SvelteKit

## Steps to Resporduce

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

`npm i -D esbuild esbuild ./node_modules/ipfs-core --bundle --format=esm --sourcemap --main-fields=browser,module,main --inject:./src/node-globals.js --define:process.env.NODE_ENV='\"production\"' --splitting --outdir=./src/modules/ipfs-core`

- Add a shotcut for the above in package.json

```js
	"scripts": {
		"build:ipfs": "esbuild ./node_modules/ipfs-core --bundle --format=esm --sourcemap --main-fields=browser,module,main --inject:./src/node-globals.js --define:process.env.NODE_ENV='\"production\"' --splitting --outdir=./src/modules/ipfs-core"
	},
```

- run the esbuild script. Results are now in

`src\modules\ipfs-core\ipfs-core.js`

- Import IPFS in the app. Need to do this inside svelte's onMount to ensure the DOM is loaded in the browser

```js
// src/routes/index.svelte

import { onMount } from 'svelte';

onMount(async () => {
	const IPFSmodule = await import('../modules/ipfs-core/ipfs-core.js');
	const IPFS = IPFSmodule.default;
	console.log({ IPFS });
	const ipfsNode = await IPFS.create();
	console.log({ ipfsNode });
	const identity = await ipfsNode.id();
	nodeId = identity.id;
	console.info('nodeId', nodeId);
});
```

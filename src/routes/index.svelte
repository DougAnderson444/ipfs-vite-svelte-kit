<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string';
	import { UnixFS } from 'ipfs-unixfs';

	let ipfsNode;
	let nodeId;
	let putted, added;
	let putWithLinks, addedWithLinks;

	let helloWorld = {
		hello: 'world'
	};

	onMount(async () => {
		// In Svelte, a hot module refresh can cause lockfile problems
		// so we assign the ipfs node to globalThis to avoid lock file issues
		if (!globalThis.ipfsNode) {
			// no ipfs saved to globalThis, so load it up
			const IPFSmodule = await import('../modules/ipfs-core/ipfs-core.js');
			const IPFS = IPFSmodule.default;
			console.log({ IPFS });
			ipfsNode = await IPFS.create();
			globalThis.ipfsNode = ipfsNode;
		} else {
			ipfsNode = globalThis.ipfsNode;
		}
		console.log({ ipfsNode });
		const identity = await ipfsNode.id();
		nodeId = identity.id;
		// console.info('nodeId', nodeId);

		const file = new UnixFS({
			type: 'file',
			data: uint8ArrayFromString(JSON.stringify(helloWorld)) // new Uint8Array(0) //
		});

		const pbNode = {
			Data: file.marshal(),
			Links: []
		};
		// ipfs dag put in format codec dag-pb

		// 1. make a dag-pb dag of a file with a link to another file
		putted = await ipfsNode.dag.put(pbNode, {
			storeCodec: 'dag-pb'
		});

		// 2. save the same binary data via ipfs.add
		added = await ipfsNode.add(JSON.stringify(helloWorld));

		// 3. check to see if they are the same
		// console.log(putted.toV0().toString() === added.cid.toV0().toString());
		// console.log(putted.toV1().toString() === added.cid.toV1().toString());
		// console.log({ putted });

		// WITH LINK(s)

		const pbNodeWithLinks = {
			Data: new UnixFS({
				type: 'file',
				data: new Uint8Array(0)
			}).marshal(),
			Links: [
				{
					Name: 'hello',
					Tsize: pbNode.Data != null ? pbNode.Data.length : 0,
					Hash: putted.toV0() // a cid, like: https://github.com/ipfs/js-ipfs-unixfs/blob/5db86734c8b2bb1253f6fac7ebd1f069ff2ed74e/packages/ipfs-unixfs-exporter/test/exporter.spec.js#L153
				}
			]
		};

		putWithLinks = await ipfsNode.dag.put(pbNodeWithLinks, {
			storeCodec: 'dag-pb'
		});

		return () => {
			console.log('the ipfs node is being stopped');
			ipfsNode.stop();
			globalThis.ipfsNode = null;
		};
	});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	{#if nodeId}
		<h3>
			Node ID: {nodeId}
		</h3>
		<h2>
			IPFS loaded in a Vite app, <strong>right?!</strong>
		</h2>
		{#if putted}ipfs.dag.put({JSON.stringify(helloWorld)}, {"{ storeCodec: 'dag-pb' }"})
			<br />
			CID verion0: {putted.toV0().toString()}
			<br />
			CID verion1: {putted.toString()}
		{/if}<br /><br />
		{#if added}ipfs.add({JSON.stringify(helloWorld)})<br />CID v0: {added.cid
				.toV0()
				.toString()}{/if}
		<br /><br />
		{#if added}ipfs.add(data) >> ipfs.cat(data):<br />

			<a target="_blank" href="https://dweb.link/api/v0/cat?arg={added.cid.toV0().toString()}"
				>{added.cid.toV0().toString()}</a
			>
			<br /> Check that they are the same:
			<b> {putted.toV0().toString() === added.cid.toV0().toString()}</b>
		{/if}
		<br /><br />
		{#if putWithLinks}Explore Linked Data:<br /><a
				target="_blank"
				href="https://explore.ipld.io/#/explore/{putWithLinks.toV0().toString()}"
				>{putWithLinks.toV0().toString()}</a
			>

			<br />DWeb Site:<br /><a
				target="_blank"
				href="https://{putWithLinks.toV1().toString()}.ipfs.dweb.link/"
				>https://[cid].ipfs.dweb.link</a
			><br /><br />

			CloudFlare:<br />
			<a target="_blank" href="https://{putWithLinks.toV1().toString()}.ipfs.cf-ipfs.com/"
				>https://[cid].ipfs.cf-ipfs.com</a
			><br /><br />
		{/if}

		{#if addedWithLinks}Explore Add with Links:<br /><a
				target="_blank"
				href="ipfs://bafybeiftcyj7gao3kykwic743wuulwpzkeat4nfmzapbgz5mxsfxsnpbtu/#/explore/{addedWithLinks.cid
					.toV0()
					.toString()}">{addedWithLinks.cid.toV0().toString()}</a
			>

			<br />DWeb Site:<br /><a
				target="_blank"
				href="https://{addedWithLinks.cid.toV1().toString()}.ipfs.dweb.link/">View Data</a
			><br />Mirror:<br />

			<a target="_blank" href="https://{addedWithLinks.cid.toV1().toString()}.ipfs.cf-ipfs.com/"
				>View Mirror Data</a
			><br /><br />
		{/if}
	{:else}
		Loading IPFS...
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}
</style>

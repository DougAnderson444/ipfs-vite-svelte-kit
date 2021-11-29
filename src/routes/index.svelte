<script lang="ts">
	import { onMount } from 'svelte';
	import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string';
	import { UnixFS } from 'ipfs-unixfs';
	import * as dagPb from '@ipld/dag-pb';

	const textEncoder = new TextEncoder();
	const textDecoder = new TextDecoder();

	let nodeId;
	let putted, added, putWithLinks;

	onMount(async () => {
		const IPFSmodule = await import('../modules/ipfs-core/ipfs-core.js');
		const IPFS = IPFSmodule.default;
		console.log({ IPFS });
		const ipfsNode = await IPFS.create();
		console.log({ ipfsNode });
		const identity = await ipfsNode.id();
		nodeId = identity.id;
		console.info('nodeId', nodeId);

		const helloWorld = {
			hello: 'world'
		};

		const file = new UnixFS({
			type: 'file',
			data: uint8ArrayFromString(JSON.stringify(helloWorld)) // new Uint8Array(0) //
		});

		const pbNode = {
			Data: file.marshal(),
			Links: []
		};

		// 1. make a dag-pb dag of a file with a link to another file
		putted = await ipfsNode.dag.put(pbNode, {
			format: 'dag-pb'
		});

		console.log(`https://dweb.link/api/v0/dag/get?arg=${putted.toV0().toString()}`);

		// 2. save the same binary data via ipfs.add
		added = await ipfsNode.add(JSON.stringify(helloWorld));

		console.log(`https://dweb.link/api/v0/dag/get?arg=${added.cid.toV0().toString()}`);

		// 3. check to see if they are the same
		console.log(putted.toV0().toString() === added.cid.toV0().toString());

		// WITH LINK(s)

		const pbNodeWithLinks = {
			Data: file.marshal(),
			Links: [
				{
					Name: 'hello',
					Tsize: pbNode.Data != null ? pbNode.Data.length : 0,
					Hash: putted.toV0()
				}
			]
		};

		putWithLinks = await ipfsNode.dag.put(pbNodeWithLinks, {
			format: 'dag-pb'
		});

		console.log(
			`ipfs://bafybeiftcyj7gao3kykwic743wuulwpzkeat4nfmzapbgz5mxsfxsnpbtu/#/explore/${putWithLinks
				.toV0()
				.toString()}`
		);
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
		{#if putted}ipfs.dag.put(data)<br />{putted.toString()}{/if}<br /><br />
		{#if added}ipfs.add(data)<br />{added.cid.toV0().toString()}{/if}
		<br /><br />
		{#if putWithLinks}Explore IPLD:<br /><a
				target="_blank"
				href="ipfs://bafybeiftcyj7gao3kykwic743wuulwpzkeat4nfmzapbgz5mxsfxsnpbtu/#/explore/{putWithLinks
					.toV0()
					.toString()}">{putWithLinks.toV0().toString()}</a
			>

			<br />DWeb Site:<br /><a
				target="_blank"
				href="https://{putWithLinks.toV1().toString()}.ipfs.dweb.link/">View Data</a
			><br />Mirror:<br />

			<a target="_blank" href="https://{putWithLinks.toV1().toString()}.ipfs.cf-ipfs.com/"
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

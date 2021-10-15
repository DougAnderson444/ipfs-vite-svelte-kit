<script lang="ts">
	import { onMount } from 'svelte';

	let nodeId;

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
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>
		{nodeId}
	</h1>

	<h2>
		IPFS loaded ina Vite app, <strong>right?!</strong>
	</h2>
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

	.welcome {
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>

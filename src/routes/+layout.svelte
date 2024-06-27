<script>
	import 'tailwindcss/tailwind.css';
	import Navbar from '$components/Navbar.svelte';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import { Toaster } from 'svelte-sonner';
	onMount(() => {
		themeChange(false);
	});
	import { page } from '$app/stores';

	let connected = false;
	$: {
		if ($page.data.session) {
			connected = true;
		} else {
			connected = false;
		}
	}
</script>

<svelte:head>
	<title>Metegol</title>
</svelte:head>

<main class="container mx-auto px-2">
	<Navbar {connected} />
	<slot />
	<Toaster />
</main>

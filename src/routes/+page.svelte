<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import axios from 'axios';
	import { onMount } from 'svelte';
	export let data;

	interface Jugador {
		id: number;
		nombre: string;
		jugo: number;
		gano: number;
		eficiencia: number;
	}
	interface RankingPareja {
		pareja: string;
		jugo: number;
		gano: number;
		eficiencia: number;
	}

	let ranking: Jugador[] = [];
	let rankingPareja: RankingPareja[] = [];

	onMount(async () => {
		rankingPareja = (await axios.get('/api/pareja')).data;
		const response = await axios.get('/api/partido');
		if (response.status === 201) {
			ranking = response.data;
			ranking.sort((a, b) => b.eficiencia - a.eficiencia);
		} else {
			alert('Error al obtener el ranking');
		}
	});
</script>

<div class="flex flex-col justify-center items-center">
	<div class="flex flex-row justify-between w-full items-center border-b-2">
		<div>
			<h1 class="text-3xl text-primary font-bold tracking-widest">Metegol</h1>
			<p>{data.session.user.name}</p>
		</div>
		<button class="btn btn-secondary btm-md rounded-full" on:click={() => signOut()}>Logout</button>
	</div>
	<h1 class="text-accent font-bold mt-2 mb-1 text-2xl">Jugadores</h1>
	{#if ranking.length > 0}
		<div class="grid grid-cols-12 justify-between w-full">
			<p class="text-secondary border-b-2 text-xs p-1 col-span-6">Jugador</p>
			<p class="text-secondary border-b-2 text-xs p-1 col-span-2">Jugó</p>
			<p class="text-secondary border-b-2 text-xs p-1 col-span-2">Ganó</p>
			<p class="text-secondary border-b-2 text-xs p-1 col-span-2">Efi</p>
			{#each ranking as item}
				<p class="text-primary font-bold border-b-2 textarea-xs p-1 col-span-6">{item.nombre}</p>
				<p class="text-primary font-bold border-b-2 textarea-xs p-1 col-span-2">{item.jugo}</p>
				<p class="text-primary font-bold border-b-2 textarea-xs p-1 col-span-2">{item.gano}</p>
				<p class="text-primary font-bold border-b-2 textarea-xs p-1 col-span-2">{item.eficiencia}</p>
			{/each}
		</div>
	{/if}
	<h1 class="text-accent font-bold mt-2 mb-1 text-2xl">Parejas</h1>
	{#if rankingPareja.length > 0}
		<div class="grid grid-cols-12 justify-between w-full">
			<p class="text-secondary border-b-2 text-xs p-1 col-span-6">Pareja</p>
			<p class="text-secondary border-b-2 text-xs p-1 col-span-2">Jugó</p>
			<p class="text-secondary border-b-2 text-xs p-1 col-span-2">Ganó</p>
			<p class="text-secondary border-b-2 text-xs p-1 col-span-2">Efi</p>
			{#each rankingPareja as item}
				<p class="text-primary font-bold border-b-2 text-xs p-1 col-span-6">{item.pareja}</p>
				<p class="text-primary font-bold border-b-2 text-xs p-1 col-span-2">{item.jugo}</p>
				<p class="text-primary font-bold border-b-2 text-xs p-1 col-span-2">{item.gano}</p>
				<p class="text-primary font-bold border-b-2 text-xs p-1 col-span-2">{item.eficiencia}</p>
			{/each}
		</div>
	{/if}
	<h1 class="text-accent font-bold mt-2 mb-1 text-2xl">Partidos</h1>
	{#if data.parejas.length > 0}
		<div class="grid grid-cols-11 justify-between w-full">
			<p class="text-secondary border-b-2 text-xs p-1 col-span-4">Ganó 👍</p>
			<p class="text-secondary border-b-2 text-xs p-1 col-span-4">Perdió 👎</p>
			<p class="text-secondary border-b-2 text-xs p-1 col-span-3">Anotó</p>
			{#each data.parejas as item}
				<p class="text-primary font-bold border-b-2 text-xs p-1 col-span-4">{item.gano}</p>
				<p class="text-error border-b-2 text-xs p-1 col-span-4">{item.perdio}</p>
				<p class="text-primary border-b-2 text-xs p-1 col-span-3">{item.usuario}</p>
			{/each}
		</div>
	{/if}
</div>

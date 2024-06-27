<script lang="ts">
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import { toast } from 'svelte-sonner';

	export let data;

	interface Participante {
		id: number;
		nombre: string;
		jugo: boolean;
		gano: boolean;
	}

	let partido: Participante[] = [];

	data.jugadores.map(({ nombre, id }) => {
		partido.push({
			id,
			nombre,
			jugo: false,
			gano: false
		});
	});

	let jugadores = 0;
	let ganadores = 0;
	let errorMessage = '';

	$: {
		jugadores = 0;
		ganadores = 0;
		errorMessage = '';

		partido.forEach((participante) => {
			if (participante.jugo) {
				jugadores++;
				if (participante.gano) {
					ganadores++;
				}
			}
		});

		if (ganadores !== 2) {
			errorMessage = 'Debe haber 2 ganadores.';
		}
		if (jugadores !== 4) {
			errorMessage = 'Debe haber 4 jugadores.';
		}
	}

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		if (errorMessage.length === 0) {
			// Enviar datos al servidor
			const response = await axios.post('/api/partido', partido);
			if (response.status === 201) {
				toast.info('Grabado Correctamente.');
				partido.map((jugador) => {
					jugador.jugo = false;
					jugador.gano = false;
				});
				goto('/armar');
			} else {
				toast.error('Error al grabar.');
			}
		}
	};
</script>

<div class="flex flex-col justify-center items-center">
	{#if partido.length > 0}
		<form on:submit|once={handleSubmit}>
			<div class="flex flex-col justify-center items-center">
				<div class="grid grid-cols-3 gap-x-8 gap-y-2 mb-6">
					<p class="justify-start">Jugadores</p>
					<p>Jugó</p>
					<p>Ganó</p>
				</div>
				<div class="grid grid-cols-3 gap-x-8 gap-y-2">
					{#each partido as item, i}
						<p>{item.nombre}</p>
						<input type="checkbox" bind:checked={partido[i].jugo} class="checkbox checkbox-success mb-4 checkbox-lg" />
						{#if partido[i].jugo}
							<input type="checkbox" bind:checked={partido[i].gano} class="checkbox checkbox-info mb-4 checkbox-lg" />
						{:else}
							<p>--</p>
						{/if}
					{/each}
				</div>

				<button type="submit" disabled={errorMessage.length > 0} class="btn btn-primary w-80 btn-lg mt-4">✔️ Grabar</button>
			</div>
		</form>
	{:else}
		<p class="opacity-70 text-2xl">No hay jugadores</p>
	{/if}
	{#if errorMessage.length > 0}
		<p class="text-error text-xs font-bold mt-4">{errorMessage}</p>
	{/if}
</div>

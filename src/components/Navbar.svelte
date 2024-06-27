<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';

	export let connected: boolean;
</script>

<div class="navbar bg-base-100 text-base-content border-b-2 my-2 justify-between items-center">
	<a href="/" class="btn btn-ghost text-xl">MG</a>
	<ul>
		{#if !connected}
			<li>
				<a class="btn btn-secondary btn-xs mx-1" href="/auth/login">Login</a>
			</li>

			<li>
				<a class="btn btn-secondary btn-xs mx-1" href="/auth/register">Register</a>
			</li>
		{/if}
		{#if connected}
			<!-- 
			<li>
				<button on:click={() => signOut()} class="btn btn-secondary btn-xs mx-1">Logout</button>
			</li> 
			-->
			<li>
				<a class="btn btn-outline btn-xs mx-1" href="/partido">Metegol</a>
			</li>
			<li>
				<a class="btn btn-outline btn-xs mx-1" href="/">Ranking</a>
			</li>
		{/if}
	</ul>
	<select class="select select-secondary select-xs ml-1" data-choose-theme>
		<option value="corporate">Light</option>
		<option value="business">Dark</option>
		<option value="retro">Retro</option>
		<option value="cyberpunk">Cyber</option>
		<option value="dracula">Dracula</option>
	</select>
</div>

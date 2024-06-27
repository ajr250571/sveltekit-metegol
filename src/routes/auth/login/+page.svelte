<script lang="ts">
	import { existeError } from '$lib/utils';
	import TextBox from '$components/TextBox.svelte';
	import { signIn } from '@auth/sveltekit/client';
	import { goto } from '$app/navigation';

	let patternEmail: RegExp = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
	let patternPassword: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=-])[A-Za-z0-9!@#$%^&*()_+=-]{8,}$/;

	let data = {
		email: '',
		password: ''
	};
	let error = {
		email: '',
		password: ''
	};
	const handleSubmit = async () => {
		const { email, password } = data;
		if (!existeError(error)) {
			await signIn('credentials', { email, password, redirect: false });
			goto('/dashboard');

			// toast.warning('Login incorrecto, reintente.');
		}
	};

	$: {
		if (data.email.length === 0 || !patternEmail.test(data.email)) {
			error.email = 'Email requerido y el formato debe ser valido.';
		} else {
			error.email = '';
		}
		if (data.password.length < 8 || !patternPassword.test(data.password)) {
			error.password =
				'La contraseña debe tener al menos 8 caracteres, una letra minúscula, una mayúscula, un número y un carácter especial.';
		} else {
			error.password = '';
		}
	}
</script>

<div class="flex h-[calc(100vh-7rem)] justify-center items-center">
	<div class="card card-compact w-96 bg-base-300 shadow-xl">
		<div class="card-body">
			<h2 class="card-title text-3xl text-primary">Login</h2>
			<form on:submit|preventDefault={handleSubmit}>
				<TextBox type="email" label="Email" bind:value={data.email} error={error.email} required />
				<TextBox type="password" label="Password" bind:value={data.password} error={error.password} required />
				<div class="flex justify-between mt-2 font-semibold">
					<p>No tiene Cuenta?</p>
					<a class="link link-info" href="/auth/register">Register</a>
				</div>
				<div class="card-actions justify-end mt-4">
					<button disabled={existeError(error)} type="submit" class="btn btn-primary">✔️ Login</button>
				</div>
			</form>
		</div>
	</div>
</div>

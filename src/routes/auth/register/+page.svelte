<script lang="ts">
	import { existeError } from '$lib/utils';
	import { toast } from 'svelte-sonner';
	import TextBox from '$components/TextBox.svelte';
	import axios from 'axios';
	import { goto } from '$app/navigation';

	let patternEmail: RegExp = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
	let patternPassword: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=-])[A-Za-z0-9!@#$%^&*()_+=-]{8,}$/;

	let data = {
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	};
	let error = {
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	};

	const handleSubmit = async () => {
		if (!existeError(error)) {
			try {
				await axios.post('/api/auth/register', {
					name: data.name,
					email: data.email,
					password: data.password
				});
				toast.success('Registrado correctamente ...');
				goto('/auth/login');
			} catch (error) {
				console.error(error);
			}
		}
	};

	$: {
		if (data.name.length <= 6) {
			error.name = 'Name debe ser mayor a 6 caracteres.';
		} else {
			error.name = '';
		}
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
		if (data.password !== data.confirmPassword) {
			error.confirmPassword = 'Password debe ser igual a ConfirmPassword';
		} else {
			error.confirmPassword = '';
		}
	}
</script>

<div class="flex h-[calc(100vh-7rem)] justify-center items-center">
	<div class="card card-compact w-96 bg-base-300 shadow-xl">
		<div class="card-body">
			<h2 class="card-title text-3xl text-primary">Register</h2>
			<form on:submit|preventDefault={handleSubmit}>
				<TextBox type="text" label="Name" bind:value={data.name} error={error.name} required />
				<TextBox type="email" label="Email" bind:value={data.email} error={error.email} required />
				<TextBox type="password" label="Password" bind:value={data.password} error={error.password} required />
				<TextBox type="password" label="Confirm Password" bind:value={data.confirmPassword} error={error.confirmPassword} required />
				<div class="flex justify-between mt-2 font-semibold">
					<p>Ya tiene Cuenta?</p>
					<a class="link link-info" href="/auth/login">Login</a>
				</div>
				<div class="card-actions justify-end mt-4">
					<button disabled={existeError(error)} type="submit" class="btn btn-primary">✔️ Register</button>
				</div>
			</form>
		</div>
	</div>
</div>

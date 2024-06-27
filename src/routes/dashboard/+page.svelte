<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1 class="text-2xl text-primary font-bold mb-4">Dashboard Page</h1>
<p>{$page?.data?.session?.user.email}</p>

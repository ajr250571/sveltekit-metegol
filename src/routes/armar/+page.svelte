<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex flex-col justify-center items-center gap-4 mt-10">
	<p class="text-2xl text-error font-bold">Sale: {data.sale}</p>
	<p class="text-2xl text-primary font-bold">pareja 1: {data.pareja1}</p>
	<p class="text-2xl text-primary font-bold">pareja 2: {data.pareja2}</p>
</div>

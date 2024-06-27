<script>
	export let data;
</script>

<h1 class="text-2xl text-primary font-bold mb-4">blog</h1>
<ul>
	{#each data.posts as post}
		<li class="link-hover"><a href="/blog/{post.slug}">{post.title}</a></li>
	{/each}
</ul>

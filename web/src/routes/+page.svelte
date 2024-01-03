<script lang="ts">
	import Loader from '~icons/ph/circle-notch';
	let serverOptions = [
		`vault-hunters@1.18.2`,
		`better-minecraft@1.20.1`
		// `modded@1.20.1`,
		// `vanilla@latest`,
		// `vanilla@1.16`
	];

	let serverSelected: string;
	let code = '';
	let status: undefined | 'success' | 'error' | 'loading';
	let res: Response;
	const startServer = async () => {
		status = 'loading';
		res = await fetch('https://startminecraftserver-ykuqto64rq-uc.a.run.app', {
			method: 'post',
			body: JSON.stringify({
				server_name: serverSelected.split('@')[0]
			}),
			headers: {
				authorization: code
			}
		});
		if (res.status >= 400) {
			status = 'error';
		}
		if (res.status === 200) {
			status = 'success';
		}
	};
</script>

<h1 class="h1">
	<p class="mb-8">mc.mogdan.xyz</p>
</h1>
<div class="py-5 flex w-full gap-2">
	<div>
		<p>select server</p>
		<select id="server-select" class="select" bind:value={serverSelected}>
			{#each serverOptions as question}
				<option selected={question === 'better-minecraft@1.20.1'} value={question}>
					{question}
				</option>
			{/each}
		</select>
	</div>
	<div>
		<p>start code</p>
		<div class="flex gap-2">
			<input class="input" type="text" bind:value={code} placeholder="super-secret-code" />
			<button on:click={startServer} class="btn variant-filled-primary"> start </button>
			{#if status === 'loading'}
				<Loader class="text-white h-8 w-8 self-center animate-spin" />
			{:else}
				<span class="w-8 h-8 self-center" />
			{/if}
		</div>
	</div>
</div>
{#if status === 'success'}
	<div
		id="alert-additional-content-3"
		class="p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
		role="alert"
	>
		<div class="flex items-center">
			<svg
				class="flex-shrink-0 w-4 h-4 me-2"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 20 20"
			>
				<path
					d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
				/>
			</svg>
			<span class="sr-only">success</span>
			<h3 class="text-lg font-medium">{serverSelected} successfully started</h3>
		</div>
		<div class="mt-2 mb-4 text-sm">
			{serverSelected} will now start. See #logs in discord for status. It shouldn't take more than 5
			minutes to boot!
		</div>
	</div>
{:else if status === 'error'}
	<div
		id="alert-additional-content-2"
		class="p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
		role="alert"
	>
		<div class="flex items-center">
			<svg
				class="flex-shrink-0 w-4 h-4 me-2"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 20 20"
			>
				<path
					d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
				/>
			</svg>
			<span class="sr-only">error</span>
			<h3 class="text-lg font-medium">error: {serverSelected} could not be started</h3>
		</div>
		<div class="mt-2 mb-4 text-sm">
			{serverSelected} could not be started. It returned this error:
			<code class="code"
				>{res.status}: {#await res.text() then text}
					{text}
				{/await}</code
			>
		</div>
	</div>
{/if}

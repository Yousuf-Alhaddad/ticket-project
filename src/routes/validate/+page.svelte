<script lang="ts">
	let input = '';
	let message = '';
	let loading = false;

	async function validateTicket() {
		loading = true;
		const res = await fetch('/api/tickets');
		const tickets = res.ok ? await res.json() : [];

		const found = tickets.find(
			(ticket) =>
				ticket.license_plate.toLowerCase() === input.toLowerCase() ||
				String(ticket.id) === input
		);

		message = found
			? `✅ Ticket is validated. Status: ${found.status}, Fine: $${found.fine_amount}`
			: '❌ Ticket not found.';
		loading = false;
	}
</script>

<h1 class="text-2xl font-bold mb-4">🔍 Validate Ticket</h1>

<div class="validate-box">
	<input
		type="text"
		placeholder="Enter License Plate"
		bind:value={input}
		required
	/>
	<button on:click={validateTicket} disabled={loading}>
		{loading ? 'Checking...' : 'Validate'}
	</button>

	{#if message}
		<p class="mt-2 font-medium">{message}</p>
	{/if}
</div>

<style>
	.validate-box {
		display: flex;
		flex-direction: column;
		max-width: 400px;
		margin: auto;
		gap: 1rem;
		background-color: #CAF4FF;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		border: 2px solid #A0DEFF;
	}

	input {
		padding: 0.6rem 1rem;
		font-size: 1rem;
		border-radius: 8px;
		border: 2px solid #A0DEFF;
		background-color: #ffffffcc;
	}

	button {
		padding: 0.6rem 1rem;
		background-color: #dcc5a1;
		color: #fff;
		font-weight: bold;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	button:hover {
		background-color: #5AB2FF;
	}
</style>

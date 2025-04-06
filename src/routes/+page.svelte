<script lang="ts">
	import { onMount } from 'svelte';

	interface Ticket {
		id: number;
		license_plate: string;
		driver_name: string;
		violation_type: string;
		fine_amount: number;
		date_issued: string;
		status: string;
	}

	let tickets: Ticket[] = [];
	let search = '';
	let sortBy = 'date_desc';

	onMount(async () => {
		const res = await fetch('/api/tickets');
		if (res.ok) {
			tickets = await res.json();
		}
	});

	async function deleteTicket(id: number) {
		await fetch(`/api/tickets/${id}`, { method: 'DELETE' });
		tickets = tickets.filter(ticket => ticket.id !== id);
	}

	// Handle payment for a ticket
	async function payTicket(ticket: Ticket) {
		const res = await fetch('/api/checkout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				ticketId: ticket.id,
				amount: ticket.fine_amount,
				description: `${ticket.violation_type} fine for ${ticket.license_plate}`,
			}),
		});

		const data = await res.json();

		if (data.url) {
			// Redirect to Stripe checkout
			window.location.href = data.url;
		} else {
			alert('Failed to start payment');
		}
	}

	// Filter and sort logic
	$: filteredTickets = tickets
		.filter(t => {
			const s = search.toLowerCase();
			return (
				t.license_plate.toLowerCase().includes(s) ||
				t.driver_name.toLowerCase().includes(s) ||
				t.status.toLowerCase() === s
			);
		})
		.sort((a, b) => {
			if (sortBy === 'date_desc') return b.date_issued.localeCompare(a.date_issued);
			if (sortBy === 'date_asc') return a.date_issued.localeCompare(b.date_issued);
			if (sortBy === 'fine_desc') return b.fine_amount - a.fine_amount;
			if (sortBy === 'fine_asc') return a.fine_amount - b.fine_amount;
			return 0;
		});
</script>

<h1 class="text-2xl font-bold mb-4">🎟️ Tickets</h1>

<!-- Filter & Sort Controls -->
<div class="controls flex flex-col sm:flex-row gap-2 mb-4 w-full">
	<input
		type="text"
		placeholder="Search license, driver, or status"
		bind:value={search}
		class="flex-1 min-w-0 px-4 py-2 border border-gray-300 rounded shadow-sm"
	/>

	<select
		bind:value={sortBy}
		class="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded shadow-sm"
	>
		<option value="date_desc">📅 Date ↓</option>
		<option value="date_asc">📅 Date ↑</option>
		<option value="fine_desc">💰 Fine ↓</option>
		<option value="fine_asc">💰 Fine ↑</option>
	</select>
</div>

<!-- Ticket List -->
<ul>
	{#each filteredTickets as ticket}
		<li>
			<strong>{ticket.license_plate}</strong> - {ticket.driver_name} - {ticket.violation_type} - ${ticket.fine_amount}
			<br />
			<small>{ticket.date_issued} | <strong>Status:</strong> {ticket.status}</small>
			<br />
			<div style="margin-top: 0.5rem;">
				<a href={`/edit/${ticket.id}`}>✏️ Edit</a>
				<button on:click={() => deleteTicket(ticket.id)}>🗑️ Delete</button>
				{#if ticket.status.toLowerCase() !== 'paid'}
					<button on:click={() => payTicket(ticket)}>💳 Pay</button>
				{/if}
</div>
		</li>
	{/each}
</ul>

<style>
	.controls {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	input,
	select {
		padding: 0.5rem;
		font-size: 1rem;
	}

	ul {
		list-style: none;
		padding: 0;
	}

	li {
		margin-bottom: 1rem;
		padding: 1rem;
		background-color: #ffffff8e;
		border-radius: 10px;
		border: 2px solid #5e5d5d;
		box-shadow: 0 2px 4px rgb(255, 123, 123);
		color: #333;
	}

	li strong {
		color: #000000;
	}

	button,
	a {
		margin-right: 0.5rem;
		padding: 0.4rem 0.8rem;
		border: none;
		background-color: #dcc5a1;
		color: #fff;
		border-radius: 6px;
		cursor: pointer;
		transition: background-color 0.2s;
		text-decoration: none;
		font-weight: bold;
	}

	button:hover,
	a:hover {
		background-color: #5AB2FF;
	}
</style>
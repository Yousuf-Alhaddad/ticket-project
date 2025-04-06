<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';

	let id = 0;
	let license_plate = '';
	let driver_name = '';
	let violation_type = '';
	let fine_amount = 0;
	let date_issued = '';
	let status = '';

	onMount(async () => {
		const currentPage = get(page);
		id = Number(currentPage.params?.id);

		if (id) {
			const res = await fetch(`/api/tickets/${id}`);
			if (res.ok) {
				const data = await res.json();
				license_plate = data.license_plate;
				driver_name = data.driver_name;
				violation_type = data.violation_type;
				fine_amount = data.fine_amount;
				date_issued = data.date_issued;
				status = data.status;
			}
		}
	});

	async function updateTicket() {
		await fetch(`/api/tickets/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ license_plate, driver_name, violation_type, fine_amount, date_issued, status })
		});

		window.location.href = '/';
	}
</script>

<h1 class="text-2xl font-bold mb-4">✏️ Edit Ticket</h1>

<form on:submit|preventDefault={updateTicket} class="flex flex-col gap-4 max-w-md bg-[#ffffffc9] p-6 rounded-lg border-2 border-[#5e5d5d] shadow-md">
	<input bind:value={license_plate} placeholder="License Plate" required class="input" />
	<input bind:value={driver_name} placeholder="Driver Name" required class="input" />
	<input bind:value={violation_type} placeholder="Violation Type" required class="input" />
	<input type="number" bind:value={fine_amount} placeholder="Fine Amount" required class="input" />
	<input type="date" bind:value={date_issued} required class="input" />

	<select bind:value={status} class="input">
		<option value="Unpaid">Unpaid</option>
		<option value="Paid">Paid</option>
	</select>

	<button type="submit" class="btn">Update Ticket</button>
</form>

<style>
	h1 {
		color: #333;
	}

	form {
		background-color: #FFF9D0;
	}

	.input {
		padding: 0.75rem;
		border: 1px solid #ccc;
		border-radius: 8px;
		font-size: 1rem;
		background-color: #CAF4FF;
		color: #333;
	}

	.input:focus {
		outline: none;
		border-color: #5AB2FF;
		box-shadow: 0 0 0 2px #A0DEFF;
	}

	.btn {
		padding: 0.6rem 1.2rem;
		background-color: #A0DEFF;
		color: #fff;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		font-weight: bold;
		transition: background-color 0.3s;
	}

	.btn:hover {
		background-color: #5AB2FF;
	}
</style>

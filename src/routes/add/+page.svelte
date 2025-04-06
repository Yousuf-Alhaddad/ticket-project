<script lang="ts">
    let license_plate = '';
    let driver_name = '';
    let violation_type = '';
    let fine_amount = 0;
    let date_issued = '';
  
    async function submitForm() {
      await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ license_plate, driver_name, violation_type, fine_amount, date_issued, status: 'Unpaid' })
      });
  
      window.location.href = '/'; // Redirect after submission
    }
  </script>
  
  <h1>Add Ticket</h1>
  <form on:submit|preventDefault={submitForm}>
    <input bind:value={license_plate} placeholder="License Plate" required />
    <input bind:value={driver_name} placeholder="Driver Name" required />
    <input bind:value={violation_type} placeholder="Violation Type" required />
    <input type="number" bind:value={fine_amount} placeholder="Fine Amount" required />
    <input type="date" bind:value={date_issued} required />
    <button type="submit">Add Ticket</button>
  </form>
  
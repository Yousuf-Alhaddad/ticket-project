<script>
    import { onMount } from 'svelte';
    let paymentStatus = '';

    onMount(() => {
        if (typeof window !== 'undefined') {
            // Only access window when we're on the client side
            const queryParams = new URLSearchParams(window.location.search);
            paymentStatus = queryParams.get('status') || ''; // Default to empty if no status
        }
    });
</script>

<h1>Payment Status</h1>

{#if paymentStatus === 'success'}
    <p>Your payment was successful! Thank you for your payment.</p>
{:else if paymentStatus === 'cancel'}
    <p>Your payment was canceled. Please try again.</p>
{:else}
    <p>We couldn't retrieve your payment status. Please try again.</p>
{/if}

<style>
    h1 {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 1rem;
    }

    p {
        font-size: 1.25rem;
    }
</style>
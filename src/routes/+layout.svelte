<style>
	:global(body) {
		background-color: #ffffffb1;
		color: #000000;
		margin: 0;
		font-family: system-ui, sans-serif;
	}

	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #f25446;
		padding: 1rem 2rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.nav-links {
		display: flex;
		gap: 1rem;
	}

	a {
		padding: 0.5rem 1rem;
		text-decoration: none;
		color: rgb(255, 255, 255);
		background-color: #dcc5a1;
		border-radius: 6px;
		transition: background-color 0.2s ease;
		font-weight: bold;
	}

	a:hover {
		background-color: #5AB2FF;
	}
</style>

<nav>
	<h1>🚦 Traffic Ticket Management System</h1>
	<div class="nav-links">
		<a href="/">🏠 Home</a>
		<a href="/add">➕ Add Ticket</a>
    <a href="/validate">Validate Ticket</a>
	</div>
</nav>

<slot />

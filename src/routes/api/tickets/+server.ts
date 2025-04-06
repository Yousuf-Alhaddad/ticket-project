import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { ticket } from '$lib/server/db/schema';
import type { RequestEvent } from '@sveltejs/kit'; // Type-only import

export const POST = async ({ request }: RequestEvent) => {
    try {
      const { license_plate, driver_name, violation_type, fine_amount, date_issued, status } = await request.json();
  
      const newTicket = await db.insert(ticket).values({
        license_plate,
        driver_name,
        violation_type,
        fine_amount,
        date_issued,
        status,
      });
  
      return json(newTicket); // Respond with the created ticket data
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      return json({ error: message }, { status: 500 });
    }
  };
  

  export const GET = async () => {
    try {
      const tickets = await db.select().from(ticket);
      return json(tickets);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      return json({ error: message }, { status: 500 });
    }
  };
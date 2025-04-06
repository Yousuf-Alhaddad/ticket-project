import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { ticket } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { RequestEvent } from '@sveltejs/kit';

export const PUT = async ({ request, params }: RequestEvent) => {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return json({ error: 'Invalid ticket ID' }, { status: 400 });
    }

    const data = await request.json();

    await db
      .update(ticket)
      .set({
        license_plate: data.license_plate,
        driver_name: data.driver_name,
        violation_type: data.violation_type,
        fine_amount: data.fine_amount,
        date_issued: data.date_issued,
        status: data.status
      })
      .where(eq(ticket.id, id));

    return json({ message: 'Ticket updated successfully' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return json({ error: message }, { status: 500 });
  }
};

export const DELETE = async ({ params }: RequestEvent) => {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return json({ error: 'Invalid ticket ID' }, { status: 400 });
    }

    await db.delete(ticket).where(eq(ticket.id, id));

    return json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return json({ error: message }, { status: 500 });
  }
};

import { pgTable, serial, text, integer, date } from 'drizzle-orm/pg-core';

export const ticket = pgTable('ticket', {
  id: serial('id').primaryKey(), // Ticket ID
  license_plate: text('license_plate').notNull(), // Vehicle license plate
  driver_name: text('driver_name').notNull(), // Driver's name
  violation_type: text('violation_type').notNull(), // Violation type (speeding, etc.)
  fine_amount: integer('fine_amount').notNull(), // Fine amount
  date_issued: date('date_issued').notNull(), // Date ticket was issued
  status: text('status').notNull().default('Unpaid') // Status of the ticket (Paid/Unpaid)
});

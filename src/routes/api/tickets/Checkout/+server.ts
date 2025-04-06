import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';
import { PUBLIC_BASE_URL } from '$env/static/public';

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2025-03-31.basil',
});

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Ticket Payment',
            },
            unit_amount: 200000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${PUBLIC_BASE_URL}/payment?status=success`,
      cancel_url: `${PUBLIC_BASE_URL}/payment?status=cancel`,
    });

    return json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return json({ error: 'Failed to create Stripe Checkout session' }, { status: 500 });
  }
}
import { NextApiResponse } from 'next';
import Stripe from 'stripe';
import { stripe } from '../config/config';




export async function POST(req) {
  
    try {
        const { items } = await req.json();
        // return Response.json({data:items});
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items:
                items.map((item: any) => ({


                    price: item.product_ref,
                    quantity: item.quantity,
                }))
            ,
            mode: 'payment',
            ui_mode: 'embedded',

            return_url: 'http://localhost:3000/checkout?session_id={CHECKOUT_SESSION_ID}',
        });

        return Response.json({ clientSecret: session.client_secret });
    } catch (error) {
        return Response.json({ error: error.message });
    }


}
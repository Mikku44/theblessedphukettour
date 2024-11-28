import { NextApiResponse } from 'next';
import Stripe from 'stripe';
import { stripe } from '../config/config';




export async function POST(req) {
    const base_url = process.env.base_url
    try {
        const { items } = await req.json();
        // return Response.json({data:items});
        console.log(items)
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

            return_url: base_url + 'checkout?session_id={CHECKOUT_SESSION_ID}',
        });

        return Response.json({ clientSecret: session.client_secret });
    } catch (error) {
        console.log(error);
        return Response.json({ error: error.message });
    }


}
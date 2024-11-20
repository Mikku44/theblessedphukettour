import { NextApiResponse } from 'next';
import Stripe from 'stripe';


const stripe = new Stripe(process.env.NEXT_PUBLIC_secret_stripe);

export async function POST(req) {

    try {
        const { items } = await req.json();
        // return Response.json({data:items});
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items:
                items.map((item: any) => ({
                    // Provide the exact Price ID (for example, pr_1234) of
                    // the product you want to sell

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
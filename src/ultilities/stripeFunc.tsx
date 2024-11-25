import { stripe } from "../app/api/config/config";

export async function GetPrices(product_id:string){
  
    const prices = await stripe.prices.list({
        product: product_id,
        active: true,
        limit: 100,

      });
    console.log("prices : ",prices);
    return prices;
}
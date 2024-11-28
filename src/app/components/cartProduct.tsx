

import { useContext } from "react";
import { CartContext, getProductData } from "./cartContext";

import { Trash } from "lucide-react";
import { Button } from "@nextui-org/button";


function CartProduct(props) {
    const cart = useContext(CartContext);
    const id = props.id;
    const quantity = props.quantity;
    const productData = getProductData(id);

    return (
        <>
            {/* <h3>{productData.title}</h3>
            <p>{quantity} total</p>
            <p>${(quantity * productData.price).toFixed(2)}</p>
            <Button size="sm" onClick={() => cart.deleteFromCart(id)}>Remove</Button> */}
           

            <div className="flex justify-between items-center mb-2 px-1 py-2">
                <div className="flex gap-3 items-center">
                    {/* <div className="rounded-lg size-20 overflow-hidden">
                        <img className="h-full object-cover" src={productData?.image || productData?.photoURL || "https://images.unsplash.com/photo-1731570225640-7ddad4231679?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="" />
                    </div> */}
                    <div className="grid">
                        <div className="text-xl font-semibold"> {productData?.title}</div>
                        <div className="text-sm">x{quantity}</div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="">฿ <span className="font-bold text-xl">{(quantity * productData?.price).toFixed(2)}</span></div>
                    <Button variant="light" isIconOnly={true}  onClick={() => cart.deleteFromCart(id)}><Trash size={'15'}/></Button>
                </div>
            </div>
            <hr></hr>
        </>
    )
}

export default CartProduct;
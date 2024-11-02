import cartAPI from "../apis/cartAPI";
import * as Burnt from "burnt";
interface Props{
    id_user?:any,
    product_quantity?:number,
    cart_subtotal?:number,
    id_product?:any

}

export const useAxiosAddCart=async(props:Props)=>{
    const {id_user, product_quantity, cart_subtotal, id_product}= props
    try {
        const res = await cartAPI.HandleCart('/add-product-cart', {
            id_user, id_product, product_quantity, cart_subtotal
        }, 'post');
        if (res) {
            toast('Thêm vào giỏ hàng thành công')
        }
    } catch (error) {
        console.error("Lỗi thêm giỏ hàng: ", error);
        toast('Lỗi thêm vào giỏ hàng')
    }
}
const toast =async(title:any)=>{
    Burnt.toast({
        title: title,
        
    });
}
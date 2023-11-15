import { useSelector, useDispatch } from "react-redux";
import { shopping_cart } from "../utils/images";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/helpers";
import {
  getAllCarts,
  removeFromCart,
  toggleCartQty,
  clearCart,
} from "../store/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const carts = useSelector(getAllCarts);
  const { itemsCount, totalAmount } = useSelector((state) => state.cart);

  if (carts.length === 0) {
    return (
      <div className="font-roboto">
        <div className="flex flex-col items-center justify-center my-32 space-y-4">
          <img src={shopping_cart} alt="" className="w-32" />
          <span className="text-gray-400">Keranjang Anda Kosong</span>
          <Link
            to="/"
            className="bg-primary h-12 w-48 text-sm p-4 text-white flex items-center justify-center rounded-sm">
            Belanja Sekarang
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-[450px]">
      <div className="font-roboto">
        <div className="h-10 bg-primarybg shadow-xl flex items-center justify-center">
          <div className="w-20">No.</div>
          <div className="w-[400px]">Produk</div>
          <div className="w-44">Harga</div>
          <div className="w-44">Kuantitas</div>
          <div className="w-44">Total Harga</div>
          <div className="w-44">Actions</div>
        </div>
        <div className="bg-primarybg shadow-xl items-center justify-center mt-4">
          {carts.map((cart, idx) => {
            return (
              <div className="flex p-2" key={cart?.id}>
                <div className="w-20">{idx + 1}</div>
                <div className="w-[400px] capitalize">{cart?.title}</div>
                <div className="w-44">{formatPrice(cart?.discountedPrice)}</div>
                <div className="w-44">
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="flex items-center justify-center w-[28px] h-[28px] text-[13px] border border-gray-300"
                      onClick={() =>
                        dispatch(toggleCartQty({ id: cart?.id, type: "DEC" }))
                      }>
                      <i className="fas fa-minus"></i>
                    </button>
                    <div className="flex items-center justify-center w-[45px] h-[28px] border-t border-b border-gray-300">
                      {cart?.quantity}
                    </div>
                    <button
                      type="button"
                      className="flex items-center justify-center w-[28px] h-[28px] text-[13px] border border-gray-300"
                      onClick={() =>
                        dispatch(toggleCartQty({ id: cart?.id, type: "INC" }))
                      }>
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
                <div className="w-44 text-primary font-medium">
                  {formatPrice(cart?.totalPrice)}
                </div>
                <div className="w-44">
                  <button
                    type="button"
                    className=""
                    onClick={() => dispatch(removeFromCart(cart?.id))}>
                    Hapus
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-between bg-primarybg shadow-xl mt-10 p-4">
        <div>
          <button
            type="button"
            className="bg-primary p-2 w-[180px] flex items-center justify-center text-white rounded-sm"
            onClick={() => dispatch(clearCart())}>
            <i className="fas fa-trash"></i>
            <span className="mx-1">Hapus Keranjang</span>
          </button>
        </div>
        <div>
          <div className="flex items-center mb-4 space-x-2">
            <div>Total ({itemsCount}) items:</div>
            <span className="text-primary font-medium text-xl">
              {formatPrice(totalAmount)}
            </span>
          </div>
          <button
            type="button"
            className="bg-primary p-2 w-[150px] flex items-center justify-center text-white rounded-sm">
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

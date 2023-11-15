import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncProductSingle,
  getProductSingle,
  getSingleProductStatus,
} from "../store/productSlice";
import { STATUS } from "../utils/status";
import Loader from "../components/Loader";
import { formatPrice } from "../utils/helpers";
import {
  addToCart,
  getCartMessageStatus,
  setCartMessageOff,
  setCartMessageOn,
} from "../store/cartSlice";
import CartMessage from "../components/CartMessage";

const ProductSinglePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(getProductSingle);
  const productSingleStatus = useSelector(getSingleProductStatus);
  const [quantity, setQuantity] = useState(1);
  const cartMessageStatus = useSelector(getCartMessageStatus);

  useEffect(() => {
    dispatch(fetchAsyncProductSingle(id));

    if (cartMessageStatus) {
      setTimeout(() => {
        dispatch(setCartMessageOff());
      }, 2000);
    }
  }, [cartMessageStatus, dispatch, id]);

  let discountedPrice =
    product?.price - product?.price * (product?.discountPercentage / 100);
  if (productSingleStatus === STATUS.LOADING) {
    return <Loader />;
  }

  const increaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty + 1;
      if (tempQty > product?.stock) tempQty = product?.stock;
      return tempQty;
    });
  };

  const decreaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty - 1;
      if (tempQty < 1) tempQty = 1;
      return tempQty;
    });
  };

  const addToCartHandler = (product) => {
    let discountedPrice =
      product?.price - product?.price * (product?.discountPercentage / 100);
    let totalPrice = quantity * discountedPrice;

    dispatch(
      addToCart({ ...product, quantity: quantity, totalPrice, discountedPrice })
    );
    dispatch(setCartMessageOn(true));
  };

  return (
    <main className="p-8">
      <div>
        <div>
          <div className="flex">
            <div className="w-1/2 mr-10">
              <div>
                <div className="h-[380px] mb-4">
                  <img
                    src={
                      product ? (product.images ? product.images[0] : "") : ""
                    }
                    alt=""
                    className="object-cover h-full w-full rounded-lg"
                  />
                </div>
                <div className="flex space-x-2">
                  <div className="w-1/4 h-28 transform transition-transform hover:scale-110">
                    <img
                      src={
                        product ? (product.images ? product.images[1] : "") : ""
                      }
                      alt=""
                      className="object-cover w-full h-full rounded"
                    />
                  </div>
                  <div className="w-1/4 h-28 transform transition-transform hover:scale-110">
                    <img
                      src={
                        product ? (product.images ? product.images[2] : "") : ""
                      }
                      alt=""
                      className="object-cover h-full w-full rounded"
                    />
                  </div>
                  <div className="w-1/4 h-28 transform transition-transform hover:scale-110">
                    <img
                      src={
                        product ? (product.images ? product.images[3] : "") : ""
                      }
                      alt=""
                      className="object-cover h-full w-full rounded"
                    />
                  </div>
                  <div className="w-1/4 h-28 transform transition-transform hover:scale-110">
                    <img
                      src={
                        product ? (product.images ? product.images[4] : "") : ""
                      }
                      alt=""
                      className="object-cover h-full w-full rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="font-roboto">
                <div className="text-xl font-medium mb-4 capitalize">
                  {product?.title}
                </div>
                <div>
                  <p className="font-light mb-2">{product?.description}</p>
                </div>
                <div className="flex items-center space-x-4 font-medium mb-8">
                  <div>
                    <span className="text-primary">Rating: </span>
                    <span>{product?.rating}</span>
                  </div>
                  <hr className="border-r border-primary border-[2px] h-5" />
                  <div>
                    <span className="text-primary">Merk: </span>
                    <span>{product?.brand}</span>
                  </div>
                  <hr className="border-r border-primary border-[2px] h-5" />
                  <div>
                    <span className="text-primary">Kategori: </span>
                    <span className="capitalize">
                      {product?.category
                        ? product.category.replace("-", " ")
                        : ""}
                    </span>
                  </div>
                </div>
                <div className="pl-8 mb-8">
                  <div className="flex items-center space-x-2">
                    <div className="text-gray-500 text-lg line-through">
                      {formatPrice(product?.price)}
                    </div>
                    <span>Sudah termasuk pajak</span>
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="text-primary text-2xl font-semibold">
                      {formatPrice(discountedPrice)}
                    </div>
                    <div className="bg-primary px-2 rounded-sm text-sm text-white">
                      {product?.discountPercentage}% OFF
                    </div>
                  </div>
                </div>
                <div className="flex items-center font-roboto mb-6">
                  <div className="font-light">Kuantitas:</div>
                  <div className="flex items-center mx-3">
                    <button
                      type="button"
                      className="flex items-center justify-center w-[28px] h-[28px] text-[13px] border border-gray-300"
                      onClick={() => decreaseQty()}>
                      <i className="fas fa-minus"></i>
                    </button>
                    <div className="flex items-center justify-center w-[45px] h-[28px] border-t border-b border-gray-300">
                      {quantity}
                    </div>
                    <button
                      type="button"
                      className="flex items-center justify-center w-[28px] h-[28px] text-[13px] border border-gray-300"
                      onClick={() => increaseQty()}>
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                  {product?.stock === 0 ? (
                    <div className="uppercase bg-red-500 text-white mx-2 py-[2px] px-[6px] rounded-sm">
                      Stok Habis
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="font-roboto space-x-4 flex items-center">
                  <button
                    type="button"
                    className="bg-white h-12 w-48 text-sm p-4 space-x-2 border border-primary text-primary flex items-center justify-center">
                    <i className="fas fa-shopping-cart"></i>
                    <span
                      onClick={() => {
                        addToCartHandler(product);
                      }}>
                      Masukkan Keranjang
                    </span>
                  </button>
                  <button
                    type="button"
                    className="bg-primary h-12 w-48 text-sm p-4 text-white flex items-center justify-center">
                    <span className="btn-text">Beli Sekarang</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {cartMessageStatus && <CartMessage />}
    </main>
  );
};

export default ProductSinglePage;

import HeaderSlicer from "../components/HeaderSlicer";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "../store/categorySlice";
import ProductList from "../components/ProductList";
import {
  fetchAsyncProducts,
  getAllProducts,
  getAllProductsStatus,
} from "../store/productSlice";
import Loader from "../components/Loader";
import { STATUS } from "../utils/status";

const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);

  useEffect(() => {
    dispatch(fetchAsyncProducts(50));
  }, [dispatch]);

  const products = useSelector(getAllProducts);
  const productStatus = useSelector(getAllProductsStatus);

  const tempProducts = [];
  if (products.length > 0) {
    for (let i in products) {
      let randomIndex = Math.floor(Math.random() * products.length);

      while (tempProducts.includes(products[randomIndex])) {
        randomIndex = Math.floor(Math.random() * products.length);
      }
      tempProducts[i] = products[randomIndex];
    }
  }

  let catProductsOne = products.filter(
    (product) => product.category === categories[0]
  );
  let catProductsTwo = products.filter(
    (product) => product.category === categories[1]
  );
  let catProductsThree = products.filter(
    (product) => product.category === categories[2]
  );
  let catProductsFour = products.filter(
    (product) => product.category === categories[3]
  );

  return (
    <main>
      <div>
        <HeaderSlicer />
      </div>
      <div>
        <div className="flex items-center justify-center">
          <div className="mt-8 px-9">
            <div className="flex items-center h-12 bg-primarybg shadow-lg border-l-4 border-primary px-6 py-4 mb-4">
              <h1 className="font-roboto text-base text-gray-400">
                Lihat Produk Kami
              </h1>
            </div>
            {productStatus === STATUS.LOADING ? (
              <Loader />
            ) : (
              <ProductList products={tempProducts} />
            )}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="mt-8 px-9">
            <div className="flex items-center h-12 bg-primarybg shadow-lg border-l-4 border-primary px-6 py-4 mb-4">
              <h1 className="font-roboto text-base text-gray-400 capitalize">
                {categories[0]}
              </h1>
            </div>
            {productStatus === STATUS.LOADING ? (
              <Loader />
            ) : (
              <ProductList products={catProductsOne} />
            )}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="mt-8 px-9">
            <div className="flex items-center h-12 bg-primarybg shadow-lg border-l-4 border-primary px-6 py-4 mb-4">
              <h1 className="font-roboto text-base text-gray-400 capitalize">
                {categories[1]}
              </h1>
            </div>
            {productStatus === STATUS.LOADING ? (
              <Loader />
            ) : (
              <ProductList products={catProductsTwo} />
            )}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="mt-8 px-9">
            <div className="flex items-center h-12 bg-primarybg shadow-lg border-l-4 border-primary px-6 py-4 mb-4">
              <h1 className="font-roboto text-base text-gray-400 capitalize">
                {categories[2]}
              </h1>
            </div>
            {productStatus === STATUS.LOADING ? (
              <Loader />
            ) : (
              <ProductList products={catProductsThree} />
            )}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="mt-8 px-9">
            <div className="flex items-center h-12 bg-primarybg shadow-lg border-l-4 border-primary px-6 py-4 mb-4">
              <h1 className="font-roboto text-base text-gray-400 capitalize">
                {categories[3]}
              </h1>
            </div>
            {productStatus === STATUS.LOADING ? (
              <Loader />
            ) : (
              <ProductList products={catProductsFour} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;

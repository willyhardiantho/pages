import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { STATUS } from "../utils/status";
import Loader from "../components/Loader";
import ProductList from "../components/ProductList";
import {
  fetchAsyncSearchProduct,
  getSearchProducts,
  getSearchProductsStatus,
  clearSearch,
} from "../store/searchSlice";

const SearchPage = () => {
  const dispatch = useDispatch();
  const { searchTerm } = useParams();
  const searchProducts = useSelector(getSearchProducts);
  const searchProductsStatus = useSelector(getSearchProductsStatus);

  useEffect(() => {
    dispatch(clearSearch());
    dispatch(fetchAsyncSearchProduct(searchTerm));
  }, [dispatch, searchTerm]);

  if (searchProducts.length === 0) {
    return (
      <div className="h-[360px] flex items-center justify-center">
        <h1 className="text-2xl text-red-600 font-roboto font-bold">
          Produk tidak ditemukan.
        </h1>
      </div>
    );
  }

  return (
    <main>
      <div>
        <div className="flex items-center">
          <div className="mt-8 px-9">
            <div className="flex items-center h-12 bg-primarybg shadow-lg border-l-4 border-primary px-6 py-4 mb-4">
              <h1 className="font-roboto text-base text-gray-400">
                Search results:
              </h1>
            </div>
            <br />
            {searchProductsStatus === STATUS.LOADING ? (
              <Loader />
            ) : (
              <ProductList products={searchProducts} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SearchPage;

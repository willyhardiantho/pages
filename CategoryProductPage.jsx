import { useEffect } from "react";
import ProductList from "../components/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getAllProductsByCategory,
  fetchAsyncProductsOfCategory,
  getCategoryProductsStatus,
} from "../store/categorySlice";
import Loader from "../components/Loader";
import { STATUS } from "../utils/status";

const CategoryProductPage = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const categoryProducts = useSelector(getAllProductsByCategory);
  const categoryProductsStatus = useSelector(getCategoryProductsStatus);

  useEffect(() => {
    dispatch(fetchAsyncProductsOfCategory(category));
  }, [dispatch, category]);

  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="mt-8 px-9">
          <div className="flex items-center h-12 bg-primarybg shadow-lg border-l-4 border-primary px-6 py-4 mb-4">
            <h1 className="font-roboto text-base text-gray-400">
              Lihat{" "}
              <span className="capitalize">{category.replace("-", " ")}</span>{" "}
              Kami
            </h1>
          </div>

          {categoryProductsStatus === STATUS.LOADING ? (
            <Loader />
          ) : (
            <ProductList products={categoryProducts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProductPage;

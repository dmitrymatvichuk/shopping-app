import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  fetchCategories,
} from "../../redux/slices/productSlice";
import { RootState, AppDispatch } from "../../redux/store";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { Loader } from "../../components/Loader";
import { NoResults } from "../../components/NoResults";

import "./ProductsPage.scss";
import { ProductsList } from "../../components/ProductsList";

export const ProductsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, categories, status, error } = useSelector(
    (state: RootState) => state.products
  );
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("ascending");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value);
  };

  const handleSortOrderChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortOrder(event.target.value);
  };

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((product) => product.category === category);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "ascending") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  return (
    <div className="ProductsPage">
      <div className="container container--with-min-height">
        <div className="ProductsPage__content">
          <div className="ProductsPage__section">
            <Breadcrumbs />
          </div>

          <div className="ProductsPage__section">
            <h1 className="ProductsPage__title">Our Products</h1>
            <p className="ProductsPage__amount">
              {`${sortedProducts.length} model${
                sortedProducts.length !== 1 ? "s" : ""
              }`}
            </p>
          </div>

          <div className="ProductsPage__section ProductsPage__category-filter">
            <label className="ProductsPage__category-label">Category: </label>
            <select
              className="ProductsPage__category-select"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="all">All</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <label className="ProductsPage__sort-label">Sort by price: </label>
            <select
              className="ProductsPage__sort-select"
              value={sortOrder}
              onChange={handleSortOrderChange}
            >
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </select>
          </div>

          {error ? (
            <h2 className="ProductsPage__error-title">Something went wrong</h2>
          ) : (
            <div className="ProductsPage__section">
              {status === "loading" && <Loader />}

              {status === "succeeded" && (
                <>
                  {sortedProducts.length === 0 ? (
                    <NoResults category={category} />
                  ) : (
                    <ProductsList products={sortedProducts} />
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

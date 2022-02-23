import ProductsGrid from "../../components/ProductsGrid/ProductsGrid.component";
import ProductCategories from "../../components/ProductCategories/ProductCategories.component";

function ProductList() {
  return (
    <>
      <div className="content-container aside-layout">
        <aside>
          <ProductCategories location="product-list" />
        </aside>
        <section>
          <ProductsGrid />
        </section>
      </div>
    </>
  );
}

export default ProductList;

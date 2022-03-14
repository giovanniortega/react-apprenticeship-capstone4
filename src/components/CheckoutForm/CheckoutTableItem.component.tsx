import { productToCartType } from "../../types/types";

interface CheckoutFormPropsType {
  dataItem: productToCartType;
}

const CheckoutTableItem = ({ dataItem }: CheckoutFormPropsType) => {
  return (
    <tr>
      <td align="center">{dataItem.productsAmount}</td>
      <td>{dataItem.productData.data.name}</td>
      <td align="right">
        <sup>$</sup>
        {dataItem.productData.data.price}
      </td>
      <td align="right">
        <sup>$</sup>
        {dataItem.productTotalPrice}
      </td>
    </tr>
  );
};

export default CheckoutTableItem;

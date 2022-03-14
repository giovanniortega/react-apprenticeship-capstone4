import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckoutTableItem from "./CheckoutTableItem.component";
import { StoreContext } from "../../store/StoreContext";
import useInput from "../../utils/hooks/useInput";
import classes from "./CheckoutForm.module.scss";

function CheckoutForm() {
  const { store, dispatch } = useContext(StoreContext);
  const { cartList } = store;
  const [totalOrder, setTotalOrder] = useState(0);
  const navigate = useNavigate();

  const {
    value: nameInput,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameInputChangeHandler,
    blurInputHandler: nameInputBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: emailInput,
    isValid: emailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailInputChangeHandler,
    blurInputHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  const {
    value: zipInput,
    isValid: zipIsValid,
    hasError: zipInputHasError,
    valueChangeHandler: zipInputChangeHandler,
    blurInputHandler: zipInputBlurHandler,
    reset: resetZipInput,
  } = useInput(
    (value) => value.toString().length <= 6 && value.toString().length > 1
  );

  const {
    value: notesInput,
    reset: resetNotesInput,
    valueChangeHandler: notesInputChangeHandler,
  } = useInput(() => false);

  const submitOrder = (evt: any) => {
    evt.preventDefault();
    alert(`Thank you ' ${nameInput}, your order will arrive very soon!`);
    resetNameInput();
    resetEmailInput();
    resetZipInput();
    resetNotesInput();
    window.localStorage.setItem("FurnituresSiteCart", JSON.stringify([]));
    dispatch({ type: "setCartList", payload: [] });
    navigate("/");
  };

  let formIsValid = false;

  if (emailIsValid && enteredNameIsValid && zipIsValid) {
    formIsValid = true;
  }

  useEffect(() => {
    let updatedTotalOrder = 0;

    cartList.forEach((product) => {
      updatedTotalOrder = updatedTotalOrder + product.productTotalPrice;
      setTotalOrder(+updatedTotalOrder.toFixed(2));
    });
  }, [cartList]);

  console.log("cartList", cartList);
  return (
    <form className={classes["checkout-form"]} onSubmit={submitOrder}>
      <div className={classes["form-summary"]}>
        <div
          className={`${classes["form-control"]} ${
            nameInputHasError && classes["invalid"]
          }`}
        >
          <label htmlFor="checkout-name-input">
            Name<sup>*</sup>
          </label>
          <input
            type="input"
            name="checkout-name-input"
            id="checkout-name-input"
            value={nameInput}
            onChange={nameInputChangeHandler}
            onBlur={nameInputBlurHandler}
          />
          {nameInputHasError && (
            <p className={classes["error-text"]}>
              Customer name must not be empty!
            </p>
          )}
        </div>
        <div
          className={`${classes["form-control"]} ${
            emailInputHasError && classes["invalid"]
          }`}
        >
          <label htmlFor="checkout-email-input">
            Email<sup>*</sup>
          </label>
          <input
            type="input"
            name="checkout-email-input"
            id="checkout-email-input"
            value={emailInput}
            onChange={emailInputChangeHandler}
            onBlur={emailInputBlurHandler}
          />
          {emailInputHasError && (
            <p className={classes["error-text"]}>
              Please insert a valid email!
            </p>
          )}
        </div>
        <div
          className={`${classes["form-control"]} ${
            zipInputHasError && classes["invalid"]
          }`}
        >
          <label htmlFor="checkout-zip-input">
            Postal/ZIP<sup>*</sup>
          </label>
          <input
            type="number"
            name="checkout-zip-input"
            id="checkout-zip-input"
            value={zipInput}
            onChange={zipInputChangeHandler}
            onBlur={zipInputBlurHandler}
          />
          {zipInputHasError && (
            <p className={classes["error-text"]}>
              Please insert a valid ZIP code!
            </p>
          )}
        </div>
        <div className={classes["form-control"]}>
          <label htmlFor="orderNotes">Order notes</label>
          <textarea
            id="orderNotes"
            value={notesInput}
            onChange={notesInputChangeHandler}
          />
        </div>

        <table className={classes["form-table"]}>
          <thead>
            <tr>
              <th align="center">Quantity</th>
              <th align="center">Description</th>
              <th align="center">Unit value</th>
              <th align="center">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartList.length > 0 &&
              cartList.map((item) => (
                <CheckoutTableItem dataItem={item} key={item.productData.id} />
              ))}
            <tr>
              <td align="center" colSpan={3}>
                <b>Total</b>
              </td>
              <td align="right">
                <b>
                  <sup>$</sup>
                  {totalOrder}
                </b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={classes["form-actions"]}>
        <button
          type="submit"
          className="cta cta-secondary"
          disabled={!formIsValid}
        >
          Pay <sup>$</sup>
          {totalOrder}
        </button>
        <Link to="/cart" className="cta">
          Go back to cart
        </Link>
      </div>
    </form>
  );
}

export default CheckoutForm;

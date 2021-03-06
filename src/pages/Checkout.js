import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
} from "../functions/user";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const dispatch = useDispatch();
  const { user, COD } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("REPONSE PANIER USER : ", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const emptyCart = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      toast.success("Votre panier est vide...Aller au shopping !");
    });
  };

  const saveAddressToDb = () => {
    // console.log(address);
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Adresse de livraison enregitrée avec success !");
      }
    });
  };

  const showAddress = () => (
    <>
      <ReactQuill theme="snow" value={address} onChange={setAddress} />
      <button className="btn btn-primary mt-2" onClick={saveAddressToDb} >
        Save
      </button>
    </>
  );

  //calculer prix en focntion de quantité produit
  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} x {p.count} ={" "}
          {p.product.price * p.count}
        </p>
      </div>
    ));

  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Addresse de Livraion</h4>
        <br />
        <br />
        {showAddress()}
      </div>

      <div className="col-md-6">
        <h4>Votre commande</h4>
        <hr />
        <p>Articles {products.length}</p>
        <hr />
        {showProductSummary()}
        <hr />
        <p>Total du Panier: {total}</p>

        <div className="row">
          <div className="col-md-6">
            <button
              className="btn btn-primary"
              disabled={!addressSaved || !products.length}
              onClick={() => history.push("/payment")}
            >
              Confirmer ma commande
            </button>
          </div>

          <div className="col-md-6">
            <button
              disabled={!products.length}
              onClick={emptyCart}
              className="btn btn-primary"
            >
              Vider mon panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

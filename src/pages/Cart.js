import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";

const Cart = ({ history }) => {
  const { cart, user } = useSelector((state) => ({ ...state }));

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  //enregistrer commande non payée dans db
  const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then((res) => {
        console.log("REPONSE AJOUT PANIER : ", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("ERREUR PANIER", err));
  };

  //afficher contenu dans panier
  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Produit</th>
          <th scope="col">Prix</th>
          <th scope="col">Quantité</th>
          <th scope="col">Livraison</th>
          <th scope="col">Supprimer du panier</th>
        </tr>
      </thead>

      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Panier / {cart.length} Article</h4>

          {!cart.length ? (
            <p>
              Panier vide...<Link to="/shop">Faire mon shopping !</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Résumé de la commande</h4>
          <hr />
          <p>Articles</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = ${c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total : <b>{getTotal()} €</b>
          <hr />
          {user ? (
            <>
              <button
                onClick={saveOrderToDb}
                className="btn btn-sm btn-primary mt-2"
                disabled={!cart.length}
              >
                Aller au paiement
              </button>
            </>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}
              >
                Connectez-vous pour payer
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

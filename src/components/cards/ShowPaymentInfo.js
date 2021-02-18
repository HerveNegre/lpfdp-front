import React from "react";

const ShowPaymentInfo = ({ order, showStatus = true }) => (
  <div>
    <p>
      <span>Numéro de commande : {order.paymentIntent.id}</span>
      {" / "}
      <span>
        Montant:{" / "}
        {(order.paymentIntent.amount /= 100).toLocaleString("fr-FR", {
          style: "currency",
          currency: "EUR",
        })}
      </span>
      {" / "}
      <span>Moyen de paiement: {order.paymentIntent.payment_method_types[0]}</span>
      {" / "}
      <span>Paiement: {order.paymentIntent.status.toUpperCase()}</span>
      {" / "}
      <span>
        Date de commande :{" / "}
        {new Date(order.paymentIntent.created * 1000).toLocaleString()}
      </span>
      {" / "}
      <br />
      {showStatus && (
        <span className="badge bg-primary text-white">
          STATUS: {order.orderStatus}
        </span>
      )}
    </p>
  </div>
);

export default ShowPaymentInfo;

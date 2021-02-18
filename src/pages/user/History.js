import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getUserOrders } from "../../functions/user";
import { useSelector } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";

const History = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadUserOrders();
    }, []);

    //recuperer toutes les commandes de l'user
    const loadUserOrders = () =>
        getUserOrders(user.token).then((res) => {
        console.log(JSON.stringify(res.data, null, 4));
        setOrders(res.data);
        });

    //afficher commandes de l'user 
    const showOrderInTable = (order) => (
        <table className="table table-bordered">
            <thead className="thead-light">
                <tr>
                <th scope="col">Produit</th>
                <th scope="col">Prix</th>
                <th scope="col">Quantité</th>
                <th scope="col">Livraison</th>
                </tr>
            </thead>

            <tbody>
                {order.products.map((p, i) => (
                <tr key={i}>
                    <td>
                    <b>{p.product.title}</b>
                    </td>
                    <td>{p.product.price}</td>
                    <td>{p.count}</td>
                    <td>
                    {p.product.shipping === "Yes" ? (
                        <CheckCircleOutlined style={{ color: "green" }} />
                    ) : (
                        <CloseCircleOutlined style={{ color: "red" }} />
                    )}
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    );

    //afficher par ordre chronologique les commandes de l'user
    const showEachOrders = () =>
        orders.reverse().map((order, i) => (
        <div key={i} className="m-5 p-3 card">
            <ShowPaymentInfo order={order} />
            {showOrderInTable(order)}
        </div>
        ));

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col text-center">
                    <h4>
                        {orders.length > 0 ? "Historique de vos commandes" : "Aucune commandes enregistrées"}
                    </h4>
                    {showEachOrders()}
                </div>
            </div>
        </div>
    );
};

export default History;
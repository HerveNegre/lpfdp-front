import React from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
  const {
    price,
    category,
    subs,
    shipping,
    quantity,
  } = product;

  return (
    <ul className="list-group">
      <li className="list-group-item">
        Prix{" "}
        <span className="label label-default label-pill pull-xs-right">
          {price} €
        </span>
      </li>

      {category && (
        <li className="list-group-item">
          Categorie{" "}
          <Link
            to={`/category/${category.slug}`}
            className="label label-default label-pill pull-xs-right"
          >
            {category.name}
          </Link>
        </li>
      )}

      {subs && (
        <li className="list-group-item">
          Sous-categorie
          {subs.map((s) => (
            <Link
              key={s._id}
              to={`/sub/${s.slug}`}
              className="label label-default label-pill pull-xs-right"
            >
              {s.name}
            </Link>
          ))}
        </li>
      )}

      <li className="list-group-item">
        Livraison{" "}
        <span className="label label-default label-pill pull-xs-right">
          {shipping}
        </span>
      </li>

      <li className="list-group-item">
        Disponible{" "}
        <span className="label label-default label-pill pull-xs-right">
          {quantity}
        </span>
      </li>
    </ul>
  );
};

export default ProductListItems;

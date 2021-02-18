import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

const initialState = {
  title: "Nom de l'article",
  description: "Description du produit",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "Oui",
  quantity: "",
  images: [],
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  const handleSubmit = (event) => {
    event.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`Le produit "${res.data.title}" a été crée avec success !`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.error('Le produit n\'a pas pus être crée');
      });
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    // console.log(event.target.name, "  ", event.target.value);
  };

  const handleCategoryChange = (event) => {
    event.preventDefault();
    console.log("CATEGORIE CHOISIE", event.target.value);
    setValues({ ...values, subs: [], category: event.target.value });
    getCategorySubs(event.target.value).then((res) => {
      console.log("OPTIONS (sous catégories)", res);
      setSubOptions(res.data);
    });
    setShowSub(true);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-warning h1" />
            ) : (
              <h4>Ajouter un produit</h4>
          )}
          <hr />

          <div className="p-3">
            <FileUpload 
              values={values} 
              setValues={setValues} 
              setLoading={setLoading}
            />
          </div>

          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSub={showSub}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
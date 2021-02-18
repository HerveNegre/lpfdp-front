import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { useSelector } from 'react-redux';
import { getProducts, updateProduct } from '../../../functions/product';
import { getCategories, getCategorySubs } from "../../../functions/category";
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';
import FileUpload from '../../../components/forms/FileUpload';
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const initialState = {
    title: "",
    description: "",
    price: "",
    category: "",
    subs: [],
    shipping: "",
    quantity: "",
    images: [],
};

const ProductUpdate = ({ match, history }) => {

    const [values, setValues] = useState(initialState);
    const [categories, setCategories] = useState([]);
    const [subOptions, setSubOptions] = useState([]);
    const [arrayOfSubs, setArrayOfSubs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));
    
    const { slug } = match.params;

    useEffect(() => {
        loadProduct();
        loadCategories();
    }, []);

    const loadProduct = () => {
        getProducts(slug).then((p) => {
            //produit
            setValues({...values, ...p.data });
            //deuxieme sous categorie de produit
            getCategorySubs(p.data.category._id).then((res) => {
                setSubOptions(res.data);
            });
            //sous-categories par default/à selectionner
            let array = []
            p.data.subs.map(s => {
                array.push(s._id);
            });
            console.log("ARRAY", array);
            setArrayOfSubs((prev) => array);
        });
    };

    const loadCategories = () =>
        getCategories().then((c) => {
            console.log("CATEGORIES POUR LA MIS A JOUR DE PRODUIT : ", c.data);
            setCategories(c.data);
        });

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        values.subs = arrayOfSubs;
        values.category = selectedCategory ? selectedCategory : values.category;

        updateProduct(slug, values, user.token)
        .then((res) => {
            setLoading(false);
            toast.success(`Le produit "${res.data.title}" a bien été modifié !`);
            history.push('/admin/products');
        })
        .catch((error, res) =>{
            console.log(error);
            setLoading(false);
            toast.error(`Le produit "${res.data.title}" n'a pas pus être modifié !`);
        });      
    };

    const handleChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value});
    };

    const handleCategoryChange = (event) => {
        event.preventDefault();
        console.log("CATEGORIE CHOISIE : ", event.target.value);
        setValues({...values, subs: [] });

        setSelectedCategory(event.target.value);

        getCategorySubs(event.target.value).then((res) => {
            console.log("SOUS CATEGORIE CHOISIE : ", res);
            setSubOptions(res.data);
        });

        console.log("CATEGORIE EXISTANTE", values.category);

        //rafraichir le formulaire de sous-categorie quand on change de categorie
        if (values.category._id === event.target.value) {
            loadProduct();
        }
        setArrayOfSubs([]);
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
                        <h4>Modifier un produit</h4>
                    )}

                    <div className="p-3">
                        <FileUpload
                            values={values}
                            setValues={setValues}
                            setLoading={setLoading}
                        />
                    </div>
                    <br />
                    <ProductUpdateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        values={values}
                        setValues={setValues}
                        handleCategoryChange={handleCategoryChange}
                        categories={categories}
                        subOptions={subOptions}
                        arrayOfSubs={arrayOfSubs}
                        setArrayOfSubs={setArrayOfSubs}
                        selectedCategory={selectedCategory}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductUpdate;
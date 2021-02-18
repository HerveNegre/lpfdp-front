import React, { useEffect, useState } from 'react';
import AdminProductCard from '../../../components/cards/AdminProductCard';
import AdminNav from '../../../components/nav/AdminNav';
import { getProductsByCount } from '../../../functions/product';
import { removeProduct } from '../../../functions/product';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadAllProducts();
    }, []);
    
    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(100)
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err)
            });
    };

    //popup pour confirmation de suppression d'un produit
    const handleRemove = (slug) => {
        let answer = window.confirm('VOTRE ATTENTION SVP ! Voulez vous vraiment supprimer ce produit ?')
        if (answer) {
            // console.log('requête de suppression', slug);
            removeProduct(slug, user.token)
                .then((res) => {
                    loadAllProducts();
                    toast.success(`"${res.data.title}" a été supprimé avec success !`);
                })
                .catch((error, res) => {
                    if (error.response.status === 400) {
                        setLoading(false);
                        toast.error(`ERREUR : "${res.data.title}" n'a pas pus être supprimé !`);
                    }
                });
        }
    };

    return (
        console.log("product", products ),
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? (
                        <h4 classname="text-warning">Chargement...</h4>
                        ) : (
                            <h4>Tableau des produits</h4>
                        )
                    }
                    <div className="row">
                        {products.map((product) => (
                            <div key={product._id} className="col-md-4 pb-4">
                                <AdminProductCard
                                    product={product}
                                    handleRemove={handleRemove}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
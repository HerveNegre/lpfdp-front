import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { EditOutlined , DeleteOutlined} from '@ant-design/icons';

import AdminNav from '../../../components/nav/AdminNav';
import {
    createCategory,
    getCategories,
    removeCategory
} from '../../../functions/category';
import { Link } from '@material-ui/core';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';

const CategoryCreate = () => {

    const { user } = useSelector((state) => ({ ...state }));
    const [name, setName] = useState('');
    const [load, setLoad] = useState(false);
    const [categories, setCategories] = useState([]);
    const [keyword, setKeyword] = useState(''); 

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () =>
        getCategories().then((c) => setCategories(c.data));

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(name);
        setLoad(true)
        createCategory({name}, user.token)
        .then(res => {
            // console.log(res);
            setLoad(false)
            setName('')
            toast.success(`NOUVELLE CATEGORIE CREE : "${res.data.name}" !`);
            loadCategories();
        })
        .catch((error, res) => {
            console.log(error);
            setLoad(false);
            if (error.response.status === 400) {
                toast.error(`ERREUR : La catégorie "${res.data.name}" existe déja !`);
            }
        });
    };

    //popup confirmer supression categorie
    const handleRemove = async (slug, res) => {
        // console.log(answer, slug);
        if (window.confirm(`VOTRE ATTENTION SVP ! Voulez vous vraiment supprimer la categorie "${res.data.name}" ?`)) {
            setLoad(true);
            removeCategory(slug, user.token)
                .then((res) => {
                    setLoad(false);
                    toast.success(`La catégorie ${res.data.name} a été supprimé avec success`);
                    loadCategories();
                })
                .catch((error, res) => {
                    if (error.response.status === 400) {
                        setLoad(false);
                        toast.error(`ERREUR : La catégorie "${res.data.name}" n'a pas pus être supprimé !`);
                    }
                });
        }
    };

    //rechercher & filtrer les categories
    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    <CategoryForm
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName}
                    />
                    
                    <LocalSearch
                        setKeyword={setKeyword}
                        keyword={keyword}
                    />
                      
                    <hr />
                    {categories.filter(searched(keyword)).map((c) => (
                        <div className="alert alert-primary" key={c._id}>
                            {c.name}
                            <Link to={`/admin/category/${c.slug}`}>
                                <span className="btn btn-sm float-right">
                                    <EditOutlined className="text-primary" />
                                </span>
                            </Link>
                            <span
                                className="btn btn-sm float-right"
                                onClick={() => handleRemove(c.slug)}
                            >
                                <DeleteOutlined className="text-danger" />
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryCreate;
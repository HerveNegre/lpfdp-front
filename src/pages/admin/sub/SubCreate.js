import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { EditOutlined , DeleteOutlined} from '@ant-design/icons';

import AdminNav from '../../../components/nav/AdminNav';
import { getCategories } from '../../../functions/category';
import {
    createSub,
    getSub,
    getSubs,
    removeSub
} from '../../../functions/sub';
import { Link } from '@material-ui/core';
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from '../../../components/forms/LocalSearch';

const SubCreate = () => {

    const { user } = useSelector((state) => ({ ...state }));
    const [name, setName] = useState('');
    const [load, setLoad] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [subs, setSubs] = useState([]);
    const [keyword, setKeyword] = useState(''); 

    useEffect(() => {
        loadCategories();
        loadSubs();
    }, []);

    //recuperer toutes les categories
    const loadCategories = () => 
        getCategories().then((c) => setCategories(c.data));

    //recuperer toutes les sous-categories
    const loadSubs = () => 
        getSubs().then((c) => setSubs(c.data));

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(name);
        setLoad(true)
        createSub({ name, parent: category }, user.token)
            .then((res) => {
                // console.log(res);
                setLoad(false)
                setName('')
                toast.success(`NOUVELLE SOUS-CATEGORIE CREE : "${res.data.name}" !`);
                loadSubs();
            })
            .catch((error, res) => {
                console.log(error);
                setLoad(false);
                if (error.response.status === 400) {
                    toast.error(`ERREUR : La sous-catégorie "${res.data.name}" existe déja !`);
                }
            });
    };

    //popup confirmer supression categorie
    const handleRemove = async (slug, res) => {
        // console.log(answer, slug);
        if (window.confirm(`VOTRE ATTENTION SVP ! Voulez vous vraiment supprimer la sous-categorie "${res.data.name}" ?`)) {
            setLoad(true);
            removeSub(slug, user.token)
                .then(res => {
                    setLoad(false);
                    toast.success(`La sous-catégorie ${res.data.name} a été supprimé`);
                    loadSubs();
                })
                .catch((error, res) => {
                    if (error.response.status === 400) {
                        setLoad(false);
                        toast.error(`ERREUR : La sous-catégorie "${res.data.name}" n'a pas pus être supprimé !`);
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

                <div className="form-group">
                    <label>Categorie</label>
                    <select
                        name="category"
                        className="form-control"
                        onChange={(event) => setCategory(event.target.value)}
                    >
                        <option>Selectionnez une categorie</option>
                        {
                            categories.length > 0 &&
                                categories.map((category) => (
                                    <option
                                        key={category._id}
                                        value={category._id}
                                    >
                                        {category.name}
                                    </option>
                                ))
                        }
                    </select>
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
                    {subs.filter(searched(keyword)).map((s) => (
                        <div className="alert alert-primary" key={s._id}>
                            {s.name}
                            <Link to={`/admin/sub/${s.slug}`}>
                                <span className="btn btn-sm float-right">
                                    <EditOutlined className="text-primary" />
                                </span>
                            </Link>
                            <span
                                onClick={() => handleRemove(s.slug)}
                                className="btn btn-sm float-right"
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

export default SubCreate;
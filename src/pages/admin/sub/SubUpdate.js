import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import AdminNav from '../../../components/nav/AdminNav';
import { getCategories } from '../../../functions/category';
import { updateSub, getSub } from '../../../functions/sub';
import CategoryForm from "../../../components/forms/CategoryForm";

const SubUpdate = ({ history, match }) => {

    const { user } = useSelector((state) => ({ ...state }));
    const [name, setName] = useState('');
    const [loading, setLoad] = useState(false);
    const [categories, setCategories] = useState([]);
    const [parent, setParent] = useState([]);

    useEffect(() => {
        loadCategories();
        loadSub();
    }, []);

    //recuperer toutes les categories
    const loadCategories = () =>
        getCategories().then((c) => setCategories(c.data));

    //recuperer toutes les sous-categories de la categorie parent
    const loadSub = () => 
        getSub(match.params.slug).then((s) => {
            setName(s.data.name);
            setParent(s.data.parent);
        });

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(name);
        setLoad(true)
        updateSub(match.params.slug, { name, parent }, user.token)
            .then((res) => {
                // console.log(res);
                setLoad(false)
                setName('')
                toast.success(`La sous-catégorie "${res.data.name}" vient dêtre modifiée !`);
                history.push('/admin/sub');
            })
            .catch((error, res) => {
                console.log(error);
                setLoad(false);
                if (error.response.status === 400) {
                    toast.error(`ERREUR : La sous-catégorie "${res.data.name}" existe déja !`);
                }
            });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? (
                        <h4 className="text-danger">Chargement...</h4>
                    ) : (
                        <h4>Modifier une sous-catégorie</h4>
                    )}
                    <div className="form-group">
                        <label>Catégorie</label>
                        <select
                            name="category"
                            className="form-control"
                            onChange={(event) => setParent(event.target.value)}
                        >
                            <option>Selectionnez une categorie</option>
                            {
                                categories.length > 0 &&
                                    categories.map((category) => (
                                        <option
                                            key={category._id}
                                            value={category._id}
                                            selected={category._id === parent}
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubUpdate;
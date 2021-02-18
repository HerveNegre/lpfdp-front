import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
    getCategory,
    updateCategory
} from '../../../functions/category';
import CategoryForm from '../../../components/forms/CategoryForm';

const CategoryUpdate = ({ history, match }) => {

    const { user } = useSelector((state) => ({ ...state }));
    const [name, setName] = useState('');
    const [load, setLoad] = useState(false);

    useEffect(() => {
        loadCategory();
    }, []);

    const loadCategory = () => {
        getCategory(match.params.slug).then((c) => setName(c.data.name));
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(name);
        setLoad(true)
        updateCategory(match.params.slug, { name }, user.token)
        .then((res) => {
            // console.log(res);
            setLoad(false)
            setName('')
            toast.success(`Modification(s) de "${res.data.name}" effectuée(s) avec success !`);
            history.push('/admin/category');
        })
        .catch((error, res) => {
            console.log(error);
            setLoad(false);
            if (error.response.status === 400) {
                toast.error(`ERREUR : La catégorie "${res.data.name}" existe déja !`);
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
                    <CategoryForm
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName}
                    />
                </div>
            </div>
        </div>
    );
};

export default CategoryUpdate;
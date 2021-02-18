import axios from 'axios';

//afficher toutes les categories
export const getCategories = async () =>
    await axios.get(`${process.env.REACT_APP_API}/categories`);

//afficher une categorie
export const getCategory = async (slug) =>
    await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);

//creer une categorie
export const createCategory = async (category, authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/category`, category, {
        headers: {
            authtoken,
        },
    });

//afficher toutes les sous-categories
export const getCategorySubs = async (_id) =>
    await axios.get(`${process.env.REACT_APP_API}/category/subs/${_id}`);

//modifier une categorie
export const updateCategory = async (slug, authtoken, category) =>
    await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, category, {
        headers: {
            authtoken,
        },
    });

//supprimer une categorie
export const removeCategory = async (slug, authtoken) =>
    await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
        headers: {
            authtoken,
        },
    });
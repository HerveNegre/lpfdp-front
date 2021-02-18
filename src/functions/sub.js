import axios from 'axios';

//afficher toutes les sous-categories
export const getSubs = async () =>
    await axios.get(`${process.env.REACT_APP_API}/subs`);

//afficher une sous-categorie
export const getSub = async (slug) => 
    await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);

//creer une sous-categorie
export const createSub = async (authtoken, sub) =>
    await axios.post(`${process.env.REACT_APP_API}/sub`, sub, {
        headers: {
            authtoken,
        },
    });

//modifier une sous-categorie
export const updateSub = async (slug, authtoken, sub) =>
    await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, sub, {
        headers: {
            authtoken,
        },
    });

//supprimer une sous-categorie
export const removeSub = async (slug, authtoken) =>
    await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
        headers: {
            authtoken,
        },
    });

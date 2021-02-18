import axios from 'axios';

//ajouter un produit
export const createProduct = async (product, authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/product`, product, {
        headers: {
            authtoken,
        },
    });

//afficher un produit par sa ref
export const getProductsByCount = async (count) =>
    await axios.get(`${process.env.REACT_APP_API}/products/${count}`);

//afficher le nombre total de produits
export const getProductsCount = async () =>
    await axios.get(`${process.env.REACT_APP_API}/products/total`);

//afficher un produit par son slug
export const getProducts = async (slug) =>
    await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);

//modifier un produit
export const updateProduct = async (product, slug, authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
        headers: {
            authtoken,
        },
    });

//supprimer un produit
export const removeProduct = async (slug, authtoken) =>
    await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
        headers: {
            authtoken,
        },
    });

//system de notation produit  
export const productStar = async (productId, star, authtoken) =>
    await axios.put(
      `${process.env.REACT_APP_API}/product/star/${productId}`,
      { star },
      {
        headers: {
          authtoken,
        },
      }
    );

//afficher produits similaires
export const getRelated = async (productId) =>
    await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);

//afficher produit par filtre
export const fetchProductsByFilter = async (arg) =>
    await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);
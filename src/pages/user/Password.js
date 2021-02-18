import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

const Password = () => {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        console.log(password);

        await auth.currentUser
        .updatePassword(password)
        .then(() => {
            setLoading(false);
            setPassword("");
            toast.success("Mot de passe mis à jour avec succès");
        })
        .catch((err) => {
            setLoading(false);
            toast.error(err.message);
        });
    };

    const passwordUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Votre mot de passe</label>
                <input 
                    type="password" 
                    onChange={e => setPassword(e.target.value)} 
                    className="form-control" 
                    placeholder="Entrez votre nouveau mot de passe"
                    disabled={loading}
                    value={password}
                />
                <button
                    className="btn btn-primary"
                    disabled={!password || password.length < 4 || loading}
                >
                    Valider
                </button>
            </div>
        </form>
    );
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav/>
                </div>
                <div className="col">
                    {loading ? (
                    <h4 className="text-danger">Chargement...</h4>
                     ) : (<h4>Changer de mot de passe</h4>)}
                    {passwordUpdateForm()}
                </div>
            </div>
        </div>
    );
};
export default Password;
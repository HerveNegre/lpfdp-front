import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const LoadingToRedirect = () => {
    const [count, setCount] = useState(5);
    let history = useHistory();
    

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        }, 1000);
        //boucle a la fin du décompte
        count === 0 && history.push("/");
        //clean
        return () => clearInterval(interval);
    }, [count, history]);

    return (
        <div className="container p-5 text-center">
            <p>Redirection dans : {count} secondes</p>
        </div>
    );
};

export default LoadingToRedirect;
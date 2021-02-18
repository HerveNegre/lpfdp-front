import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Container,
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Grid,
    Typography,
    Link
} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { createOrUpdateUser } from '../../functions/auth';

const RegisterComplete = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let dispatch = useDispatch();
    
    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.warning.main,
        },
        form: {
            width: '100%',
            marginTop: theme.spacing(3),
        },
        submit: {
            background: 'linear-gradient(45deg, #00796b 30%, #26a69a 90%)',
            margin: theme.spacing(3, 0, 2),
        },
        anyCount: {
            color: 'black',
            float: 'right'
        }
    }));
    
    const classes = useStyles();
    
    useEffect(() => {
        setEmail(window.localStorage.getItem('emailRegister'));
    }, [history]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        //validations
        if (!email || !password) {
            toast.error("ATTENTION ! L'email et le mot de passe sont obligatoires !");
            return;
        }
        if (password.length < 4) {
            toast.error("AIE AIE AIE ! Le mot de passe doit avoir 4 caractères minimum !");
            return;
        }

        try {
            const result = await auth.signInWithEmailLink(email, window.location.href);
            if (result.user.emailVerified) {
                
                //effacer l'email dans localStorage
                window.localStorage.removeItem('emailRegister');

                //recuperer token du user
                let user = auth.currentUser
                await user.updatePassword(password);
                
                const getIdTokenResult = await user.getIdTokenResult()
                
                console.log("user", user, "getIdTokenResult", getIdTokenResult);

                createOrUpdateUser(getIdTokenResult.token)
                    .then((res) => {
                        dispatch({
                            type: 'LOGGED_IN_USER',
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                role: res.data.role,
                                _id: res.data._id,
                                token: getIdTokenResult.token,
                            },
                        });
                    })
                    .catch((error) => console.log(error));

                //redirection vers page Home une fois user enregistré
                history.push('/')
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    //Formulaire finaliser inscription
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <FaceIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Finaliser l'inscription
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                value={email}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="password"
                                label="Mot de passe"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                autoFocus
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        className={classes.submit}
                    >
                        Valider
                    </Button>
                    <Grid item>
                        <Link href="/login" variant="body2" className={classes.anyCount}>
                            {"Vous avez déja un compte ? Connectez vous !"}
                        </Link>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default RegisterComplete;
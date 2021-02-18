import React, { useState, useEffect } from 'react';
import {
    Container,
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Typography
} from '@material-ui/core';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';
import { makeStyles } from '@material-ui/core/styles';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const ForgotPassword = ({ history }) => {
    const [email, setEmail] = useState('');
    const [load, setLoad] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (user && user.token) {
            history.push('/');
        }
    }, [user, history]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoad(true);

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true
        }

        await auth
            .sendPasswordResetEmail(email, config)
            .then(() => {
                setEmail('')
                setLoad(false)
                toast.success(
                    `Un email pour le changement de votre mot de passe a été envoyé à ${email}`
                );
            })
            .catch(() => {
                setLoad(false)
                toast.error('UNE SECONDE ! L\'email ne correspond à aucun compte !');
            });
    };

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
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));

    const classes = useStyles();
    
    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <FlipCameraAndroidIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                {load ? (
                   "Chargement..."
                ) : (
                   "Mot de passe oublié"
                )}
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoFocus
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={!email}
                >
                    Envoyer
                </Button>
            </form>
        </div>
      </Container>
    );
};

export default ForgotPassword;
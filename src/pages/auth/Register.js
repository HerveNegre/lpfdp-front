import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

const Register = ({ history }) => {
    const [email, setEmail] = useState('');

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (user && user.token) {
            history.push('/');
        }
    }, [user, history]);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true
        }

        await auth.sendSignInLinkToEmail(email, config);
        toast.success(`Un email de confirmation a été envoyé à ${email}`);

        //enregister l'email avec localStorage
        window.localStorage.setItem('emailRegister', email);

        //reset le champs email une fois validé
        setEmail('');
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

    //Formulaire enregister email
    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Inscription
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            type="email"
                            id="email"
                            label="Email"
                            name="email"
                            value={email}
                            autoComplete="email"
                            autofocus
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Grid>
                </Grid>
                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    // color="primary"
                    startIcon={<SaveIcon />}
                    className={classes.submit}
                >
                    Confirmer
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

export default Register;
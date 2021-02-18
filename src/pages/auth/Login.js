import React, { useState, useEffect } from 'react';
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
import {
    GoogleOutlined,
    FacebookOutlined
} from '@ant-design/icons';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { makeStyles } from '@material-ui/core/styles';
import { auth, googleAuthProvider, facebookAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { createOrUpdateUser } from '../../functions/auth';

const Login = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();
    const [load, setLoad] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        let intended = history.location.state;
        if (intended) {
            return;
        } else {
            if (user && user.token) history.push("/");
        }
  }, [user, history]);

    let dispatch = useDispatch();

    const roleBasedRedirect = (res) => {
        let intended = history.location.state;
        if (intended) {
            history.push(intended.from);
        } else {
            if (res.data.role === "admin") {
                history.push("/admin/dashboard");
            } else {
                history.push("/user/history");
            }
        }
    };
   
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoad(true)
        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            const {user} = result;
            console.log("result", result);
            const getIdTokenResult = await user.getIdTokenResult();

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
                    roleBasedRedirect(res);
                })
                .catch((error) => console.log(error));
        } catch (error) {
            console.log(error);
            toast.error("Identifiant ou mot de passe incorrects !");
            setLoad(false);
        }
    };

    //se connecter avec Google
    const googleLogin = async () => {
        auth
            .signInWithPopup(googleAuthProvider)
            .then(async (result) => {
                const {user} = result
                const getIdTokenResult = await user.getIdTokenResult();
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
                    roleBasedRedirect(res);
                })
                .catch((error) => console.log(error));
            // history.push('/');
            })
            .catch((error) => {
                console.log(error)
                toast.error("Identifiant ou mot de passe incorrects !");
            });
    };

    //se connecter avec Facebook
    const facebookLogin = async () => {
        auth
            .signInWithPopup(facebookAuthProvider)
            .then(async (result) => {
                const {user} = result
                const getIdTokenResult = await user.getIdTokenResult();
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
                    roleBasedRedirect(res);
                })
                .catch((error) => console.log(error));
            // history.push('/');
            })
            .catch((error) => {
                console.log(error)
                toast.error("Identifiant ou mot de passe incorrects !");
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
            marginTop: theme.spacing(3),
        },
        submit: {
            background: 'linear-gradient(45deg, #00796b 30%, #26a69a 90%)',
            margin: theme.spacing(3, 0, 2),
        },
        submitGoogle: {
            background: 'linear-gradient(25deg, #b71c1c 30%, #ef5350 90%)',
            margin: theme.spacing(3, 0, 2),
        },
        submitFacebook: {
            background: 'linear-gradient(70deg, #1a237e 30%, #1976d2 90%)',
            margin: theme.spacing(3, 0, 2),
        },
        forgotPwd: {
            color: 'black',
            float: 'left'
        },
        anyCount: {
            color: 'black',
            float: 'right'
        }
    }));

    const classes = useStyles();


    //Formulaire se connecter
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <RssFeedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {load ? "Chargement..." : "Se connecter" }
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
                                autoFocus
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                type="password"
                                id="password"
                                label="Mot de passe"
                                name="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        onClick={handleSubmit}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        icon={<PlayCircleFilledIcon />}
                    >
                        Connexion
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link
                                href="/forgot/password"
                                variant="body2"
                                className={classes.forgotPwd}
                            >
                                Mot de passe oublié ?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register" variant="body2" className={classes.anyCount}>
                                {"Pas encore de compte ? Enregistrez vous !"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submitGoogle}
                    startIcon={<GoogleOutlined />}
                    onClick={googleLogin}
                >
                    Se connecter avec Google
                </Button>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submitFacebook}
                    startIcon={<FacebookOutlined />}
                    onClick={facebookLogin}
                >
                    Se connecter avec Facebook
                </Button>
            </div>
        </Container>
    );
};

export default Login;
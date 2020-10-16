import React from 'react';
import axios from 'axios';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Formik,
  Form,
  Field,
} from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(9),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loginLink: {
    fontWeight: 500,
  }
}));

const validationSchema = Yup.object({
  email: Yup.string()
    .email()
    .required('Required'),
  firstName: Yup.string()
    .required('Required'),
  lastName: Yup.string()
    .required('Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Required'),
  passwordConfirmation: Yup.string()
    .test('match', "Passwords don't match", function (value) {
      return value === (this.parent).password;
    })
    .required('Required'),
});

const initialValues = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  passwordConfirmation: '',
};

export default function SignUp({ user, onSignUp }) {
  const classes = useStyles();

  function signUp(values) {
    return axios.post('/api/auth/register', values)
      .then(response => onSignUp(response.data))
      .catch(error => alert('Something went wrong'));
  }

  if (user) {
    return <Redirect to='/' />
  }

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Hotel Listing
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={signUp}
        >
          {({ isSubmitting }) => (
            <Form className={classes.form}>
              <Field name='email'>
                {({ field, meta }) => (
                  <TextField
                    {...field}
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    id='email'
                    autoComplete='email'
                    label='Email Address'
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                    autoFocus
                  />
                )}
              </Field>
              <Field name='firstName'>
                {({ field, meta }) => (
                  <TextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    id='firstName'
                    label='First Name'
                    { ...field }
                    autoComplete='firstName'
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                    disabled={isSubmitting}
                  />
                )}
              </Field>
              <Field name='lastName'>
                {({ field, meta }) => (
                  <TextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    id='lastName'
                    label='Last Name'
                    { ...field }
                    autoComplete='lastName'
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                    disabled={isSubmitting}
                  />
                )}
              </Field>
              <Field name='password'>
                {({ field, meta }) => (
                  <TextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    { ...field }
                    label='Password'
                    type='password'
                    id='password'
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                    disabled={isSubmitting}
                    autoComplete='current-password'
                  />
                )}
              </Field>
              <Field name='passwordConfirmation'>
                {({ field, meta }) => (
                  <TextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    { ...field }
                    label='Confirm Password'
                    type='password'
                    id='passwordConfirmation'
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                    disabled={isSubmitting}
                  />
                )}
              </Field>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                disabled={isSubmitting}
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
        <Box display='flex' justifyContent='flex-start' width='100%'>
          Already have an account?&nbsp;
          <Link href='#'
            variant='body2'
            component={RouterLink}
            className={classes.loginLink}
            to='/login'
          >
            Sign in
          </Link>
        </Box>
      </div>
    </Container>
  );
};

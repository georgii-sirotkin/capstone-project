import React from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Formik,
  Form,
  Field,
} from 'formik';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';

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
}));

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string()
    .required('Required')
});

export default function Login({ user, onLogIn }) {
  const classes = useStyles();
  const initialValues = { email: '', password: '' };

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
          onSubmit={(values, actions) => {
            actions.setStatus({ error: '' });

            return axios.post('/api/auth/login', values)
              .then(response => {
                onLogIn(response.data);
              })
              .catch(error => {
                if (error.response.status === 401) {
                  actions.setStatus({ error: error.response.data.message });
                  actions.setFieldValue('password', '');
                  actions.setFieldTouched('password', false, false);
                  return;
                }

                alert('Something went wrong');
              });
          }}
        >
          {({ status, isSubmitting }) => (
            <Form className={classes.form}>
              <Field name='email'>
                {({ field, meta }) => (
                  <TextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    id='email'
                    label='Email Address'
                    { ...field }
                    autoComplete='email'
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                    disabled={isSubmitting}
                    autoFocus
                  />
                )}
              </Field>
              <Field name="password">
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
              {status && status.error && <Typography color='error'>{status.error}</Typography>}
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                disabled={isSubmitting}
              >
                Sign In
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

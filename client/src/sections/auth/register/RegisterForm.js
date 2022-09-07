import * as Yup from 'yup';
import { useState, useContext, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// component
import Iconify from '../../../components/Iconify';
import { appContext } from '../../../context/context';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { registerUser, hideAlert, theUser } = useContext(appContext);
  const info = useContext(appContext);
  // console.log(theUser);
  // console.log(info);
  useEffect(() => {
    if (theUser) {
      setTimeout(() => {
        navigate('/dashboard/app');
      }, 3000);
    }
  }, [theUser, navigate]);
  const HandleSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !email || !password) {
      hideAlert();

      return;
    }
    console.log({ firstName, email, password });

    const user = { firstName, email, password };

    registerUser(user);
    hideAlert();

    setFirstName('');
    setEmail('');
    setPassword('');
  };

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={HandleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              // error={Boolean(touched.firstName && errors.firstName)}
              // helperText={touched.firstName && errors.firstName}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              name="firstName"
            />

            {/* <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            /> */}
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            // error={Boolean(touched.email && errors.email)}
            // helperText={touched.email && errors.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            // error={Boolean(touched.password && errors.password)}
            // helperText={touched.password && errors.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

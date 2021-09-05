import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';
import { toast } from 'react-toastify';
import LabelConstants from '../constant/LabelConstants';
import ApiConstants from '../constant/ApiConstants';
import { CMS_API_URL } from '../constant/serviceurl';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginAuth = async () => {
    try {
      const requestOptions = {
        method: ApiConstants.METHOD_POST,
        headers: { 'Content-Type': ApiConstants.APPLICATION_JSON },
        body: JSON.stringify({
          username: email,
          password
        })
      };
      const response = await fetch(CMS_API_URL + ApiConstants.LOGIN_API, requestOptions);
      const data = await response.json();
      if (data !== null) {
        if (data.token.length > 30) {
          localStorage.setItem('userLoginToken', data.token);
          localStorage.setItem('userName', data.username);
          const getRequestOptions = {
            method: 'GET',
            headers: {
              Authorization: ApiConstants.BEARER + data.token,
            }
          };
          const userapi = ApiConstants.USER_GET_API + data.username;
          const uresponse = await fetch(CMS_API_URL + userapi, getRequestOptions);
          const uresponsedata = await uresponse.json();
          if (uresponsedata != null) {
            localStorage.setItem('name', uresponsedata.name);
            localStorage.setItem('userrole', uresponsedata.userrole);
            localStorage.setItem('userid', uresponsedata.userid);
            navigate(ApiConstants.DASHBOARD_URL, { replace: true });
          }
        } else {
          setTimeout(() => {
            toast.error(LabelConstants.ALERT_LOGIN_ERROR);
          }, 200);
          return;
        }
      } else {
        setTimeout(() => {
          toast.error(LabelConstants.ALERT_USER_DOESNT_EXIST);
        }, 200);
      }
    } catch (error) {
      setTimeout(() => {
        toast.error(LabelConstants.ALERT_ERROR_PASSWORD);
      }, 200);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: 'user@myapp.com',
              password: 'Password123'
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={() => {
              loginAuth();
            }}
          >
            {({
              errors,
              handleBlur,
              handleSubmit,
              isSubmitting,
              touched
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography>
                </Box>
                {/* <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Facebook
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      fullWidth
                      startIcon={<GoogleIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Google
                    </Button>
                  </Grid>
                </Grid> */}
                <Box
                  sx={{
                    pb: 1,
                    pt: 3
                  }}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    or login with email address
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={LabelConstants.EMAIL_PLACEHOLDER}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={LabelConstants.PASSWORD_PLACEHOLDER}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Forget Password ?
                  {/* <Link component={RouterLink} to="/register" variant="h6" underline="hover">
                  </Link> */}
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;

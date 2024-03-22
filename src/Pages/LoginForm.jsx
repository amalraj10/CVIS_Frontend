import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Swal from 'sweetalert2';
import { loginAPI } from '../services/allAPI';
import { isHomeContext } from '../context/ContextShare';

const defaultTheme = createTheme();


const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const navigate = useNavigate()
  const handleLogin = async(e)=>{
    e.preventDefault()
    const {email,password} = formData
    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill the form completely!',
      });
    } else {
      const result = await loginAPI(formData);
      console.log(result);
      if (result.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Login Successful',
        }).then(() => {
          setIsHomeToken(true)
          sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser));
          sessionStorage.setItem("token", result.data.token);
    
          setFormData({
            username: '',
            email: '',
            password: '',
          });
    
          navigate('/home');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: result.response.data,
        });
      }
    }
    
  }

  const {isHomeToken,setIsHomeToken} = useContext(isHomeContext)


  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <LockOutlinedIcon />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
            style={{ backgroundColor: '#218b7a' }}
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleLogin}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
             
              <Grid item>
                <Link style={{ color: '#218b7a' }} to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginForm;

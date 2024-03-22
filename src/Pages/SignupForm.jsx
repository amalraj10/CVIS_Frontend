import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Swal from 'sweetalert2';
import { registerAPI } from '../services/allAPI';

const defaultTheme = createTheme();

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    gender: '',
    email: '',
    username:"",
    password: ''
  });
  const navigate = useNavigate()

  console.log(formData);
  const handleRegister = async(e)=>{
    e.preventDefault()

    const{username,email,password} = formData
    if (!username || !email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill the form completely!',
      });
    } else {
      const result = await registerAPI(formData);
      if (result.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: `${result.data.username} is successfully registered`,
          
        })
        .then(() => {
         
          setFormData({
            
            name: '',
            address: '',
            gender: '',
            email: '',
            username:"",
            password: ''
          });
          navigate('/owner-login');
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

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
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              autoComplete="address"
              value={formData.address}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="gender"
              label="Gender"
              name="gender"
              autoComplete="gender"
              value={formData.gender}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
              <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
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
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
            style={{ backgroundColor: '#218b7a' }}
            onClick={handleRegister}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Box>
              <Link style={{ color: '#218b7a' }} to="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignupForm;

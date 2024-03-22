import React, { useContext, useState } from 'react'
import { Container, Navbar, Nav, Badge, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserpswdChangeApi } from '../services/allAPI';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Modal from 'react-bootstrap/Modal';
import { isHomeContext } from '../context/ContextShare';

function Home() {
  const [user, setuser] = useState({
    uname: '',
    email: '',
    pswd: ''
  });
  const navigate = useNavigate();

  const { setIsHomeToken } = useContext(isHomeContext);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('existingUser');
    setIsHomeToken(false);
    navigate('/');
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const pswdChange = async (e) => {
    e.preventDefault();
    const { uname, email, pswd } = user;
    if (!uname || !email || !pswd) {
      alert('please fill the full form');
    } else {
      const result = await UserpswdChangeApi(user);
      if (result.status >= 200 && result.status < 300) {
        alert('Password Successfully Changed');
        setuser({
          uname: "",
          email: "",
          mobile: "",
          pswd: ""
        });
        navigate('/login');
      } else {
        alert(result.response.data);
      }
    }
  };

  return (
    <div>
      <Navbar className="bg-body-tertiary">
        <Navbar.Brand href="./">
          <h4 className='ms-5' style={{ fontFamily: '"Protest Guerrilla", sans-serif' }}>
            <span style={{ color: "#096d51" }}>Gear </span>
            <span style={{ color: "" }}><i class="fa-solid fa-van-shuttle fa-fade"></i></span>
            <span style={{ color: "#c20000" }}>Garage </span>
          </h4>
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link className='btn border- me-5'>
            <Link onClick={handleShow} style={{ textDecoration: "none", color: "" }}>
              <Button variant="contained" color="success">Reset Password</Button>
             
            </Link>
          </Nav.Link>
          <Nav.Link className='btn  border- me-5'>
            <Link to='/' style={{ textDecoration: "none", color: "dark" }}>
              <Button onClick={handleLogout} variant="outlined" color="error">Logout</Button>
              
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar>

      <Modal show={show} onHide={handleClose} centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>Change your Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='mb-3'>
            <TextField onChange={(e) => { setuser({ ...user, uname: e.target.value }) }} className='w-100' label="Username" variant="outlined" />
          </div>
          <div className='mb-3'>
            <TextField onChange={(e) => { setuser({ ...user, email: e.target.value }) }} className='w-100' label="Email" variant="outlined" />
          </div>
          <FormControl className='w-100' variant="outlined" onChange={(e) => { setuser({ ...user, pswd: e.target.value }) }} >
            <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label=" New Password"
            />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={pswdChange}>Confirm</Button>
        </Modal.Footer>
      </Modal>

      <Container>
        <Row className="container mt-5">
          <Col md={12} lg={6}>
            <h1 className='ms-5' style={{ fontFamily: '"Protest Guerrilla", sans-serif', marginTop: "30%", fontSize: "80px" }}>
              <span style={{ color: "#096d51", }}>Gear </span>
              <span style={{ color: "" }}><i class="fa-solid fa-van-shuttle fa-fade"></i></span>
              <span style={{ color: "#c20000" }}>Garage </span>
            </h1>
            <p style={{ marginLeft: "17%" }}>
              "Drive into Excellence: Garage Vehicle Solutions."
            </p>
          </Col>
          <Col md={12} lg={6}>
            <Card className='card shadow' style={{ width: '15rem', marginLeft: "50%" }}>
              <Link to="/form">
                <Card.Img variant="top" src="https://image.winudf.com/v2/image1/Y29tLlN1cHJhV2FsbHBhcGVycy5TcG9ydENhckhELkphcGFuZXNlRG9tZXN0aWNNYXJrZXRfc2NyZWVuXzNfMTU1Njc0MTkyNV8wNTM/screen-3.jpg?fakeurl=1&type=.jpg" />
              </Link>
              <Card.Body>
                <Card.Text style={{ textDecoration: 'none' }}>
                  To seamlessly complete your form, simply  "click" on the card provided.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
       

        </Row></Container>


    </div>
  )
}

export default Home
import React, { useState } from 'react'


import { ButtonGroup, Form } from 'react-bootstrap';
import { Col, Row } from 'react-bootstrap';
import { FormGroup, Input, TextField, TextareaAutosize } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {  InputLabel, MenuItem, Select } from '@mui/material';
import Swal from 'sweetalert2';
import ReCAPTCHA from "react-google-recaptcha";

import { carRegisterAPI } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';
function Register() {


const onchange = ()=>{

}
const navigation = useNavigate()

const [regDetails,setRegDetails] = useState({
    vname:"",
    vemail:"",
    vpsd:"",
    vyear:"",
    vnumber:"",
    vtype:"",
    vitems:[],
    vmsg:"",
    vdefects:[],
    vattacthment:[]
})
console.log(regDetails);

const [showDropdown, setShowDropdown] = useState(false);

const handleDefectSelect = (defect) => {
  if (regDetails.vdefects.includes(defect)) {
    setRegDetails(prevState => ({ ...prevState, vdefects: prevState.vdefects.filter(item => item !== defect) }));
  } else {
    setRegDetails(prevState => ({ ...prevState, vdefects: [...prevState.vdefects, defect] }));
  }
  setShowDropdown(false); 
};


const handleCancel =()=>{
  {
setRegDetails({
  vname:"",
  vemail:"",
  vpsd:"",
  vyear:"",
  vnumber:"",
  vtype:"",
  vitems:[],
  vmsg:"",
  vdefects:[],
  vattacthment:[]
})
  }
}

const handleSubmit = async(e)=>{
e.preventDefault()
const{
    vname,
    vemail,
    vpsd,
    vyear,
    vnumber,
    vtype,
    vitems,
    vmsg,
    vdefects,
    vattacthment
   
}= regDetails
if (!vname || !vemail || !vpsd || !vyear || !vnumber || !vtype || !vitems || !vmsg || !vdefects || !vattacthment) {
    let incompleteFields = [];
  
    if (!vname) incompleteFields.push('Name');
    if (!vemail) incompleteFields.push('Email');
    if (!vpsd) incompleteFields.push('Password');
    if (!vyear) incompleteFields.push('Date');
    if (!vnumber) incompleteFields.push('Number');
    if (!vtype) incompleteFields.push('Vehicle Type');
    if (!vitems) incompleteFields.push('Items Provided');
    if (!vmsg) incompleteFields.push('Message');
    if (!vdefects) incompleteFields.push('Defects');
    if (!vattacthment) incompleteFields.push('Attachment');
  
    let errorMessage = `The following fields are required:\n${incompleteFields.join(', ')}`;
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: errorMessage,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });
  } else {
    const reqBody = new FormData();
  
    reqBody.append("vname", vname);
    reqBody.append("vemail", vemail);
    reqBody.append("vpsd", vpsd);
    reqBody.append("vyear", vyear);
    reqBody.append("vnumber", vnumber);
    reqBody.append("vtype", vtype);
    reqBody.append("vitems", vitems);
    reqBody.append("vmsg", vmsg);
    reqBody.append("vdefects", vdefects);
    reqBody.append("vattacthment", vattacthment);
  
    for (let i = 0; i < vattacthment.length; i++) {
      reqBody.append("vattacthment", vattacthment[i]);
    }
  
    const reqHeader = {
      "Content-Type": "multipart/form-data",
    };
  
    const result = await carRegisterAPI(reqBody, reqHeader);
  
    if (result.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Submitted',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        navigation('/home');
      });
  
      handleCancel();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: 'Please try again later.'
      });
    }
  }
}  

  return (
    <div style={{ alignItems: "center", justifyContent: "center", display: "flex" }}>
    <div style={{ display: "flex", background: "white", width: "70%", height: "600px", marginTop: "2%", boxShadow: '5 20px 25px ' }} className="app">
      <div style={{ backgroundColor: "white", width: "100%" }} className="registration-section">
        <center className='mt-3'>
          <h1 style={{ fontFamily: '"Protest Guerrilla", sans-serif' }}>
            <span style={{ color: "#096d51" }}>Gear </span>
            <span style={{ color: "" }}><i class="fa-solid fa-van-shuttle fa-fade"></i></span>
            <span style={{ color: "#c20000" }}>Garage </span>
          </h1>
        </center>
        <center>
          <h5 style={{ fontFamily: '"Noto Sans Buhid", sans-serif', fontWeight: "100" }}> <b>Garage Vehicle Registration</b></h5>
          <hr style={{ width: "600px" }} />
        </center>
        <Row className='mt-2'>
          <Col md={4}>
            <Form.Group className='ms-2'>
              <TextField style={{ backgroundColor: "#fbffff", boxShadow: '0 1px 2px ' }} size="small" id="outlined-basic" color="success" label=" Name" variant="filled" value={regDetails.vname} onChange={(e) => setRegDetails({ ...regDetails, vname: e.target.value })} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className=''>
              <TextField style={{ backgroundColor: "#fbffff", boxShadow: '0 1px 2px ' }} size="small" id="outlined-basic" color="success" label="Email" variant="filled" value={regDetails.vemail} onChange={(e) => setRegDetails({ ...regDetails, vemail: e.target.value })} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className='me-2'>
              <TextField style={{ backgroundColor: "#fbffff", boxShadow: '0 1px 2px ' }} size="small" id="outlined-basic" color="success"  type="password" label="Password" variant="filled" value={regDetails.vpsd} onChange={(e) => setRegDetails({ ...regDetails, vpsd: e.target.value })} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className='ms-2 mt-4'>
              <Form.Label style={{ fontFamily: '"Noto Sans Buhid", sans-serif', fontWeight: "bold", margin: "0", color: "black" }}>Date :</Form.Label>
              <Input value={regDetails.vyear} onChange={(e) => setRegDetails({ ...regDetails, vyear: e.target.value })} className='ms-4 mt-2' style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} type="date" placeholder="Check-In Date" />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className='me-2 mt-4'>
              <TextField style={{ backgroundColor: "#fbffff", boxShadow: '0 1px 2px ' }} size="small" id="outlined-basic" color="success"    type="number" label="Number" variant="filled" value={regDetails.vnumber} onChange={(e) => setRegDetails({ ...regDetails, vnumber: e.target.value })} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <FormControl>
              <Form.Group className='ms-4 mt-4'>
                <Form.Label style={{ fontFamily: '"Noto Sans Buhid", sans-serif', fontWeight: "bold", margin: "0", color: "black" }}><b>Vehicle Type :</b></Form.Label>
                <RadioGroup className='' row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" color='success' value={regDetails.vtype} onChange={(e) => setRegDetails({ ...regDetails, vtype: e.target.value })}>
                  <FormControlLabel className='ms-' value="Bike" control={<Radio style={{ color: '#096d51' }} />} label="Bike" />
                  <FormControlLabel value="Car" control={<Radio style={{ color: '#096d51' }} />} label="Car" />
                </RadioGroup>
              </Form.Group>
            </FormControl>
          </Col>
        </Row>

        <Row className='ms-1 mt-4'>
          <Col md={6}>
            <FormControl component="fieldset">
              <Row style={{ marginBottom: "5px" }}>
                <Col>
                  <h6 style={{ fontFamily: '"Noto Sans Buhid", sans-serif', fontWeight: "bold" }}>Items Provided with Vehicle :</h6>
                </Col>
              </Row>
              <FormGroup aria-label="position" row>
                <FormControlLabel className='ms-3' control={<Checkbox style={{ color: '#096d51' }} />} label="Helmet" labelPlacement="start" />
                <FormControlLabel className='ms-3' control={<Checkbox style={{ color: '#096d51' }} />} label="Key" labelPlacement="start" />
                <FormControlLabel className='ms-3' control={<Checkbox style={{ color: '#096d51' }} />} label="Petrol" labelPlacement="start" />
              </FormGroup>
            </FormControl>
          </Col>

          <Col md={6}>
            <div>
              <Form.Label style={{ fontFamily: '"Noto Sans Buhid", sans-serif', fontWeight: 'bold'}}>          Message :    </Form.Label>
              <Col md={4}>
                <Form.Group className=''>
                  <TextareaAutosize
                    style={{ backgroundColor: "#fbffff", boxShadow: '0 1px 2px ', minHeight: 100, minWidth: 300 }}
                    id="outlined-basic"
                    color="success"
                    placeholder="Enter your message"
                    value={regDetails.vmsg}
                    onChange={(e) => setRegDetails({ ...regDetails, vmsg: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div>
              <Form.Label className='ms-4 mt-5 me-2' style={{ fontFamily: '"Noto Sans Buhid", sans-serif', fontWeight: "bold", color: "black" }} id="demo-row-radio-buttons-group-label"> <b>Defects : </b></Form.Label>
              <Dropdown show={showDropdown} onToggle={(isOpen) => setShowDropdown(isOpen)} style={{ boxShadow: '0 1px 1px ' }} as={ButtonGroup} className="me-2">
                <Button style={{ backgroundColor: "#d3dbdb" }} variant="success">Vehicle Defects</Button>

                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleDefectSelect("Engine misfiring")} active={regDetails.vdefects.includes("Engine misfiring")} style={{ backgroundColor: regDetails.vdefects.includes("Engine misfiring") ? '#096d51' : 'transparent' }}>Engine misfiring</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDefectSelect("Leaking radiator")} active={regDetails.vdefects.includes("Leaking radiator")} style={{ backgroundColor: regDetails.vdefects.includes("Leaking radiator") ? '#096d51' : 'transparent' }}>Leaking radiator</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDefectSelect("Flickering headlights")} active={regDetails.vdefects.includes("Flickering headlights")} style={{ backgroundColor: regDetails.vdefects.includes("Flickering headlights") ? '#096d51' : 'transparent' }}>Flickering headlights</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDefectSelect("Scratches on the exterior paint")} active={regDetails.vdefects.includes("Scratches on the exterior paint")} style={{ backgroundColor: regDetails.vdefects.includes("Scratches on the exterior paint") ? '#096d51' : 'transparent' }}>Scratches on the exterior paint</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDefectSelect("Other")} active={regDetails.vdefects.includes("Other")} style={{ backgroundColor: regDetails.vdefects.includes("Other") ? '#096d51' : 'transparent' }}>Other</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>

          <Col md={6}>
            <Form.Label className='ms-4 mt-5' style={{ fontFamily: '"Noto Sans Buhid", sans-serif', fontWeight: "bold", color: "black" }} id="demo-row-radio-buttons-group-label"> <b>Attachment : </b></Form.Label>
            <Button
              style={{ backgroundColor: "#d3dbdb", color: "black", boxShadow: '0 1px 1px' }}
              className='ms-4'
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <input
                type="file"
                onChange={(event) => {
                  setRegDetails(prevState => ({
                    ...prevState,
                    vattacthment: event.target.files
                  }));
                }}
                multiple
                style={{ display: "none" }}
              />
            </Button>
          </Col>
        </Row>
        <center className='mt-4'>
        <ReCAPTCHA
    sitekey="6LfuA6ApAAAAAFswau3IJqBULj1fWW5COtToNIfU"
    onChange={onchange}
  /></center>
        <center className='mt-2'>
          <Button style={{ backgroundColor: "#c20000" }} onClick={handleCancel} variant="contained">Cancel</Button>
          <Button className='ms-2' style={{ backgroundColor: "#096d51" }} onClick={handleSubmit} variant="contained">Submit</Button>
        </center>
      </div>
    </div>
  </div>
);
}

export default Register;


import React, { useEffect, useState } from 'react';
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
import ReCAPTCHA from "react-google-recaptcha";
import Swal from 'sweetalert2';
import { carRegisterAPI } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';

function Register() {
  const onchange = () => {}

  const navigation = useNavigate();

  const [regDetails, setRegDetails] = useState({
    vname: "",
    vemail: "",
    vpsd: "",
    vyear: "",
    vnumber: "",
    vtype: "",
    vitems: [],
    vmsg: "",
    vdefects: [],
    vattacthment: []
  });

  const [token, setToken] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    } else {
      setToken("");
    }
  }, []);

  const [showDropdown, setShowDropdown] = useState(false);

  const handleDefectSelect = (defect) => {
    if (regDetails.vdefects.includes(defect)) {
      setRegDetails(prevState => ({ ...prevState, vdefects: prevState.vdefects.filter(item => item !== defect) }));
    } else {
      setRegDetails(prevState => ({ ...prevState, vdefects: [...prevState.vdefects, defect] }));
    }
    setShowDropdown(false);
  };

  const handleCancel = () => {
    setRegDetails({
      vname: "",
      vemail: "",
      vpsd: "",
      vyear: "",
      vnumber: "",
      vtype: "",
      vitems: [],
      vmsg: "",
      vdefects: [],
      vattacthment: []
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
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
    } = regDetails;

    if (!vname || !vemail || !vpsd || !vyear || !vnumber || !vtype || !vitems.length || !vmsg || !vdefects.length || !vattacthment.length) {
      let incompleteFields = [];

      if (!vname) incompleteFields.push('Name');
      if (!vemail) incompleteFields.push('Email');
      if (!vpsd) incompleteFields.push('Password');
      if (!vyear) incompleteFields.push('Date');
      if (!vnumber) incompleteFields.push('Number');
      if (!vtype) incompleteFields.push('Vehicle Type');
      if (!vitems.length) incompleteFields.push('Items Provided');
      if (!vmsg) incompleteFields.push('Message');
      if (!vdefects.length) incompleteFields.push('Defects');
      if (!vattacthment.length) incompleteFields.push('Attachment');

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
      reqBody.append("vitems", vitems.join(', '));
      reqBody.append("vmsg", vmsg);
      reqBody.append("vdefects", vdefects.join(', '));

      for (let i = 0; i < vattacthment.length; i++) {
        reqBody.append("vattacthment", vattacthment[i]);
      }

      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        };

        const result = await carRegisterAPI(reqBody, reqHeader);

        if (result.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Submitted',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            navigation('/details');
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
  };

  return (
    <div className="container mt-3">
      <h1 className="text-center" style={{ fontFamily: '"Protest Guerrilla", sans-serif' }}>
        <span style={{ color: "#096d51" }}>Gear </span>
        <span style={{ color: "#c20000" }}>Garage </span>
      </h1>
      <h5 className="text-center" style={{ fontFamily: '"Noto Sans Buhid", sans-serif', fontWeight: "100" }}> <b>Garage Vehicle Registration</b></h5>
      <hr />
      <Form onSubmit={handleSubmit}>
        <Row className='mt-2'>
          <Col md={4}>
            <TextField fullWidth size="small" color="success" label=" Name" variant="filled" value={regDetails.vname} onChange={(e) => setRegDetails({ ...regDetails, vname: e.target.value })} />
          </Col>
          <Col md={4}>
            <TextField fullWidth size="small" color="success" label="Email" variant="filled" value={regDetails.vemail} onChange={(e) => setRegDetails({ ...regDetails, vemail: e.target.value })} />
          </Col>
          <Col md={4}>
            <TextField fullWidth size="small" color="success" type="password" label="Password" variant="filled" value={regDetails.vpsd} onChange={(e) => setRegDetails({ ...regDetails, vpsd: e.target.value })} />
          </Col>
        </Row>

        <Row className='mt-5'>
          <Col md={4}>
            <Form.Label style={{ fontFamily: '"Noto Sans Buhid", sans-serif', fontWeight: "bold" }}>Date :</Form.Label>
            <Input 
              value={regDetails.vyear} 
              onChange={(e) => setRegDetails({ ...regDetails, vyear: e.target.value })} 
              className='ms-4 mt-2' 
              type="date" 
              placeholder="Check-In Date" 
            />
          </Col>
          <Col md={3}>
            <TextField fullWidth size="small" color="success" type="number" label="Number" variant="filled" value={regDetails.vnumber} onChange={(e) => setRegDetails({ ...regDetails, vnumber: e.target.value })} />
          </Col>
          <Col style={{marginLeft:"6%"}} md={3}>
            <FormControl className='ms-5' >
              <Form.Label style={{ fontFamily: '"Noto Sans Buhid", sans-serif', fontWeight: "bold" }}><b>Vehicle Type :</b></Form.Label>
              <RadioGroup className='' row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" color='success' value={regDetails.vtype} onChange={(e) => setRegDetails({ ...regDetails, vtype: e.target.value })}>
                <FormControlLabel className='ms-' value="Bike" control={<Radio style={{ color: '#096d51' }} />} label="Bike" />
                <FormControlLabel value="Car" control={<Radio style={{ color: '#096d51' }} />} label="Car" />
              </RadioGroup>
            </FormControl>
          </Col>
        </Row>

        <Row className='ms-1 mt-4'>
          <Col md={3}>
            <FormControl component="fieldset">
              <Row style={{ marginBottom: "5px" }}>
                <Col>
                  <h6 style={{ fontFamily: '"Noto Sans Buhid", sans-serif', fontWeight: "bold" }}>Items Provided with Vehicle :</h6>
                </Col>
              </Row>
              <FormGroup aria-label="position" row>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    className='ms-3'
                    control={<Checkbox style={{ color: '#096d51' }} onChange={(e) => e.target.checked ? setRegDetails(prevDetails => ({ ...prevDetails, vitems: [...prevDetails.vitems, "Helmet"] })) : setRegDetails(prevDetails => ({ ...prevDetails, vitems: prevDetails.vitems.filter(item => item !== "Helmet") }))} />}
                    label="Helmet"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    className='ms-3'
                    control={<Checkbox style={{ color: '#096d51' }} onChange={(e) => e.target.checked ? setRegDetails(prevDetails => ({ ...prevDetails, vitems: [...prevDetails.vitems, "Key"] })) : setRegDetails(prevDetails => ({ ...prevDetails, vitems: prevDetails.vitems.filter(item => item !== "Key") }))} />}
                    label="Key"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    className='ms-3'
                    control={<Checkbox style={{ color: '#096d51' }} onChange={(e) => e.target.checked ? setRegDetails(prevDetails => ({ ...prevDetails, vitems: [...prevDetails.vitems, "Petrol"] })) : setRegDetails(prevDetails => ({ ...prevDetails, vitems: prevDetails.vitems.filter(item => item !== "Petrol") }))} />}
                    label="Petrol"
                    labelPlacement="start"
                  />
                </FormGroup>
              </FormGroup>
            </FormControl>
          </Col>
          <Col md={3}>
            <div>
              <Form.Label className=' mt-5 me-2' style={{ fontFamily: '"Noto Sans Buhid", sans-serif', fontWeight: "bold", color: "black" }} id="demo-row-radio-buttons-group-label"> <b>Defects : </b></Form.Label>
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
          
          <Col md={3}>
            <Form.Label className='ms-4 mt-5' style={{ fontFamily: '"Noto Sans Buhid", sans-serif', fontWeight: "bold", color: "black" }} id="demo-row-radio-buttons-group-label"> <b>Attachment : </b></Form.Label>
            <Button
              fullWidth
              style={{ backgroundColor: "#d3dbdb", color: "black", boxShadow: '0 1px 1px',width:"40%" }}
              className='ms-4'
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload
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

          <Col md={3}>
            <div>
              <Form.Label style={{ fontFamily: '"Noto Sans Buhid", sans-serif', fontWeight: 'bold'}}>Message:</Form.Label>
              <Col md={2}>
                <Form.Group className=''>
                <TextareaAutosize
  minRows={3}
  style={{ backgroundColor: "#fbffff", boxShadow: '0 1px 2px ', minHeight: 50, minWidth: 350 }}
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

<center className='mt-4'>
<ReCAPTCHA
  sitekey="6LfuA6ApAAAAAFswau3IJqBULj1fWW5COtToNIfU"
  onChange={onchange}
/>
</center>
<center className='mt-2'>
<Button style={{ backgroundColor: "#c20000" }} onClick={handleCancel} variant="contained">Cancel</Button>
<Button className='ms-2' style={{ backgroundColor: "#096d51" }} type="submit" variant="contained">Submit</Button>
</center>
</Form>
</div>

);
}

export default Register;

import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { carDetailsAPI } from '../services/allAPI';
import { BASE_URL } from '../services/baseurl';

function Details() {
  const [details, setDetails] = useState([]);

  const getDetails = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");

      const reqHeader = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      try {
        const result = await carDetailsAPI(reqHeader);
        console.log(result);
        if (result.status === 200) {
          setDetails(result.data);
        }
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div className="container">
      <div className="mt-5">
        <h1 className="text-center mb-5" style={{ color: '#1e1e38', fontFamily: "'Josefin Sans', sans-serif" }}>
          <span style={{ color: '#218b7a' }}>R</span>egistered <span style={{ color: '#218b7a' }}>V</span>echile <span style={{ color: '#218b7a' }}>D</span>etails
        </h1>
        <div className="table-responsive">
          <Table striped bordered hover className="mx-auto" style={{ maxWidth: '90%', fontSize: '0.8em' }}>
            <thead >
              <tr>
                <th style={{ backgroundColor: '#218b7a' }}>Name</th>
                <th style={{ backgroundColor: '#218b7a' }}>Email</th>
                <th style={{ backgroundColor: '#218b7a' }}>Password</th>
                <th style={{ backgroundColor: '#218b7a' }}>Date</th>
                <th style={{ backgroundColor: '#218b7a' }}>Number</th>
                <th style={{ backgroundColor: '#218b7a' }}>Type</th>
                <th style={{ backgroundColor: '#218b7a' }}>Items</th>
                <th style={{ backgroundColor: '#218b7a' }}>Message</th>
                <th style={{ backgroundColor: '#218b7a' }}>Defects</th>
                <th style={{ backgroundColor: '#218b7a' }}>Attachment</th>
              </tr>
            </thead>
            <tbody>
              {details?.length > 0 ? (
                details?.map((item) => (
                  <tr key={item._id}>
                    <td>{item.vname}</td>
                    <td>{item.vemail}</td>
                    <td>{item.vpsd}</td>
                    <td>{item.vyear}</td>
                    <td>{item.vnumber}</td>
                    <td>{item.vtype}</td>
                    <td>{item.vitems}</td>
                    <td>{item.vmsg}</td>
                    <td>{item.vdefects}</td>
                    <td>
                      {item.vattacthment && item.vattacthment.length > 0 && (
                        item.vattacthment.map((image, index) => (
                          <img key={index} src={`${BASE_URL}/uploads/${image}`} alt={`Image ${index + 1}`} className="img-fluid mr-2" style={{ maxWidth: '100px', height: 'auto' }} />
                        ))
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='10' className="text-center">Nothing to display</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Details;

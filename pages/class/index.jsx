import React, { useState, useEffect } from 'react'
import { InputGroup, Form, Button, Table, Pagination } from 'react-bootstrap'
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
// Components
import SubNavbar from '../../components/SubNavbar'
import AddModal from '../../components/AddModal';
import { getCookie } from "cookies-next";
import axios from 'axios';

const Index = () => {

  // Dont distract
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Initiate State
  const [allClass, setAllClass] = useState();
  const [newClass, setNewClass] = useState({
    nama_class: ""
  });
  const [editClass, setEditClass] = useState([]);
  const [idClass, setIdClass] = useState();


  // Get All Class
  const getClass = async () => {
    var config = {
      method: "get",
      url: "https://grupproject.site/class",
      // headers: {
      //   Authorization: `Bearer ${getCookie("token")}`
      // },
    };

    await axios(config)
      .then((response) => {
        console.log(response.data.Data);
        setAllClass(response.data.Data);
        console.log(allClass)
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    getClass();
  }, []);

  // Add new class & Edit class
  const handleInput = (e) => {
    setNewClass(e.target.value);
    setEditClass(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (idClass) {
      var data = {
        nama_class: editClass
      };
      var config = {
        method: "put",
        url: `https://grupproject.site/class/${idClass}`,
        headers: {
          Authorization: `Bearer ${getCookie("token")}`
        },
        data: data
      };

      axios(config)
        .then((response) => {
          alert("Edit class success!");
          getClass();
          handleClose();
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    } else {
      var data = {
        nama_class: newClass
      };
      var config = {
        method: "post",
        url: "https://grupproject.site/class",
        headers: {
          Authorization: `Bearer ${getCookie("token")}`
        },
        data: data
      };

      axios(config)
        .then(() => {
          alert("Add class success!");
          getClass();
          handleClose();
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  };

  const handleEdit = ({ id }) => {
    handleShow()
    setIdClass(id)
  }

  // handle delete
  const handleDelete = (id) => {
    var config = {
      method: "delete",
      url: `https://grupproject.site/class/${id}`,
      headers: {
        Authorization: `Bearer ${getCookie("token")}`
      }
    };
    axios(config)
      .then(() => {
        console.log(idClass)
        alert("Class deleted!");
        getClass();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  return (
    <div style={{ backgroundColor: '#F9F9F9' }}>
      <div>
        <div className='px-3'>
          <SubNavbar
            title="Class List"
          />
          <div className='bg-white mt-3 p-4'>
            <InputGroup style={{ width: '300px' }}>
              <InputGroup.Text id='basic-addon1' style={{ backgroundColor: '#17345F', color: 'white' }}>Search</InputGroup.Text>
              <Form.Control
                placeholder='search here...'
                aria-label='Search'
                aria-describedby='basic-addon1'
              />
            </InputGroup>
            <div style={{ paddingTop: '15px' }}>
              <Button
                onClick={handleShow}
                style={{
                  width: '300px',
                  backgroundColor: '#F47624',
                  borderColor: '#F47624'
                }}>
                Add New Class
              </Button>
            </div>
            <div style={{ paddingTop: '30px' }}>
              <Table responsive>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {allClass?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.nama_class}</td>
                        <td>
                          <a onClick={() => handleEdit(item)}><BiEditAlt style={{ color: 'black' }} /></a>
                        </td>
                        <td><MdDeleteOutline onClick={() => handleDelete(item.id)} /></td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </div>
            <div className='pt-3'>
              <Pagination className='justify-content-end'>
                <Pagination.Prev>Prev</Pagination.Prev>
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item active>{3}</Pagination.Item>
                <Pagination.Item>{4}</Pagination.Item>
                <Pagination.Item>{5}</Pagination.Item>
                <Pagination.Next>Next</Pagination.Next>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      <AddModal
        add="class"
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default Index
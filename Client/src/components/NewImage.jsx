import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { addImage } from "../Redux/apiCalls";
import { useDispatch } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import axios from 'axios';


const Modelss = () => {

  const [files, setFile] = useState(null);
  const [inputs, setInputs] = useState({});

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  console.log(files)

  const handleClick =  (e) => {
    e.preventDefault();

    const fileName = new Date().getTime() + files.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, files);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const image = {  ...inputs, image: downloadURL  };

          console.log(image)
          try {
            const res = axios.post('http://localhost:5000/api/image', image)
            console.log(res.data)
          } catch (e) {
            alert(e)
          }
        //   addImage(image, dispatch);
        });
      }
    );

  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        new image
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                autoFocus
                name='title'
                onChange={handleChange}
              />
            </Form.Group>
            
            <Form.Group>
            <Form.Label>picture</Form.Label>
            <input type='file' id='file'  onChange={e=>setFile(e.target.files[0])}/>
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Modelss

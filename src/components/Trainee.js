import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import DashboardIcon from '@mui/icons-material/Dashboard';
import './style.css'


export default function Trainee() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [course, setCourse] = useState('');
    const [designation, setDesignation] = useState('');
    const [organisation, setOrganisation] = useState('');
    const [trainees, setTrainees] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openRegisterModal, setOpenRegisterModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedTrainee, setSelectedTrainee] = useState(null);

    const handleRegisterModalOpen = () => {
        setOpenRegisterModal(true);
    };

    const handleEditModalOpen = (trainee) => {
        setSelectedTrainee(trainee);
        setOpenEditModal(true);
    };

    const handleModalClose = () => {
        setOpenRegisterModal(false);
        setOpenEditModal(false);
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        const student = { name, email, course, designation, organisation };
        const token = localStorage.getItem('jwtToken');
      
        // Check if token exists
        if (!token) {
          console.error('JWT token not found. Please log in to access trainee data.');
          // Handle the case where there's no token (e.g., redirect to login)
          return;
        }
      
        // Create Axios instance with default headers (optional)
        const axiosInstance = axios.create({
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(student);
        axiosInstance.post("http://localhost:8080/trainee/add", student)
            .then(() => {
                alert("Successfully registered");
                setName('');
                setEmail('');
                setCourse('');
                setDesignation('');
                setOrganisation('');
                setOpenRegisterModal(false);
                loadData();
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Failed to register trainee.");
            });
    };

    const handleEditSubmit = () => {
        const token = localStorage.getItem('jwtToken');
      
        // Check if token exists
        if (!token) {
          console.error('JWT token not found. Please log in to access trainee data.');
          // Handle the case where there's no token (e.g., redirect to login)
          return;
        }
      
        // Create Axios instance with default headers (optional)
        const axiosInstance = axios.create({
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const url = `http://localhost:8080/trainee/update/${selectedTrainee.id}`;
        axiosInstance.put(url, selectedTrainee)
            .then(() => {
                alert("Successfully updated");
                setOpenEditModal(false);
                setSelectedTrainee(null);
                loadData();
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Failed to update trainee.");
            });
    };

    const handleDeleteClick = (trainee) => {

        
        const traineeId = trainee.id;
        const token = localStorage.getItem('jwtToken');
      
        // Check if token exists
        if (!token) {
          console.error('JWT token not found. Please log in to access trainee data.');
          // Handle the case where there's no token (e.g., redirect to login)
          return;
        }
      
        // Create Axios instance with default headers (optional)
        const axiosInstance = axios.create({
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const deleteUrl = `http://localhost:8080/trainee/delete/${traineeId}`;

        axiosInstance.delete(deleteUrl)
            .then(response => {
                if (response.status === 200) {
                    alert('Trainee deleted successfully.');
                    loadData();
                } else {
                    alert('Failed to delete trainee.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to delete trainee.');
            });
    };

    const loadData = () => {
        // Retrieve the JWT token from storage (replace with your storage mechanism)
        const token = localStorage.getItem('jwtToken');
      
        // Check if token exists
        if (!token) {
          console.error('JWT token not found. Please log in to access trainee data.');
          // Handle the case where there's no token (e.g., redirect to login)
          return;
        }
      
        // Create Axios instance with default headers (optional)
        const axiosInstance = axios.create({
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      
        // Make the GET request using Axios instance
        axiosInstance.get("http://localhost:8080/trainee/getall")
          .then(response => {
            if (response.status === 200) {
              setTrainees(response.data);
            } else {
              alert("Failed to fetch trainee data.");
              // Handle potential authorization errors (e.g., 401 Unauthorized)
            }
          })
          .catch(error => {
            console.error('Error:', error);
            alert("Failed to fetch trainee data.");
          });
      };

      const logout = async () => {
        try {
          // Retrieve the JWT token from storage
          const token = localStorage.getItem('jwtToken');
      
          if (!token) {
            console.error('JWT token not found. Please log in again.');
            return; // Handle the case where there's no token
          }
      
          // Create Axios instance with default headers (optional)
          const axiosInstance = axios.create({
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
      
          // Send POST request to logout endpoint with optional refresh token (if applicable)
          const response = await axiosInstance.post('http://localhost:8080/logout', {
            refreshToken: localStorage.getItem('refreshToken') // Optional: Include refresh token
          });
      
          if (response.status === 200) {
            // Handle successful logout response
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('refreshToken'); // Remove refresh token as well
            window.location.href = '/login'; // Redirect to login page
          } else {
            console.error('Logout request failed:', response.statusText);
            // Handle potential errors (e.g., display user-friendly error message)
          }
        } catch (error) {
          console.error('Error during logout:', error);
          // Handle errors (e.g., network issues, unexpected server response)
        }
      };
      
    useEffect(() => {
        loadData();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Container maxWidth="md">
            <div style={{ display: 'flex' }}>
                <br/>
                <div style={{ width: '0%' }}>
                    {/* Sidebar */}
                    <br/>
                                  </div>
                <div style={{ width: '100%' }}>
                    <br />
                    <Button variant="contained" onClick={handleRegisterModalOpen} style={{ marginBottom: '5px', float: 'left' }}><AddCircleOutlineIcon></AddCircleOutlineIcon>&nbsp;Add Trainee</Button>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Course</TableCell>
                                        <TableCell>Designation</TableCell>
                                        <TableCell>Organisation</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {trainees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((trainee) => (
                                        <TableRow key={trainee.id}>
                                            <TableCell>{trainee.id}</TableCell>
                                            <TableCell>{trainee.name}</TableCell>
                                            <TableCell>{trainee.email}</TableCell>
                                            <TableCell>{trainee.course}</TableCell>
                                            <TableCell>{trainee.designation}</TableCell>
                                            <TableCell>{trainee.organisation}</TableCell>
                                            <TableCell>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <EditSharpIcon style={{ marginRight: '5px' }} onClick={() => handleEditModalOpen(trainee)} />
                                                    <DeleteOutlineSharpIcon onClick={() => handleDeleteClick(trainee)} />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5]}
                            component="div"
                            count={trainees.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </div>
               
            </div>
            {/* Registration Modal */}
            <Modal open={openRegisterModal} onClose={handleModalClose}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
                    <h2>Register Trainee</h2>
                    <form autoComplete="off" onSubmit={handleRegisterSubmit}>
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            style={{ marginBottom: '10px' }}
                            required
                        />
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            style={{ marginBottom: '10px' }}
                        />
                        <TextField
                            id="course"
                            label="Course Name"
                            variant="outlined"
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            fullWidth
                            style={{ marginBottom: '10px' }}
                        />
                        <TextField
                            id="designation"
                            label="Designation"
                            variant="outlined"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            fullWidth
                            style={{ marginBottom: '10px' }}
                        />
                        <TextField
                            id="organisation"
                            label="Organisation"
                            variant="outlined"
                            value={organisation}
                            onChange={(e) => setOrganisation(e.target.value)}
                            fullWidth
                            style={{ marginBottom: '20px' }}
                        />
                        <Button variant="contained" color="primary" type="submit">Submit</Button>
                    </form>
                </div>
            </Modal>
            {/* Edit Modal */}
            <Modal open={openEditModal} onClose={handleModalClose}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
                    <h2>Edit Trainee</h2>
                    <form autoComplete="off" onSubmit={handleEditSubmit}>
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            value={selectedTrainee ? selectedTrainee.name : ''}
                            onChange={(e) => setSelectedTrainee({ ...selectedTrainee, name: e.target.value })}
                            fullWidth
                            style={{ marginBottom: '10px' }}
                            required
                        />
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            value={selectedTrainee ? selectedTrainee.email : ''}
                            onChange={(e) => setSelectedTrainee({ ...selectedTrainee, email: e.target.value })}
                            fullWidth
                            style={{ marginBottom: '10px' }}
                        />
                        <TextField
                            id="course"
                            label="Course Name"
                            variant="outlined"
                            value={selectedTrainee ? selectedTrainee.course : ''}
                            onChange={(e) => setSelectedTrainee({ ...selectedTrainee, course: e.target.value })}
                            fullWidth
                            style={{ marginBottom: '10px' }}
                        />
                        <TextField
                            id="designation"
                            label="Designation"
                            variant="outlined"
                            value={selectedTrainee ? selectedTrainee.designation : ''}
                            onChange={(e) => setSelectedTrainee({ ...selectedTrainee, designation: e.target.value })}
                            fullWidth
                            style={{ marginBottom: '10px' }}
                        />
                        <TextField
                            id="organisation"
                            label="Organisation"
                            variant="outlined"
                            value={selectedTrainee ? selectedTrainee.organisation : ''}
                            onChange={(e) => setSelectedTrainee({ ...selectedTrainee, organisation: e.target.value })}
                            fullWidth
                            style={{ marginBottom: '20px' }}
                        />
                        <Button variant="contained" color="primary" onClick={handleEditSubmit}>
                            Updated
                        </Button>
                        <Button variant="contained" onClick={handleModalClose}>
                            Cancel
                        </Button>
                    </form>
                </div>
            </Modal>
        </Container>
    );
}

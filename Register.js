import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import Modal from '@mui/material/Modal';


export default function Trainee() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [course, setCourse] = useState('');
    const [designation, setDesignation] = useState('');
    const [organisation, setOrganisation] = useState('');
    const [trainees, setTrainees] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [tabValue, setTabValue] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [selectedTrainee, setSelectedTrainee] = useState(null);

    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleClick = (e) => {
        e.preventDefault();
        
        // Check if any of the fields are empty
        if (!name || !email || !course || !designation || !organisation) {
            alert("Please fill out all fields.");
            return;
        }

        const student = { name, email, course, designation, organisation };
        console.log(student);

        fetch("http://localhost:8080/trainee/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
        }).then(() => {
            alert("Successfully registered");
            // Clear form fields
            setName('');
            setEmail('');
            setCourse('');
            setDesignation('');
            setOrganisation('');
            console.log("New Student added");
        });
    };
    const handleEditClick = (trainee) => {
      setSelectedTrainee(trainee);
      
      setOpenModal(true);
  };
  const handleDeleteClick = (trainee) => {
   // arlert("ddd")
   const traineeId = trainee.id;
   // alert(traineeId); // Alert the ID of the selected trainee
   // setSelectedTrainee(trainee);
    const deleteUrl = 'http://localhost:8080/trainee/delete/'+traineeId;

fetch(deleteUrl, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => {
    // Check if the response is successful (status code 200 OK)
    if (response.ok) {
        // Handle successful deletion
        alert('Trainee deleted successfully.');
    } else {
        // Handle unsuccessful deletion (404 Not Found, etc.)
        alert('Failed to delete trainee.');
    }
})
.catch(error => {
    // Handle network error or fetch request error
    console.error('Error:', error);
});
   
};

  const handleCloseModal = () => {
      setOpenModal(false);
      setSelectedTrainee(null);
  };

  const handleEdit = () => {
    const url = 'http://localhost:8080/trainee/update/'+selectedTrainee.id;

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedTrainee)
    })
    .then(response => {
        // Handle response
        alert(selectedTrainee)
    })
    .catch(error => {
        // Handle error
    });
};

    useEffect(() => {
        fetch("http://localhost:8080/trainee/getall")
            .then(res => res.json())
            .then((result) => {
                setTrainees(result);
            });
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
           

            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Tabs value={tabValue} onChange={handleChangeTab} centered>
                    <Tab label="Register Trainee" />
                    <Tab label="Trainee List" />
                </Tabs>
                {tabValue === 0 && (
                    <form autoComplete="off">
                        <TextField
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            style={{ marginBottom: '10px' }}
                            required
                        />
                        <TextField
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            style={{ marginBottom: '10px' }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Course Name"
                            variant="outlined"
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            fullWidth
                            style={{ marginBottom: '10px' }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Designation"
                            variant="outlined"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            fullWidth
                            style={{ marginBottom: '10px' }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Organisation"
                            variant="outlined"
                            value={organisation}
                            onChange={(e) => setOrganisation(e.target.value)}
                            fullWidth
                            style={{ marginBottom: '20px' }}
                        />
                        <Button variant="contained"  onClick={handleClick} fullWidth>
                            Submit
                        </Button>
                    </form>
                )}
                {tabValue === 1 && (
                    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
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
                                            <TableCell><div style={{ display: 'flex', alignItems: 'center' }}>
                                                                  <EditSharpIcon style={{ marginRight: '5px' }} onClick={() => handleEditClick(trainee)}  />
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
                )}
            </Paper>
            <Modal open={openModal} onClose={handleCloseModal}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
                    <h2>Edit Trainee</h2>
                    <form autoComplete="off">
                    <TextField
                            id="outlined-basic"
                            label="id"
                            variant="outlined"
                            value={selectedTrainee ? selectedTrainee.id : ''}
                            onChange={(e) => setSelectedTrainee(prevState => ({
                              ...prevState,
                              id: e.target.value
                          }))}
                            fullWidth
                            style={{ marginBottom: '10px' }}
                            required
                        />
                        <TextField
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            value={selectedTrainee ? selectedTrainee.name : ''}
                            onChange={(e) => setSelectedTrainee(prevState => ({
                              ...prevState,
                              name: e.target.value
                          }))}
                            fullWidth
                            style={{ marginBottom: '10px' }}
                            required
                        />
                        <TextField
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            value={selectedTrainee ? selectedTrainee.email : ''}
                            onChange={(e) => setSelectedTrainee(prevState => ({
                                ...prevState,
                                email: e.target.value
                            }))}
                            fullWidth
                            style={{ marginBottom: '10px' }}
                            required
                        />
                        <TextField
                            id="outlined-basic"
                            label="Course Name"
                            variant="outlined"
                            value={selectedTrainee ? selectedTrainee.course : ''}
                            onChange={(e) => setSelectedTrainee(prevState => ({
                                ...prevState,
                                course: e.target.value
                            }))}
                            fullWidth
                            style={{ marginBottom: '10px' }}
                            required
                        />
                        <TextField
                            id="outlined-basic"
                            label="Designation
                            "
                            variant="outlined"
                            value={selectedTrainee ? selectedTrainee.designation : ''}
                            onChange={(e) => setSelectedTrainee(prevState => ({
                                ...prevState,
                                designation: e.target.value
                            }))}
                            fullWidth
                            style={{ marginBottom: '10px' }}
                            required
                        />
                        <TextField
                            id="outlined-basic"
                            label="Organisation"
                            variant="outlined"
                            value={selectedTrainee ? selectedTrainee.organisation : ''}
                            onChange={(e) => setSelectedTrainee(prevState => ({
                                ...prevState,
                                organisation: e.target.value
                            }))}
                            fullWidth
                            style={{ marginBottom: '10px' }}
                            required
                        />
                        {/* Add other fields similarly */}
                        <Button variant="contained" color="primary" onClick={handleEdit}>
                            Updated
                        </Button>
                        <Button variant="contained" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                    </form>
                </div>
            </Modal>
        </Container>
    );
}

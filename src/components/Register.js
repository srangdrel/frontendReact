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


export default function Register() {
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

        fetch("http://localhost:8080/trainee_register", {
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
   
    
    return (
        <Container maxWidth="md">
           

            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                
                
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
              </Paper>  
    
        </Container>
    );
}

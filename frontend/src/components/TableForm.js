import React, { useState, useEffect } from 'react';
import { Box, Button, InputLabel, Stack, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import { MaterialReactTable } from 'material-react-table';
import TablePerson from './TablePerson';
import TableMascotas from './TableMascotas';
export default function TableForm() {
    const [listForms, setListform] = useState([]);
    useEffect(() => {
        loadListForms()
    }, [])
    const loadListForms = () => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch("https://localhost:7240/api/FormsLists", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                const data = JSON.parse(result);
                
                console.log(data)
                setListform(data)
            })
            .catch((error) => {
                console.log(error)
                    Swal.fire({ icon: 'warning', text: 'Oops, hubo un problema de conexión. Verifica tu conexión a la base de datos e inténtalo nuevamente' });
               
            });
    }
    const [open, setOpen] = useState(false)
    const [currentForm, setCurrentForm] = useState(null);
    const [formFields, setFormFields] = useState([]);
    const [formData, setFormData] = useState({});
    const loadForm = async (formType) => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        const fetchFormFields = async (url, formName) => {
            try {
                const response = await fetch(url, requestOptions);
                const result = await response.json();
                console.log(result);
                setFormFields(result);
                setCurrentForm(formName);
            } catch (error) {
                console.error("Error al cargar los datos:", error);
                console.log(error)
                    Swal.fire({ icon: 'warning', text: 'Oops, hubo un problema de conexión. Verifica tu conexión a la base de datos e inténtalo nuevamente' });
                setFormFields([]);
                setCurrentForm("");
            }
        };
        let url = "";
        let formName = "";
        switch (formType.formName) {
            case "Persona":
                url = "https://localhost:7240/api/PersonFields/";
                formName = "Persona";
                break;
            case "Mascota":
                url = "https://localhost:7240/api/MascotaFields/";
                formName = "Mascota";
                break;
            default:
                setFormFields([]);
                setCurrentForm("");
                return;
        }
        await fetchFormFields(url, formName);
        setFormData({});
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const renderInputs = () => {
        return formFields.map((field, index) => (
            <div key={index}>
                <InputLabel>{field.label}</InputLabel>
                <TextField
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleInputChange}
                />
            </div>
        ));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(currentForm, 'currentForm');
        const urls = {
            Mascota: "https://localhost:7240/api/Mascotas",
            Persona: "https://localhost:7240/api/Person",
        };
        const url = urls[currentForm];

        if (!url) {
            console.error("Formulario no válido");
            return;
        }
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(formData),
            redirect: "follow"
        };
        fetch(url, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                const data = JSON.parse(result);
                if (data?.status !== 400) {
                    Swal.fire({ icon: 'success', text: 'Formulario subido con éxito' });
                } else {
                    Swal.fire({ icon: 'warning', text: 'Ups, inténtelo más tarde' });
                }
                console.log(data);
            })
            .catch((error) => console.error("Error:", error));
        console.log("Datos enviados:", formData);
    };
    return (
        <div>
            <Stack direction="row" spacing={2}>
                {listForms.map((row) => (
                    <Button key={row.id} variant="contained" onClick={() => loadForm(row)}>{row.formName}</Button>
                ))}
            </Stack>
            {currentForm && (
                <Box pt={4}>
                    <Typography variant='h6'>Datos de {currentForm}</Typography>
                    <form onSubmit={handleSubmit}>
                        {renderInputs()}
                        <Box p={2}></Box>
                        <Button variant='contained' color='success' type="submit">Enviar Formulario</Button>
                        <Box py={2}>
                            <Button onClick={() => setOpen(!open)} variant='outlined'>{open ? 'Ocultar Información' : 'Mostrar Información'}</Button>
                        </Box>
                        {
                            open && <div>
                                {currentForm === "Persona" ?
                                    <TablePerson /> :
                                    <TableMascotas />
                                }
                            </div>
                        }
                    </form>
                </Box>
            )}
        </div>
    );
}
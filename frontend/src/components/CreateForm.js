import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Select, Stack, TextField } from '@mui/material';
import Swal from 'sweetalert2';
const emails = ['username@gmail.com', 'user02@gmail.com'];
function DynamicForm(props) {
  const { onClose, selectedValue, open } = props;
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    onClose(selectedValue);
  };
  const [inputs, setInputs] = React.useState([
    { id: 1, type: 'text', value: '' }
  ]);
  const addInput = () => {
    setInputs([
      ...inputs,
      { id: inputs.length + 1, type: 'text', value: '' }
    ]);
  };
  const handleTypeChange = (id, newType) => {
    setInputs(inputs.map(input =>
      input.id === id ? { ...input, type: newType } : input
    ));
  };
  const handleValueChange = (id, newValue) => {
    setInputs(inputs.map(input =>
      input.id === id ? { ...input, value: newValue } : input
    ));
  };
  const removeInput = (id) => {
    setInputs(inputs.filter(input => input.id !== id));
  };
  const onSubmit = () => {
    setLoading(true)
    const today = new Date();
    const formattedDate = today.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    const json = {
      ...inputs,
      fecha: formattedDate
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      "id": 0,
      "formName": nombre,
      "creationDate": formattedDate,
      "updateDate": ""
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("https://localhost:7240/api/FormsLists", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const data = JSON.parse(result);
        console.log(data)
        Swal.fire({ icon: 'success', text: 'Formulario subido con éxito' })
        onClose(selectedValue)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        console.error(error)});
    setNombre("")
    setInputs([
      ...inputs,
      { id: inputs.length + 1, type: 'text', value: '' }
    ])
  }
  return (
    <Dialog fullWidth onClose={handleClose} open={open}>
      <DialogTitle>Crear Formulario</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <TextField
            label='Nombre del formulario'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          {inputs.map((input) => (
            <div key={input.id} style={{ marginBottom: '10px' }}>
              <Select
                value={input.type}
                onChange={(e) => handleTypeChange(input.id, e.target.value)}
              >
                <MenuItem value="text">Texto</MenuItem >
                <MenuItem value="number">Numero</MenuItem >
                <MenuItem value="date">Fecha</MenuItem >
              </Select>
              <TextField
                type={input.type}
                label='Nombre del campo'
                value={input.value}
                onChange={(e) => handleValueChange(input.id, e.target.value)}
                style={{ marginLeft: '10px' }}
              />
              <IconButton
                type="button"
                onClick={() => removeInput(input.id)}
                style={{ marginLeft: '10px' }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <Button type="button" onClick={addInput}>
            Agregar Campo
          </Button>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onSubmit()} variant='contained' color='success'>Crear Formulario</Button>
      </DialogActions>
    </Dialog>
  );
}
DynamicForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
export default function CreateForm() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  return (
    <div>
      <Button variant='contained' onClick={handleClickOpen}>
        Crear Formulario
      </Button>
      <DynamicForm
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
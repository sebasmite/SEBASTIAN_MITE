import React, { useState, useEffect, useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
export default function TablePerson() {
    const [data, setList] = useState([]);
    useEffect(() => {
        loadListForms()
    }, [])
    const loadListForms = () => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        fetch("https://localhost:7240/api/Person", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                const data = JSON.parse(result);
                console.log(data)
                setList(data)
            })
            .catch((error) => console.error(error));
    }
    const columns = useMemo(
        () => [
            {
                accessorKey: 'id', //access nested data with dot notation
                header: 'id',
                size: 150,
            },

            {
                accessorKey: 'nombres', //access nested data with dot notation
                header: 'Nombres',
                size: 150,
            },
            {
                accessorKey: 'fechaNacimiento', //access nested data with dot notation
                header: 'Fecha de Nacimiento',
                size: 150,
            },
            {
                accessorKey: 'estatura', //access nested data with dot notation
                header: 'Estatura',
                size: 150,
            },
        ],
        [],
    );
    const table = useMaterialReactTable({
        columns,
        data, 
    });
    return (
        <MaterialReactTable table={table} />
    );
}
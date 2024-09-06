import React, { useState, useEffect, useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import Swal from 'sweetalert2';
export default function TableMascotas() {
    const [data, setList] = useState([]);
    useEffect(() => {
        loadListForms()
    }, [])
    const loadListForms = () => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch("https://localhost:7240/api/Mascotas", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                const data = JSON.parse(result);
                if (data?.status !== 400) {
                    Swal.fire({ icon: 'success', text: 'Ups, fallo la conexion' });
                }
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
                accessorKey: 'nombre', //access nested data with dot notation
                header: 'Nombres',
                size: 150,
            },
            {
                accessorKey: 'especie', //access nested data with dot notation
                header: 'Especie',
                size: 150,
            },
            {
                accessorKey: 'raza', //access nested data with dot notation
                header: 'Raza',
                size: 150,
            },
            {
                accessorKey: 'color', //access nested data with dot notation
                header: 'Color',
                size: 150,
            },
        ],
        [],
    );
    const table = useMaterialReactTable({
        columns,
        data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    });
    return (
        <MaterialReactTable table={table} />
    );
}
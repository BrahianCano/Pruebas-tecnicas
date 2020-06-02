import React from 'react'


const ListForm = (props) => {
    // console.log(props)
    return (
        <table className='table table-dark'>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Valor</th>
                    <th scope="col">TRM</th>
                    <th scope="col">#Opcion</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.data.map((item, key) =>
                        <tr key={key}>
                            <th scope="row">{key}</th>
                            <td scope="row">{item.Valor}</td>
                            <td scope="row">{item.TRM}</td>
                            <td scope="row">{item.select}</td>
                        </tr>
                    )
                }

            </tbody>
        </table>
    );
}

export default ListForm;
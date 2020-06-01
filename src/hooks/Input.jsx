import React, { Fragment, useState } from 'react';

const Inputs = (props) => {

    const [valueInput, setValueInput] = useState('');

    const onChange = (ev) => {
        if (ev.target.value.search(/[a-z]/gi) > -1) {
            alert('No se permiten caracteres de tipo texto.');
            ev.target.value = ev.target.value.replace(/[a-z]/gi, '').trim();
        } else {

            //Covertir los datos de entrada en un array
            var InputNum = ev.target.value.split(/\./).join('');
            InputNum = InputNum.split('').reverse();

            var InputNumParsed = [];
            var auxNum = '';

            //Redondear la longitud de nuestro array cuando se divide * 3, para obtener una posicion por cada 3 digitos.
            var paginator = Math.ceil(InputNum.length / 3);

            //Recorrer el paginador para agregar a nuestra variable auxiliar los primeros 3 numeros, segun la posicion del paginador.
            for (let i = 0; i < paginator; i++) {
                for (let j = 0; j < 3; j++) {
                    if (InputNum[j + (i * 3)] != undefined) {
                        auxNum += InputNum[j + (i * 3)];
                    }
                }
                //Agregar al array final cada posicion con los 3 digitos que almacenamos en nuestra variable auxiliar
                InputNumParsed.push(auxNum);
                auxNum = '';

                //Unir nuestro array con un punto y cortar por cada posicion, regresarla al orden original y unir el array.
                ev.target.value = InputNumParsed.join('.').split("").reverse().join('');
                if (ev.target.value.indexOf('.,') > -1 || ev.target.value.indexOf(',.') > -1) {
                    ev.target.value = ev.target.value.replace('.,', ',').replace(',.', '.').trim();
                }
                setValueInput(ev.target.value)
            }
        }
    }

    return (
        <Fragment>
            <input class="form-control" type="text" name={props.name} placeholder={props.placeholder}
                onChange={onChange} />
        </Fragment>
    );
}

export default Inputs;


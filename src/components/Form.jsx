import React, { Fragment, useState } from 'react';

import Input from '../hooks/Input';

const Form = () => {

    const [option, setOption] = useState(0);
    const [inputValor, setInputValor] = useState('');
    const [TRM, setTRM] = useState('');
  

    const onSubmit = (eve) => {
        eve.preventDefault();
        console.log(new FormData(eve.target))
    }

    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="inputGroupSelect01">Escoge una opción</label>
                    </div>
                    <select onClickCapture={(e)=>{setOption(e.target.value)}} class="custom-select" id="inputGroupSelect01">
                        <option selected>Seleccione</option>
                        <option value="1">Descripcion 1</option>
                        <option value="2">Descripcion 2</option>
                        <option value="3">Descripcion 3</option>
                    </select>
                </div>
                <div class="mb-3">
                    <Input name={'Valor'} placeholder={'Valor'} />
                </div>
                <div class="mb-3">
                    <Input class="mb-3" name={'TRM'} placeholder={'TRM'} />
                </div>
                <input class="mb-3" class="btn btn-primary" type="submit" value="Guardar y enviar" />
            </form>
        </Fragment>
    );
}

export default Form;
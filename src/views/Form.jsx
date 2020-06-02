import React, { Component, Fragment } from 'react'
import axios from 'axios';

// Import componets hooks //
import InputComponent from '../components/InputComponent';
import ListForm from '../components/ListForm';

var arrayData = [];
class Form extends Component {

    constructor(props) {
        super(props);
        this.state = { select: 'Seleccione', Valor: '', TRM: '' };
        // Este enlace es necesario para hacer que `this` funcione en el callback    
        //this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {

        if (event.target.value.search(/[a-z]/gi) > -1) {
            alert('No se permiten caracteres de tipo texto.');
            event.target.value = event.target.value.replace(/[a-z]/gi, '').trim();
        } else {

            //Covertir los datos de entrada en un array
            var InputNum = event.target.value.split(/\./).join('');
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
                event.target.value = InputNumParsed.join('.').split("").reverse().join('');
                if (event.target.value.indexOf('.,') > -1 || event.target.value.indexOf(',.') > -1) {
                    event.target.value = event.target.value.replace('.,', ',').trim().replace(',.', '.').trim();
                }
            }
            this.setState({
                ...this.state,
                [event.target.name]: event.target.value
            })
        }



    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.Valor.length > 0 && this.state.TRM.length > 0 && this.state.select != 'Seleccione') {
            this.ApiFunction('POST', 'https://httpbin.org/post', this.state)
        } else {
            alert('Debes completar todos los campos, para enviar el formulario.')
        }
    }

    ApiFunction = async (method, url, data) => {
        try {
            const response = await axios({ method, url, data });
            if (response.status !== 200) throw new Error(response.statusText);
            this.saveLocalStorage();
            console.log(response);
            alert('datos enviados con exito.')
        } catch (err) {
            console.log(err.message);
        }
    }

    getLocalStorage = () => {
        var formList = localStorage.getItem('data');
        if (formList == null) {
            arrayData = [];
            this.setState({
                ...this.state,
                data:false
            })
        } else {
            arrayData = JSON.parse(localStorage.getItem('data'));
            console.log('--Desde componentWillMount ' + arrayData)
            this.setState({
                ...this.state,
                data:true
            })
        }
    }

    saveLocalStorage = () => {
        arrayData.push(this.state)
        localStorage.setItem("data", JSON.stringify(arrayData))
        console.log('Informacion guardad en el local Storage')
    }

    componentDidMount() {
        this.getLocalStorage();
    }

    render() {

        console.log('--Desde el render ' + arrayData)

        return (
            <div className="container mt-5">
                <h1>Formulario</h1>
                <form className='mb-5 mt-5' onSubmit={this.handleSubmit}>
                    <select name="select" value={this.state.select}
                        onChange={(event) => { event.target.value != 'Seleccione' ? this.setState({ ...this.state, [event.target.name]: event.target.value }) : alert('Debes escoger una opcion') }}>
                        <option>Seleccione</option>
                        <option value="1">Descripcion 1</option>
                        <option value="2">Descripcion 2</option>
                        <option value="3">Descripcion 3</option>
                    </select>
                    <InputComponent name='Valor' handleChange={this.handleChange} value={this.state.Valor} />
                    <InputComponent name='TRM' handleChange={this.handleChange} value={this.state.TRM} />
                    <input className='btn btn-primary mr-5'
                        type="submit"
                        value="Enviar y guardar datos" />
                    <input className='btn btn-secondary'
                        type="button"
                        onClick={() => { this.setState({ ...this.state, select: 'Seleccione', Valor: '', TRM: '' }) }}
                        value="Limpiar campos" />
                </form>
                {arrayData.length > 0 &&
                    <div className="container">
                        <button className='btn btn-warning mb-3' onClick={this.getLocalStorage}>Refrescar tabla</button>
                        <ListForm data={arrayData} />
                    </div>
                }
            </div>
        );
    }
}

export default Form;
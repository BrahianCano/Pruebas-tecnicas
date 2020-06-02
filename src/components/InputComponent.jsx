import React from 'react'

const InputComponent = (props) => {
    return (
        <div>
            <input className='form-control m-3'
                required
                type="text"          
                name={props.name}
                placeholder={props.name}
                value={props.value}
                onChange={props.handleChange}              
            />
        </div>
    );
}

export default InputComponent;
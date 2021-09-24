import React, {useState, useEffect} from 'react';
import md5 from 'md5';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie/es6';
import axios from 'axios';
import '../css/Login.css';

function Login(props) {

    const baseUrl = "https://localhost:44305/api/usuarios";
    const cookies = new Cookies();




    const [formulario, setFormulario] = useState({
        username: '',
        password: ''
    });

    const obtenerDatosInputs=e=>{
        const{name, value} = e.target;
        setFormulario({
            ...formulario,
            [name]: value
        });
        console.log(formulario);
    }

    //METODO PARA EL INICIO DE SESION
    const iniciarSesion=async()=>{
        if (formulario.username === "" || formulario.password === "") {
            alert('Debe ingresar usuario y contraseña');
        }
        await axios.get(baseUrl+`/${formulario.username}/${md5(formulario.password)}`)
        .then(response=>{
            return response.data;
        }).then(response=>{
            if (response.length > 0) {
                var respuesta = response[0];
                // console.log(respuesta);
                //Ahora guardo lo que me traiga respuesta dentro de las cookies que seria el localstorage de js
                cookies.set('id', respuesta.id, {path: '/'});
                cookies.set('apellido', respuesta.apellido, {path: '/'});
                cookies.set('nombre', respuesta.nombre, {path: '/'});
                cookies.set('correo', respuesta.correo, {path: '/'});
                cookies.set('username', respuesta.username, {path: '/'});
                cookies.set('password', respuesta.password, {path: '/'});
                alert('Bienvenido: '+respuesta.nombre +' '+respuesta.apellido);
                //Ahora redirecciono a la pagina del menu
                props.history.push('/menu');
            }else{
                alert('El usuario o la contraseña no son correctos.');
            }
        })
        .catch(error=>{
            console.log(error);
        })
    }

    useEffect(()=>{
        if (cookies.get('id')) {
            props.history.push('/menu');
        }
    },[]);

    return (
        <div className="containerPrincipal">
            <div className="containerLogin">
                <div className="form-group">
                    <label>Usuario: </label>
                    <br/>
                    <input type="text" className="form-control" name="username" onChange={obtenerDatosInputs}/> {/*Los names tienen que tener los mismos nombres que en las variables de estado */}
                    <br/>
                    <label>Contraseña: </label>
                    <br/>
                    <input type="password" className="form-control" name="password" onChange={obtenerDatosInputs}/>
                    <br/>
                    <button className="btn btn-primary" onClick={()=>iniciarSesion()}>Iniciar Sesión</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
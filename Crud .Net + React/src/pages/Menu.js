import React, {useEffect} from 'react';
import Cookies from 'universal-cookie/es6';
import '../css/Menu.css';

function Menu(props) {

    const cookies = new Cookies();

    const cerrarSesion=()=>{
        cookies.remove('id',{path: '/'});
        cookies.remove('nombre',{path: '/'});
        cookies.remove('apellido',{path: '/'});
        cookies.remove('correo',{path: '/'});
        cookies.remove('password',{path: '/'});
        cookies.remove('username',{path: '/'});
        props.history.push('./')
    }

    // const redireccionGestores=()=>{
    //     props.history.push('/gestores')
    // }

    useEffect(()=>{
        if (!cookies.get('id')) {
            props.history.push('./');
        }
    },[]);

    return (
        <div className="containerMenu">
            <br/>
            <button className="btn btn-danger" onClick={()=>cerrarSesion()}>Cerrar Sesión</button>
            <br/>
            <h5>ID: {cookies.get('id')}</h5>
            <br/>
            <h5>Apellido: {cookies.get('apellido')}</h5>
            <br/>
            <h5>Nombre: {cookies.get('nombre')}</h5>
            <br/>
            <h5>Correo: {cookies.get('correo')}</h5>
            <br/>
            <h5>Username: {cookies.get('username')}</h5>
            <br/>
            <h5>Contraseña: {cookies.get('password')}</h5>
            <br/>
            {/* <button className="btn btn-warning" onClick={()=>redireccionGestores()}>Ir a gestores de BD</button> */}
        </div>
    );
}

export default Menu;
import React, {useState, useEffect} from 'react';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie/es6';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

function App(props) {

  const cookies = new Cookies();

  const baseUrl="https://localhost:44305/api/gestores";
  const [data, setData]=useState([]);
  //Estado para controlar cuando se abre y cuando se cierra el modal 
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);
  //Estado para guardar los datos que se obtengan del metodo obtenerDatosInputs
  const [gestorSeleccionado, setGestorSeleccionado]=useState({
    id: '',
    nombre: '',
    lanzamiento: '',
    desarrollador: ''
  })

  // Metodo para capturar lo que el usuario escribe en los inputs
  const obtenerDatosInputs=e=>{
    const {name, value}=e.target;
    setGestorSeleccionado({
      ...gestorSeleccionado,
      [name]: value
    });
    console.log(gestorSeleccionado);
  }

  //Metodo para cambiar el estado de la ventana de true a false
  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  //Hago la peticion Get Para obtener la informacion para llenar la tabla.
  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{ //si la peticion es exitosa, que los datos se guarden en el estado
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  //Hago la peticion Post para insertar nuevos gestores.
  const peticionPost=async()=>{
    delete gestorSeleccionado.id;// elimino el atributo id ya que lo genera la base de datos automaticamente
    gestorSeleccionado.lanzamiento=parseInt(gestorSeleccionado.lanzamiento);
    await axios.post(baseUrl, gestorSeleccionado) //gestorSeleccionado vendria a ser el comando de ajax
    .then(response=>{ //si la peticion es exitosa, que los datos se guarden en el estado
      setData(data.concat(response.data));
      abrirCerrarModalInsertar(); //una vez que se inserta, cierro el modal.
    }).catch(error=>{
      console.log(error);
    })
  }


  //Hago la peticion Put para Actualizar gestores.
  const peticionPut=async()=>{
    gestorSeleccionado.lanzamiento=parseInt(gestorSeleccionado.lanzamiento);
    await axios.put(baseUrl+"/"+gestorSeleccionado.id, gestorSeleccionado) //gestorSeleccionado vendria a ser el comando de ajax
    .then(response=>{ //si la peticion es exitosa, que los datos se guarden en el estado
      var respuesta = response.data;
      var dataAuxiliar = data;
      dataAuxiliar.map(gestor=>{
        if (gestor.id === gestorSeleccionado.id) {
          gestor.nombre = respuesta.nombre;
          gestor.lanzamiento = respuesta.lanzamiento;
          gestor.desarrollador = respuesta.desarrollador;
        }
      })
      abrirCerrarModalEditar(); //una vez que se inserta, cierro el modal.
    }).catch(error=>{
      console.log(error);
    })
  }


  //Hago la peticion Delete para Eliminar gestores.
  const peticionDelete=async()=>{
    await axios.delete(baseUrl+"/"+gestorSeleccionado.id)
    .then(response=>{ //si la peticion es exitosa, que los datos se guarden en el estado
      setData(data.filter(gestor=>gestor.id !== response.data));
      abrirCerrarModalEliminar(); //una vez que se inserta, cierro el modal.
    }).catch(error=>{
      console.log(error);
    })
  }



  //Metodo para seleccionar el gestor que se va a editar
  const seleccionarGestor=(gestor, caso)=>{
    setGestorSeleccionado(gestor);
    (caso ==="Editar")? 
    abrirCerrarModalEditar() : abrirCerrarModalEliminar(); // si el caso es editar, se abre la ventana editar, sino que se abra la ventana eliminar.
  }

  //Llamo la peticion Get en el useEffect
  useEffect(()=>{
    peticionGet();
  },[]);

  useEffect(()=>{
    if (!cookies.get('id')) {
        props.history.push('./');
    }
  },[]);

  const cerrarSesion=()=>{
    cookies.remove('id',{path: '/'});
    cookies.remove('nombre',{path: '/'});
    cookies.remove('apellido',{path: '/'});
    cookies.remove('correo',{path: '/'});
    cookies.remove('password',{path: '/'});
    cookies.remove('username',{path: '/'});
    props.history.push('./')
  }

//   const redireccionMenu=()=>{
//     props.history.push('/menu')
//   }

  return (
    <div className="App">
        <br/>
            <button className="btn btn-danger" onClick={()=>cerrarSesion()}>Cerrar Sesión</button>
        <br/>
      <br/><br/>
      <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Insertar Nuevo Gestor</button>
      <br/><br/>
      <table className="table table-bordered">
        <thead>
          <tr>
            <td>ID</td>
            <td>Nombre</td>
            <td>Lanzamiento</td>
            <td>Desarrollador</td>
            <td>Acciones</td>
          </tr>
        </thead>
        <tbody>
          {data.map(gestor=>(
            <tr key={gestor.id}>
              <td>{gestor.id}</td> {/* Estos nombres son como los que estan en el json que recibe como respuesta */}
              <td>{gestor.nombre}</td>
              <td>{gestor.lanzamiento}</td>
              <td>{gestor.desarrollador}</td>
              <td>
                <button className="btn btn-primary" onClick={()=>seleccionarGestor(gestor, "Editar")}>Editar</button>{"  "}
                <button className="btn btn-danger" onClick={()=>seleccionarGestor(gestor, "Eliminar")}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br/>
      {/* <button className="btn btn-warning" onClick={()=>redireccionMenu()}>Volver al Menú</button> */}

      {/* Creacion de la ventana Modal para Insertar */}
      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar Gestor  de base de datos</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre: </label>
            <br/>
            <input type="text" className="form-control" name="nombre" onChange={obtenerDatosInputs}/>
            <label>Lanzamiento: </label>
            <br/>
            <input type="text" className="form-control" name="lanzamiento" onChange={obtenerDatosInputs}/>
            <label>Desarrollo: </label>
            <br/>
            <input type="text" className="form-control" name="desarrollador" onChange={obtenerDatosInputs}/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"  "}
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      {/* Creacion de la ventana Modal para Actualizar */}
      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Gestor  de base de datos</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID: </label>
            <br/>
            <input type="text" className="form-control" readOnly value={gestorSeleccionado && gestorSeleccionado.id}/>
            <label>Nombre: </label>
            <br/>
            <input type="text" className="form-control" name="nombre" onChange={obtenerDatosInputs} value={gestorSeleccionado && gestorSeleccionado.nombre}/>
            <label>Lanzamiento: </label>
            <br/>
            <input type="text" className="form-control" name="lanzamiento" onChange={obtenerDatosInputs} value={gestorSeleccionado && gestorSeleccionado.lanzamiento}/>
            <label>Desarrollo: </label>
            <br/>
            <input type="text" className="form-control" name="desarrollador" onChange={obtenerDatosInputs} value={gestorSeleccionado && gestorSeleccionado.desarrollador}/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>peticionPut()}>Actualizr</button>{"  "}
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      {/* Creacion de la ventana Modal para Eliminar */}
      <Modal isOpen={modalEliminar}>
        <ModalHeader>Eliminar Gestor  de base de datos</ModalHeader>
        <ModalBody>
          ¿Estas seguro que deseas eliminar el gestor de base de datos {gestorSeleccionado && gestorSeleccionado.nombre}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>peticionDelete()}>Si</button>{"  "}
          <button className="btn btn-secondary" onClick={()=>abrirCerrarModalEliminar()}>No</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
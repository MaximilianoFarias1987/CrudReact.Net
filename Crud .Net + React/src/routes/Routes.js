import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Cookies from 'universal-cookie/es6';
import Navbar from '../navigation/Navbar';
import Login from '../pages/Login';
import Menu from '../pages/Menu';
import Gestores from '../pages/Gestores';

// En este archivo es donde vamso a configurar las rutas de nuestras paginas, ponemos los imports como el de login y menu y luego llamamos 
//en los Route

function App() {
  window.onbeforeunload = borrarSesionAlSalir;

    const cookies = new Cookies();
     
    function borrarSesionAlSalir()
    {
        cookies.remove('id',{path: '/'});
        cookies.remove('nombre',{path: '/'});
        cookies.remove('apellido',{path: '/'});
        cookies.remove('correo',{path: '/'});
        cookies.remove('password',{path: '/'});
        cookies.remove('username',{path: '/'});
    }
  return (
    
    <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/menu" component={Menu}/>
        <Route exact path="/gestores" component={Gestores}/>
        {/* agrego exact para que funcionen correctamente las cookies */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;

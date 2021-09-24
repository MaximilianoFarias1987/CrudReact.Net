import React from 'react';
import { Link } from 'react-router-dom';

const navbar =()=>{
    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link  to='/menu'>
                        <img src='./reactLogo1.png' width='50'/>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav"> {/*Si quiero que los enlaces se centren pongo la clase mx-auto */}
                            <li className="nav-item">
                                <Link className="nav-link active" to='/menu'>Menú</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to='/gestores'>Gestores</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default navbar
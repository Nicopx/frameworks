import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';

function App() {
  const url = "http://localhost/frameworks/api/";
  //estado para capturar los datos de la API
  const [data, setData] = useState([]);

  //estado para manejar el estado del modal de insersion
  const [modalInsertar, setModalInsertar] = useState(false);

  //estado para manejar el estado del modal de edicion
  const [modalEditar, setModalEditar] = useState(false)

  //estado para manejar el estado del modal de eliminar
  const [modalEliminar, setModalEliminar] = useState(false)

  //estado para capturar los datos del input
  const [frameworkNew, setFrameworkNew] = useState({
    id: '',
    nombre: '',
    lanzamiento: '',
    desarrollador: ''
  });

  //metodo para capturar la entrada de los inputs
  const handleChange = e => {
    const { name, value } = e.target;
    setFrameworkNew((prevState) => ({
      ...prevState,
      [name]: value
    }))
    console.log(frameworkNew);
  }

  //metodo para saber el estado del modal (cerrar)
  const estadoModal = () => {
    setModalInsertar(!modalInsertar);
  }

  //metodo para saber el estado del modal (cerrar)
  const estadoModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  //metodo para saber el estado del modal (cerrar)
  const estadoModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  const peticionGet = async () => {
    await axios.get(url)
      .then(response => {
        //console.log(response.data);
        //capturo las respuesta de la peticion y se guarda en el estado. 
        setData(response.data)
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionPost = async () => {
    var form = new FormData();
    form.append("nombre", frameworkNew.nombre);
    form.append("lanzamiento", frameworkNew.lanzamiento);
    form.append("desarrollador", frameworkNew.desarrollador);
    form.append("METHOD", "POST");
    await axios.post(url, form)
      .then(response => {
        setData(data.concat(response.data));
        estadoModal();
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionPut = async () => {
    var form = new FormData();
    form.append("nombre", frameworkNew.nombre);
    form.append("lanzamiento", frameworkNew.lanzamiento);
    form.append("desarrollador", frameworkNew.desarrollador);
    form.append("METHOD", "PUT");
    //recibe un parametro adicional que es el id del framework a editar
    await axios.post(url, form, { params: { id: frameworkNew.id } })
      .then(response => {
        var dataNueva = data;
        dataNueva.map(framework => {
          if (framework.id === frameworkNew.id) {
            framework.nombre = frameworkNew.nombre;
            framework.lanzamiento = frameworkNew.lanzamiento;
            framework.desarrollador = frameworkNew.desarrollador;
          }
        })
        setData(dataNueva);
        estadoModalEditar();
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionDelete = async () => {
    var form = new FormData();
    //paso por body el tipo de metodo
    form.append("METHOD", "DELETE");
    await axios.post(url, form, { params: { id: frameworkNew.id } })
      .then(response => {
        setData(data.filter(framework => framework.id !== frameworkNew.id));
        estadoModalEliminar();
      }).catch(error => {
        console.log(error);
      })
  }

  const seleccionarFramework = (framework, caso) => {
    setFrameworkNew(framework);
    (caso === "Editar") ?
      estadoModalEditar() :
      estadoModalEliminar()
  }

  useEffect(() => {
    peticionGet();
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      <button className="btn btn-success" onClick={() => estadoModal()}>Insertar</button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Lanzamiento</th>
            <th>Desarrollador</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(frameworks =>
          (<tr key={frameworks.id} >
            <td>{frameworks.id}</td>
            <td>{frameworks.nombre}</td>
            <td>{frameworks.lanzamiento}</td>
            <td>{frameworks.desarrollador}</td>
            <td>

              <button className="btn btn-outline-primary" onClick={() => seleccionarFramework(frameworks, "Editar")}>Editar</button>
              <button className="btn btn-outline-danger" onClick={() => seleccionarFramework(frameworks, "Eliminar")}>Eliminar</button>
            </td>
          </tr>)
          )}
        </tbody>
      </table>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar Framework</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre:</label>
            <br></br>
            <input type="text" className="form-control" name="nombre" onChange={handleChange} />
            <label>Lanzamiento:</label>
            <br></br>
            <input type="text" className="form-control" name="lanzamiento" onChange={handleChange} />
            <label>Desarrollador:</label>
            <br></br>
            <input type="text" className="form-control" name="desarrollador" onChange={handleChange} />
            <br></br>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => peticionPost()}>Insertar</button>{" "}
          <button className="btn btn-danger" onClick={() => estadoModal()}>Cancelar</button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Framework</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre:</label>
            <br />
            <input type="text" className="form-control" name="nombre" onChange={handleChange} value={frameworkNew && frameworkNew.nombre} />
            <label>Lanzamiento:</label>
            <br />
            <input type="text" className="form-control" name="lanzamiento" onChange={handleChange} value={frameworkNew && frameworkNew.lanzamiento} />
            <label>Desarrollador:</label>
            <br></br>
            <input type="text" className="form-control" name="desarrollador" onChange={handleChange} value={frameworkNew && frameworkNew.desarrollador} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => peticionPut()} >Guardar</button>{" "}
          <button className="btn btn-danger" onClick={() => estadoModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          ¿Seguro que desea eliminar el Framework {frameworkNew && frameworkNew.nombre}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => peticionDelete()}>Si</button>
          <button className="btn btn-secondary" onClick={() => estadoModalEliminar()}>No</button>
        </ModalFooter>
      </Modal>

    </div >
  );
}

export default App;

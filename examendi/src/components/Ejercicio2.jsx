import React from 'react';
import { Table, Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';

class Ejercicio2 extends React.Component {
  constructor(props) {
    super(props);
    this.valorMarcas = React.createRef();
    this.state = {
      tableData: [],
      marcas: [],
      imagen: '',
      marca: '',
      sistema: '',
      dimension: '',
      almacenamiento: ''
    }
  }

  async componentDidMount() {
    const response = await fetch('https://api-mobilespecs.azharimm.site/v2/brands');
    const responseData = await response.json();
    const response2 = await fetch('https://api-mobilespecs.azharimm.site/v2/top-by-fans');
    const responseData2 = await response2.json();
    this.setState({
      tableData: responseData2.data.phones,
      marcas: responseData.data,
    })
  }

  async changeStateClicked(item) {
    const slugSelected = item.slug;
    const response = await fetch('https://api-mobilespecs.azharimm.site/v2/ ' + slugSelected);
    const responseData = await response.json();
    this.setState({
      imagen: responseData.data.thumbnail,
      marca: responseData.data.brand,
      sistema: responseData.data.os,
      dimension: responseData.data.dimension,
      almacenamiento: responseData.data.storage
    })
  }

  async encontrar() {
    const marca = this.valorMarcas.current.value;
    const response = await fetch('http://api-mobilespecs.azharimm.site/v2/search?query= ' + marca);
    const responseData = await response.json();
    this.setState({
      tableData: responseData.data.phones
    })
  }

  añadirLocalStorage() {
    const tlfs = [];
    tlfs.push(
      this.state.imagen,
      this.state.marca,
      this.state.sistema,
      this.state.dimension,
      this.state.almacenamiento
    )
    localStorage.setItem('tlfs', tlfs);
  }

  render() {
    return (
      <div id="ej2">
        <h2>Ejercicio 2</h2>
        <ul>
          <li>
            Utiliza la API REST de{' '}
            <a href="https://github.com/azharimm/phone-specs-api">Phone Specifications API</a>{' '}
            para rellenar una tabla con datos de teléfonos mediante un formulario. Ten en cuenta las siguientes indicaciones:
          </li>
          <li>El formulario será un componente que a su vez estará formado por dos componentes <b>(1 punto)</b>:</li>
          <ul>
            <li>Lista desplegable con marcas de teléfono, la cual se ha de rellenar llamando a la API (List Brands)</li>
            <li>Botón de búsqueda, que rellenará la tabla llamando a la API (List Phones) con el parámetro indicado en la lista desplegable</li>
          </ul>
          <li>La tabla tendrá los campos Marca y Modelo, y al cargar la página se rellenará con los datos de los últimos modelos (Top by Fans)<b> - 1,5 puntos</b></li>
          <li>Al hacer click sobre una fila de la tabla, se mostrará en un elemento de tipo <a href="https://react-bootstrap.github.io/components/cards/">
            Card
          </a>{' '}
            de React-Bootstrap con el detalle del modelo en concreto, con los siguientes campos separados al estilo "Kitchen Sink"<b> (1,5 puntos)</b>:
            <ul>
              <li>Imagen</li>
              <li>Marca - Modelo</li>
              <li>Sistema operativo</li>
              <li>Dimensión</li>
              <li>Almacenamiento</li>
            </ul>
            Salvo la imagen, marca y modelo, para recuperar el resto de elementos tenéis que llamar a la API (Phone Specifications)
            usando el campo <i>detail</i> o <i>slug</i> de las consultas de listado de elementos
          </li>
          <li>
            Añade un botón al Card que permita añadir un teléfono a una lista de favoritos, de modo que almacene su información en localStorage al ir a otra página<b> - 1 punto</b>
          </li>
        </ul>


        <select ref={this.valorMarcas}>
          {this.state.marcas.map((item) => {
            return (
              <option value={item.brand_name}>{item.brand_name}</option>
            );
          })}
        </select>

        <Button variant="primary" onClick={this.encontrar.bind(this)}>Search</Button>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Marca</th>
              <th>Modelo</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tableData.map((item) => {
              return (
                <tr onClick={() => this.changeStateClicked(item)}>
                  <td>{item.phone_name}</td>
                  <td>{item.slug}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>

        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={this.state.imagen} />
          <Card.Body>
            <Card.Text>Marca: {this.state.marca}</Card.Text>
            <Card.Text>Sistema operativo: {this.state.sistema}</Card.Text>
            <Card.Text>Dimensión: {this.state.dimension}</Card.Text>
            <Card.Text>Almacenamiento: {this.state.almacenamiento}</Card.Text>
          </Card.Body>
          <Button variant="primary" onClick={() => this.añadirLocalStorage()}>Añadir a favoritos</Button>
        </Card>
      </div>

    );
  }
}

export default Ejercicio2;

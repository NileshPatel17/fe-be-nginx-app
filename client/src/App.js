import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Button, Container, Card, Row } from 'react-bootstrap';
import Header from './components/header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookName: '',
      bookReview: '',
      fetchData: [],
      reviewUpdate: ''
    };
  }

  handleChange = event => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({
      [nam]: val
    });
  };

  handleChange2 = event => {
    this.setState({
      reviewUpdate: event.target.value
    });
  };

  componentDidMount() {
    axios.get('/api/books').then(response => {
      console.log(response);
      this.setState({
        fetchData: response.data
      });
    });
  }

  submit = () => {
    const { bookName, bookReview } = this.state;
    const payload = {
      bookName,
      bookReview
    };
    axios.post('/api/books', payload).then(resp => {
      this.setState({
        fetchData: this.state.fetchData.concat(resp.data)
      });
    });
  };

  delete = id => {
    if (confirm('Do you want to delete? ')) {
      axios.delete(`/api/books/${id}`);
      const _books = this.state.fetchData.filter(book => book.id !== id);
      this.setState({ fetchData: _books });
    }
  };

  edit = id => {
    axios.put(`/api/books/${id}`, this.state);
    document.location.reload();
  };
  render() {
    let card = this.state.fetchData.map((val, key) => {
      return (
        <React.Fragment key={`${val.id}`}>
          <Card style={{ width: '18rem' }} className='m-2, p-10'>
            <Card.Body>
              <Card.Title>{val.bookName}</Card.Title>
              <Card.Text>{val.bookReview}</Card.Text>
              <input
                name='reviewUpdate'
                onChange={this.handleChange2}
                placeholder='Update Review'
              ></input>
              <Button
                className='m-2'
                onClick={() => {
                  this.edit(val.id);
                }}
              >
                Update
              </Button>
              <Button
                onClick={() => {
                  this.delete(val.id);
                }}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        </React.Fragment>
      );
    });

    return (
      <div className='App'>
        <Header />
        <div className='form'>
          <input
            name='bookName'
            placeholder='Enter Book Name'
            onChange={this.handleChange}
          />
          <input
            name='bookReview'
            placeholder='Enter Review'
            onChange={this.handleChange}
          />
        </div>
        <Button className='my-2' variant='primary' onClick={this.submit}>
          Submit
        </Button>{' '}
        <br />
        <br />
        <Container>
          <Row>{card}</Row>
        </Container>
      </div>
    );
  }
}
export default App;

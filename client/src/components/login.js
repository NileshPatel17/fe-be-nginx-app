import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('abc@gmail.com');
  const [password, setPassword] = useState('abc123');

  const onSubmit = e => {
    onLogin({ email, password });
  };
  return (
    <Container fluid='sm'>
      <Form>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            value={email}
            onChange={val => setEmail(val.target.value)}
            placeholder='Enter email'
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={val => setPassword(val.target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='button' onClick={onSubmit}>
          Login
        </Button>
      </Form>
    </Container>
  );
}

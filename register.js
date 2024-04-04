import React from "react"
import {Button, Form} from "react-bootstrap"
import  {useState} from "react"
import {NavLink, Navigate} from "react-router-dom" 

const Register=()=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const register = async () => {
        try {
          // const hashedPassword = bcrypt.hashSync(password, 10);
          const response = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
          });
          console.log(response)
          if (response.ok) {
            alert('User registered successfully');
            setUsername('');
            setPassword('');
            window.location.replace("http://localhost:3000/")
          } else {
            alert('Failed to register user');
          }
        } catch (error) {
          console.error('Registration error:', error);
          alert('Registration failed');
        }
      };

    return(
        <div>
                {/* Register form */}
                <h2>Register</h2>
                <br/>
                <Form>
                    {/* Username input field */}
                    <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Enter username" 
                        onChange={e => setUsername(e.target.value)} // Update state when text changes
                    />
                    </Form.Group>
                    {/* Password input field */}
                    <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        onChange={e => setPassword(e.target.value)} // Update state when text changes
                    />
                    </Form.Group>
                    <br/>
                    {/* Register button */}
                    <Button variant="primary" onClick={register}>Register</Button>
                </Form>
            </div>
    )
}
export default Register
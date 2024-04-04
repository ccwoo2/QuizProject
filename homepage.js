import {React} from "react";
import {useState} from "react"
import {Button, Form} from "react-bootstrap"
import { NavLink, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"


const Homepage=()=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');



      
  // Function to handle user login
  // Similar to register, but this function is called when 'Login' button is clicked
  const login = async () => {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        alert('Logged in successfully');
        setUsername('');
        setPassword('');
        window.location.replace("http://localhost:3000/dashboard")

      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };


    return(
        <div>
            <Form className="loginPage">
                <Form.Label >
                    Id:
                    <Form.Control 
                        type="text" 
                        placeholder="Enter username" 
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </Form.Label>
                <br/>
                <Form.Label>
                    Password:
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
       
                </Form.Label>
                <br/>
                <Button onClick={login}>login</Button>
                
                <br/>
                <br/>   
                <NavLink to="/dashboard"><Button>Play as Guest</Button></NavLink>
                <NavLink to="/register"><Button>Resgister</Button></NavLink>
                
            </Form>
            
        </div>
    )
}
export default Homepage
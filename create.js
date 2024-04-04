import React from "react"
import {useState} from "react"
import {Button, Form} from "react-bootstrap"
import {NavLink} from "react-router-dom"

const CreateQuestion=()=>{
    return(
        <div>
            <Form>
                <Form.Label>Enter Question</Form.Label>
                <Form.Control  
                    type="text" 
                    placeholder="Enter question"  />
                <Form.Label>A</Form.Label>
                <Form.Control  
                    type="text" 
                    placeholder="Enter choice A"  />
                <Form.Label>B</Form.Label>
                <Form.Control  
                    type="text" 
                    placeholder="Enter choice B"  />
                <Form.Label>C</Form.Label>
                <Form.Control  
                    type="text" 
                    placeholder="Enter choice C"  />
                <Form.Label>D</Form.Label>
                <Form.Control  
                    type="text" 
                    placeholder="Enter choice D"  />
                    <Form.Label>Answer</Form.Label>
                <Form.Control  
                    type="text" 
                    placeholder="Enter answer"  />
            </Form>
            <NavLink to="/dashboard"><Button>Go back</Button></NavLink>
        </div>
    )
}
export default CreateQuestion
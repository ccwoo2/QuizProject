import {React, useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import {Button} from "react-bootstrap"

const Play = ()=>{

    const[num, setNum]=useState(0)
    const[allQuestions, setAllQuestions]=useState()
    const[question, setQuestion]=useState()
    const [choices, setChoices] =useState([])
    const [answer, setAnswer] =useState()
    const [display, setDisplay]=useState("")
    const [next, setNext]=useState()

    
    const getQuestions=async()=>{
        await fetch("http://localhost:3001/getQuestions")
        .then((response)=>response.json())
        .then((data)=>{
            setAllQuestions(data)
            setQuestion(data[num].question)
            setChoices(data[num].choices)
            setAnswer(data[num].answer)
        })
        .catch((error)=>console.log(error))
        setNum(1)
    }

    const checkAnswer=(choice)=>{
        if(choice == choices[answer]){
            setDisplay("Correct!")
            setNext(<Button onClick={()=>{
                setNum(num+1)
                console.log(num)
                getNext()
                setNext("")
                setDisplay("")
            }}>next</Button>)
            
        }else{
            setDisplay("Incorrect")
            setNext("")
            
        }
    }

    

    useEffect(()=>{
        getQuestions()
    },[])   


    const getNext=()=>{
        setQuestion(allQuestions[num].question)
        setChoices(allQuestions[num].choices)
        setAnswer(allQuestions[num].answer)
    }

    return(
        
        <div className="play">
            <div className="playboard" style={{border:"black solid"}}>
                <h1>Play</h1>
                <NavLink to="/dashboard"><Button>go back</Button></NavLink>
        
                <h3>{question}</h3>
                <div style={{padding:10}}>
                    {choices.map((choice)=>{
                        return(<div style={{textAlign:"left"}}><Button onClick={()=>{checkAnswer(choice)}}>{choice}</Button></div>)
                    })}
                </div>
            </div>
            <div>{display}</div>
            <div>{next}</div>

                
            
        </div>
    )
}
export default Play
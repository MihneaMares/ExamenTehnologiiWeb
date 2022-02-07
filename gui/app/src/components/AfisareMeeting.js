import React, { useEffect, useState } from "react";
import '../css/ListaMeeting.css'
import ListaMeetings from "./ListaMeeting";
import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}))

function AfisareMeeting() {

    const [meeting, setMeeting] = useState([])
    const [idMeeting, setIdMeeting] = useState([])
    const [descriere, setDescriere] = useState('')
    const [url, setUrl] = useState('')
    const [dataCreere, setDataCreere] = useState('')

    const aduceListaMeetingsDinBazaDeDate = () => {
        fetch(`http://localhost:8080/meetings`)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Error')
                }
            })
            .then((data) => {
                setMeeting(data)
            })
    }

    const aduceListaSortataMeetingsDinBazaDeDate = () => {
        fetch(`http://localhost:8080/meetings/sortare`)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Error')
                }
            })
            .then((data) => {
                setMeeting(data)
            })
    }

    const filtreazaCu2Param = () => {
        fetch(`http://localhost:8080/meeting/filter?idMeeting=${idMeeting}&descriere=${descriere.length}`)
            .then((response) => {
                console.log(descriere +" " + url);
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Error')
                }
            })
            .then((data) => {
                setMeeting(data)
            })
    }

    useEffect(aduceListaMeetingsDinBazaDeDate, [])


    return (
        <>
            <Grid item xs={8} justifyContent="center">
                <Item>
                    <Button onClick={(e) => {
                        e.preventDefault()
                        aduceListaSortataMeetingsDinBazaDeDate();
                    }}
                        type='submit' color="primary" fullWidth variant="outlined">Sortare</Button>


                    <br></br>
                    <br></br>
                    <div>

                        <label>Lista cu Meeting-uri cu id-ul mai mare sau egal decat ... care au lungimea descriere mai mare decat ... : </label>

                        <input type='text' placeholder='id' onChange={(evt) => setDescriere(evt.target.value)}></input>
                        <input type='number' placeholder='lungimea descrierii' onChange={(evt) => setUrl(evt.target.value)}></input>

                        <Button onClick={(e) => {
                            e.preventDefault()
                            filtreazaCu2Param();
                        }}
                            type='submit' color="primary" fullWidth variant="outlined">Filtreaza</Button>
                    </div>
                    <br></br>
                    <br></br>
                </Item></Grid>
            <ul className='meetings'>

                {meeting.map((ship, index) => (
                    <ListaMeetings key={index} item={ship} />
                ))}
            </ul>

        </>
    )
}

export default AfisareMeeting
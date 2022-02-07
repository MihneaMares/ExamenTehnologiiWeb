import React, { useEffect, useState } from "react";
import '../css/ListaParticipanti.css'
import ListaParticipanti from "./ListaParticipanti";
import { Button } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function AfisareParticipanti() {


    const [participants, setParticipants] = useState([])
    const [idMeeting, setIdMeeting] = useState([])


    const aduceListaParticipantiDinBazaDeDate = () => {
        fetch(`http://localhost:8080/participants`)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Error')
                }
            })
            .then((data) => {
                setParticipants(data)
            })
    }

    const aduceListaSortataCMDinBazaDeDate = () => {
        fetch(`http://localhost:8080/meeting/${idMeeting}/participants`)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Error')
                }
            })
            .then((data) => {
                setParticipants(data)
            })
    }

    useEffect(aduceListaParticipantiDinBazaDeDate, [])

    return (
        <>
            <Grid item xs={8} justifyContent="center">
                <Item>

                    <br></br>
                    <br></br>
                    <div>
                        <input type='number' placeholder='idMeeting' onChange={(evt) => setIdMeeting(evt.target.value)}></input>

                        <Button onClick={(e) => {
                            e.preventDefault()
                            aduceListaSortataCMDinBazaDeDate();
                        }}
                            type='submit' color="primary" fullWidth variant="outlined">cauta</Button>
                    </div>
                </Item></Grid>
            <ul className='partcipants'>
                {participants.map((participant, index) => (
                    <ListaParticipanti key={index} item={participant} />
                ))}
            </ul>

        </>
    )
}

export default AfisareParticipanti
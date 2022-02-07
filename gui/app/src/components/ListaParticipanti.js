import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import Child2 from "./Child2";


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const SERVER = 'http://localhost:8080'

function ListaParticipanti(props) {
    const { item } = props;

    const [participant, setParticipant] = useState(null)
    const [numeParticipant, setNumeParticipant] = useState('')

    function updateParticipants(nume) {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                numeParticipant: nume
            })
        };

        fetch(`http://localhost:8080/meeting/${item.MeetingIdMeeting}/participants/${item.idParticipant}`, requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ idParticipant: item.idParticipant }));
    }

    const [componenta, setComponenta] = useState()
    const parentToChild2 = () => {
        setComponenta(
            <div>
                <label>Nume participant: </label>
                <input id="nume" type='text' onChange={(evt) => setNumeParticipant(evt.target.value)}></input>
                <br></br>

                <Button onClick={(e) => {
                    e.preventDefault();
                    var nume = document.getElementById("nume").value;
                    console.log(nume);
                    
                    updateParticipants(nume);
                    window.location.reload()
                }}
                    type='submit' color="primary" fullWidth variant="outlined">Modificare</Button>
            </div>);
    }

    useEffect(async () => {
        const response = await fetch(`${SERVER}/participanti`)
        const data = await response.json()
        const participant = data.find((e) => e.idParticipant === item.id)
        setParticipant(participant)
    }, []);

    return (
        <Grid container spacing={3} alignItems="center"
        >
            <Grid item xs={3}>
                <Item>
                    nume participant: {item.numeParticipant}
                </Item>
            </Grid>
            
            <Grid item xs={4}>
                <Button onClick={(e) => {
                    e.preventDefault()
                    fetch(`http://localhost:8080/meeting/${item.MeetingIdMeeting}/participants/${item.idParticipant}`, {
                        method: 'DELETE'
                    }).then((response) => {
                        if (response.ok) {
                            window.location.reload()
                        } else {
                            alert('Delete error!')
                        }
                    })
                }}
                    type='submit' color="primary" fullWidth variant="outlined">
                    Delete: {item.MeetingIdMeeting}
                </Button>

            </Grid>

            <Grid item xs={3}>
                <Child2 parentToChild2={componenta} />

                <div className="child2">
                    <Button primary onClick={() => parentToChild2()}>Modifica</Button>
                </div>
            </Grid>

        </Grid>
    )


} export default ListaParticipanti
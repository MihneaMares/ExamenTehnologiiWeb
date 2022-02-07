import React, { useEffect, useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";



import Child from "./Child";


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
})); 
const SERVER = 'http://localhost:8080'

function ListaMeetings(props) {
    const { item } = props;
    const [meeting, setMeeting] = useState(null)

    const [descriere, setDescriereMeeting] = useState('')
    const [url, setUrlMeeting] = useState('')
    const [dataCreere, setDataCreereMeeting] = useState('')

    function updateMeeting(descriere, url, dataCreere) {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                descriere: descriere,
                url: url,
                dataCreere: dataCreere
            })
        };

        fetch(`http://localhost:8080/meetings/${item.idMeeting}`, requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ idMeeting: item.idMeeting }));
    }
    const [componenta, setComponenta] = useState()
    const parentToChild = () => {
        setComponenta(<div>
            <label>Descriere Meeting: </label>
            <input id="descriere" type='text' onChange={(evt) => setDescriereMeeting(evt.target.value)}></input>
            <br></br>

            <label>Meeting url:</label>
            <input id="url" type='text' onChange={(evt) => setUrlMeeting(evt.target.value)}></input>
            <br></br>

            <label>Creation date:</label>
            <input id="date" type='date' onChange={(evt) => setDataCreereMeeting(evt.target.value)}></input>
            <br></br>
            <Button onClick={(e) => {
                e.preventDefault();
                var descriere = document.getElementById("descriere").value;
                var url = document.getElementById("url").value;
                var date = document.getElementById("date").value;
                console.log(date);
                updateMeeting(descriere, url, date);
                window.location.reload()
            }}
                type='submit' color="primary" fullWidth variant="outlined">Modificare</Button>
        </div>);
    }

    useEffect(async () => {
        const response = await fetch(`${SERVER}/meetings`)
        const data = await response.json()
        const meeting = data.find((e) => e.idMeeting === item.id)
        setMeeting(meeting)
    }, []);
    return (

        <Grid container spacing={3} alignItems="center"
        >
            <Grid item xs={4}>
                <Item>
                    Meeting description: {item.descriere}
                </Item>
            </Grid>
            <Grid item xs={4}>
                <Item>
                    Url: {item.url}
                </Item>
            </Grid>
            <Grid item xs={4}>
                <Item>
                    Creation date: {item.dataCreere}
                </Item>
            </Grid>
            <Grid item xs={4}>
                <Button onClick={(e) => {
                    e.preventDefault()
                    fetch(`http://localhost:8080/meetings/${item.idMeeting}`, {
                        method: 'DELETE'
                    }).then((response) => {
                        if (response.ok) {
                            window.location.reload()
                        } else {
                            alert('Delete errror!')
                        }
                    })
                }}
                    type='submit' color="primary" fullWidth variant="outlined">
                    Delete: {item.idMeeting}
                </Button>
                
                
            </Grid>

            <Grid item xs={3}>
                <Child parentToChild={componenta} />

                <div className="child">
                    <Button primary onClick={() => parentToChild()}>Modifica</Button>
                </div>
            </Grid>

        </Grid>

    )
} export default ListaMeetings
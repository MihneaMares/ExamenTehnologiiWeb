import { useState } from "react";
import '../css/FormularAdaugareMeeting.css'
import { Button, Grid } from '@material-ui/core'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function FormularAdaugareMeeting(props) {

    const [descriere, setDescriere] = useState('')
    const [url, setUrl] = useState('')
    const [dataCreere, setDataCreere] = useState('')

    const addMeeting = () => {
        fetch(`http://localhost:8080/meetings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                descriere: descriere,
                url: url,
                dataCreere: dataCreere
            })
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                alert('Adaugare gresita de entitate1!')
            }
        })

    }


    return (
        <div >

            <Grid item xs={8} justifyContent="center">
                <h1>Adauga Meeting:</h1>
                <br></br>
                <Item>

                    <label>Descriere meeting: </label>
                    <input type='text' placeholder='descriere meeting' onChange={(evt) => setDescriere(evt.target.value)}></input>
                    <br></br>

                    <label>Url: </label>
                    <input type='text' placeholder='url' onChange={(evt) => setUrl(evt.target.value)}></input>
                    <br></br>

                    <label>Date: </label>
                    <input type='date' placeholder='date' onChange={(evt) => setDataCreere(evt.target.value)}></input>
                    <br></br>

                </Item>
                <Button onClick={(e) => {
                    e.preventDefault()
                    addMeeting();
                    window.location.reload()
                }}
                    type='submit' color="primary" fullWidth variant="outlined">Adaugare</Button>
            </Grid>


        </div>
    )
}
export default FormularAdaugareMeeting
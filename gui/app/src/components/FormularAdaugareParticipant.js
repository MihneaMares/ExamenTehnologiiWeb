import { useState } from "react";
import '../css/FormularAdaugareMeeting.css'
import { Button } from '@material-ui/core'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function FormularAdaugareParticipanti(props) {
    const [MeetingIdMeeting, setMeetingIdMeeting] = useState('')
    const [numeParticipant, setNumeParticipant] = useState('')
   
    const addParticipant = () => {
        fetch(`http://localhost:8080/meeting/${MeetingIdMeeting}/participants`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                numeParticipant: numeParticipant,
               
            })
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                alert('Adaugare gresita de entitate2!')
            }
        })

    }


    return (
        <div >
            <h1>Adauga participant:</h1>
            <br></br>

            <label>Id meeting: </label>
            <input type='number' placeholder='id meeting' onChange={(evt) => setMeetingIdMeeting(evt.target.value)}></input>
            <br></br>

            <label>Nume participant: </label>
            <input type='text' placeholder='nume participant' onChange={(evt) => setNumeParticipant(evt.target.value)}></input>
            <br></br>


            <Button onClick={(e) => {
                e.preventDefault()
                addParticipant();
            }}
                type='submit' color="primary" fullWidth variant="outlined">Adaugare</Button>
        </div>
    )
}
export default FormularAdaugareParticipanti
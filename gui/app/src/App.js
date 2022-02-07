
import './App.css';
import { useEffect, useState } from 'react'

import AfisareEntitate1 from './components/AfisareMeeting'
import AfisareParticipanti from './components/AfisareParticipanti'
import PaginaDeInceput from './components/PaginaDeInceput'
import FormularAdaugareMeeting from './components/FormularAdaugareMeeting'
import FormularAdaugareParticipanti from './components/FormularAdaugareParticipant'

import AfisareMeeting from './components/AfisareMeeting';


function App() {
  const [currentPage, setCurrentPage] = useState('PaginaDeInceput')

  return (
    <div className="App">

      <>
        <nav className='nav'>

          <a href='#' onClick={() => setCurrentPage('AfisareMeeting')}>
          Meetings&nbsp;&nbsp;&nbsp;
          </a>
          <a href='#' onClick={() => setCurrentPage('AfisareParticipanti')}>
          Participants&nbsp;&nbsp;&nbsp;
          </a>
          <a href='#' onClick={() => setCurrentPage('FormularAdaugareMeeting')}>
          Add Meeting&nbsp;&nbsp;&nbsp;
          </a>
          <a href='#' onClick={() => setCurrentPage('FormularAdaugareParticipant')}>
          Add Participant&nbsp;&nbsp;&nbsp;
          </a>


        </nav>
<br></br>
<br></br>
        {currentPage === 'AfisareMeeting' && <AfisareMeeting />}
        {currentPage === 'AfisareParticipanti' && <AfisareParticipanti />}
        {currentPage === 'PaginaDeInceput' && <PaginaDeInceput />}
        {currentPage === 'FormularAdaugareMeeting' && <FormularAdaugareMeeting />}
        {currentPage === 'FormularAdaugareParticipant' && <FormularAdaugareParticipanti />}
      </>
  </div>
  );
}

export default App;

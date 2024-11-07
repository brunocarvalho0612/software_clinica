$(document).ready(function() {
  $('#cpf').mask('000.000.000-00'); 
  $('#telefone').mask('(00) 00000-0000');
  $('#cep').mask('00000-000');
  $('#dataNascimento').mask('00/00/0000');
});

import { Calendar } from '@fullcalendar/core'
import timeGridPlugin from '@fullcalendar/timegrid'

const calendar = new Calendar(calendarEl, {
  plugins: [timeGridPlugin],
  initialView: 'timeGridWeek',
  headerToolbar: {
    left: 'prev,next',
    center: 'title',
    right: 'timeGridWeek,timeGridDay' // user can switch between the two
  }
})



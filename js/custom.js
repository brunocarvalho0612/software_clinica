document.addEventListener('DOMContentLoaded', function() {
  const calendarEl = document.getElementById('calendar');

  // Função para obter eventos salvos no LocalStorage
  function getStoredEvents() {
    const storedEvents = localStorage.getItem('events');
    return storedEvents ? JSON.parse(storedEvents) : [];
  }
  

  // Função para salvar eventos no LocalStorage
  function saveEvents(events) {
    localStorage.setItem('events', JSON.stringify(events));
  }

  // Inicializar o calendário
  const calendar = new FullCalendar.Calendar(calendarEl, {
    themeSystem: 'bootstrap5',
    timeZone: 'UTC',
    initialView: 'timeGridWeek',
    locale: 'pt-br',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek,timeGridDay',
    },
    events: getStoredEvents(), // Carrega eventos salvos do LocalStorage

    // Permite criar novos eventos ao clicar e arrastar
    selectable: true,
    selectMirror: true,
    select: function(arg) {
      const title = prompt('Digite o título do evento:');
      if (title) {
        const newEvent = {
          id: Date.now().toString(), // ID único
          title: title,
          start: arg.start,
          end: arg.end,
          allDay: arg.allDay
        };

        // Adiciona o evento ao calendário e ao LocalStorage
        calendar.addEvent(newEvent);
        const currentEvents = getStoredEvents();
        currentEvents.push(newEvent);
        saveEvents(currentEvents);
      }
      calendar.unselect();
    },

    // Permite editar ou remover eventos ao clicar
    editable: true,
    eventClick: function(arg) {
      if (confirm('Deseja excluir este evento?')) {
        const eventId = arg.event.id; // Obtém o ID do evento
        arg.event.remove();
    
        // Atualiza os eventos salvos após a exclusão
        const updatedEvents = getStoredEvents().filter(event => event.id !== eventId);
        saveEvents(updatedEvents);
      }
    },
    

    // Permite arrastar e soltar eventos e atualiza o LocalStorage
    eventDrop: function(info) {
      const updatedEvents = calendar.getEvents().map(event => ({
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        allDay: event.allDay
      }));
      saveEvents(updatedEvents);
    }

  });

  calendar.render();
});

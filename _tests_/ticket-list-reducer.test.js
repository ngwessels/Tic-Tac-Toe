import ticketListReducer from './../src/reducers/ticket-list-reducer';



describe('ticketListReducer', () => {
  let action;
  const sampleTIcketData = {
    names : 'Ruan & Aimen',
    location : '4B',
    issue : 'Jest is being a diva and won\'t work with webpack!',
    timeOpen : 1500000000,
    id: 0
  };

  test('Should return default state if no action type is recognized', () => {
    expect(ticketListReducer({}, { type: null })).toEqual({});
  })

  test('Should successfully add new ticket data to masterTicketList', () => {
    const { names, location, issue, timeOpen, id } = sampleTicketData;
    action = {
      type: 'ADD_TICKET',
      names: names,
      location: location,
      issue: issue,
      timeOpen: timeOpen,
      id: id
    };
    expect(ticketListReducer({}, action)).toEqual({
      [id] : {
        names: names,
        location: location,
        issue: issue,
        timeOpen: timeOpen,
        id: id
      }
    });
  });
});

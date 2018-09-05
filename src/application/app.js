import EventPoll from '../event_poll'
import { ulid } from 'ulid'

class App {
  constructor (baseUrl, eventPollRepository) {
    this.baseUrl = baseUrl
    this.eventPollRepository = eventPollRepository
  }

  newEventPoll (aTitle, posibleDates) {
    const aEventPoll = new EventPoll(ulid(), this.baseUrl, aTitle, posibleDates)
    return this.eventPollRepository
      .save(aEventPoll)
      .then(() => aEventPoll.id)
      .catch((error) => error)
  }
}

export default App

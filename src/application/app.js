import EventPoll from '../event_poll'
import { ulid } from 'ulid'

class App {
  constructor (baseUrl, eventPollRepository) {
    this.baseUrl = baseUrl
    this.eventPollRepository = eventPollRepository
  }

  newEventPoll (aTitle, posibleDates) {
    const aEventPoll = new EventPoll(ulid(), this.baseUrl, aTitle, posibleDates)
    this.eventPollRepository.save(aEventPoll)
    return aEventPoll.id
  }
}

export default App

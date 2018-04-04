import EventPoll from '../event_poll'
import { ulid } from 'ulid'

class App {
  constructor (baseUrl, eventPollRepository) {
    this.baseUrl = baseUrl
    this.eventPollRepository = eventPollRepository
  }

  newEventPoll (aTitle, aDate) {
    const aEventPoll = new EventPoll(ulid(), this.baseUrl, aTitle, aDate)
    this.eventPollRepository.save(aEventPoll)
    return aEventPoll.id
  }
}

export default App

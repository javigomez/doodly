import EventPoll from "../event_poll";

class App {
  constructor(baseUrl, repository) {
    this.baseUrl = baseUrl
    this.repository = repository
  }

  newEventPoll(aTitle, aDate) {
    var aEventPoll = new EventPoll(this.baseUrl, aTitle, aDate)
    this.repository.setItem('aEventPoll', aEventPoll)
  }
}

export default App

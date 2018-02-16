import EventPoll from "../event_poll";

class App {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  newEventPoll(aTitle, aDate) {
    return new EventPoll(this.baseUrl, aTitle, aDate)
  }
}

export default App

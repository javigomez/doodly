import EventPoll from "../event_poll";

class App {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  newEventPoll(aTittle, aDate) {
    return new EventPoll(this.baseUrl)
  }
}

export default App

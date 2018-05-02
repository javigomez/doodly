export default class EventPollRepository {
  constructor () {
    this.storage = {}
  }

  findById (id) {
    return this.storage[id]
  }

  save (eventPoll) {
    this.storage[eventPoll.id] = eventPoll
  }

  all () {
    return Object.keys(this.storage).map(eventPollId => this.storage[eventPollId])
  }
}

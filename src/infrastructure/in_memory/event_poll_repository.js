export default class EventPollRepository {
  constructor () {
    this.storage = {}
  }

  findById (id) {
    return Promise.resolve(this.storage[id])
  }

  save (eventPoll) {
    this.storage[eventPoll.id] = eventPoll
    return Promise.resolve()
  }

  all () {
    return new Promise((resolve) => {
      resolve(Object.keys(this.storage).map(eventPollId => this.storage[eventPollId]))
    })
  }
}

import MemoryStorage from 'memorystorage'

export default class EventPollRepository {
  constructor () {
    this.storage = new MemoryStorage('doodlddddyDB')
  }

  findById (id) {
    return this.storage.getItem(id)
  }

  save (eventPoll) {
    this.storage.setItem(eventPoll.id, eventPoll)
  }
}

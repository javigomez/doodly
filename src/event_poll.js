import VotingUrl from './voting_url'
import { ulid } from 'ulid'

class EventPoll {
  constructor(id, baseUrl, title, date) {
    this.id = id
    this.baseUrl = baseUrl
    this.title = title
    this.date = date
  }

  votingUrl() {
    return new VotingUrl(this.baseUrl, this)
  }
}

export default EventPoll

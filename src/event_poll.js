import VotingUrl from './voting_url'

class EventPoll {
  constructor(baseUrl, title, date) {
    this.baseUrl = baseUrl
    this.title = title
    this.date = date
  }

  votingUrl() {
    return new VotingUrl(this.baseUrl, this)
  }
}

export default EventPoll

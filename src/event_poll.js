import VotingUrl from './voting_url'

class EventPoll {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }
  votingUrl() {
    return new VotingUrl(this.baseUrl, this)
  }
}

export default EventPoll

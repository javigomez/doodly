import VotingUrl from './voting_url'

class EventPoll {
  constructor (id, baseUrl, title, possibleDates) {
    this.id = id
    this.baseUrl = baseUrl
    this.title = title
    this.possibleDates = possibleDates
  }

  votingUrl () {
    return new VotingUrl(this.baseUrl, this)
  }
}

export default EventPoll

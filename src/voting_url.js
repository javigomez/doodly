class VotingUrl
{
  constructor(baseUrl, votingPoll) {
    this.votingPoll = votingPoll
    this.baseUrl = baseUrl
  }

  value() {
    return `${this.baseUrl}/voting/${this.votingPoll.id}`
  }

  equalsTo(other) {
    return other instanceof VotingUrl && this.value() === other.value()
  }
}

export default VotingUrl

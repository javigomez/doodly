class App {
  newEventPoll(aTittle, aDate) {
    return new EventPoll()
  }
}

class EventPoll {
  votingUrl() {
    return new VotingUrl()
  }
}

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

describe('a doodle like app', () => {
  const app = new App

  describe('create event scheduling poll', () => {
    const aTittle = 'Event tittle'
    const aDate = new Date
    const anEventPoll = app.newEventPoll(aTittle, aDate)

    expect(anEventPoll).toBeInstanceOf(EventPoll)

    it('gives an URL to share with attendees to vote', () => {
      const aVotingUrl = anEventPoll.votingUrl()
      const expectedUrl = new VotingUrl("http://domain.org", anEventPoll)

      expect(aVotingUrl).toBeVotingUrl(expectedUrl)
    })

    describe('someone visits the voting URL', () => {
      it('allows user to confirm attendance', () => {
      })
    })
  })
})

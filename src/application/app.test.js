import EventPoll from '../event_poll'
import VotingUrl from '../voting_url'
import App from './app'

describe('a doodle like app', () => {
  const baseUrl = "http://domain.org";
  const app = new App(baseUrl)

  describe('create event scheduling poll', () => {
    const aTittle = 'Event tittle'
    const aDate = new Date
    const anEventPoll = app.newEventPoll(aTittle, aDate)

    expect(anEventPoll).toBeInstanceOf(EventPoll)

    it('gives an URL to share with attendees to vote', () => {
      const aVotingUrl = anEventPoll.votingUrl()
      const expectedUrl = new VotingUrl(baseUrl, anEventPoll)

      expect(aVotingUrl.equalsTo(expectedUrl)).toBe(true)
    })

    describe('someone visits the voting URL', () => {
      it('allows user to confirm attendance', () => {
      })
    })
  })
})

import EventPoll from '../event_poll'
import VotingUrl from '../voting_url'
import App from './app'
import EventPollRepository from '../infrastructure/in_memory/event_poll_repository'
const baseUrl = 'http://domain.org'

describe('a doodle like app', () => {
  describe('create event scheduling poll', () => {

    it('returns an event poll', async () => {
        const anEventPoll = await createPoll()
        expect(anEventPoll).toBeInstanceOf(EventPoll)
    })

    it('has a title and possible dates for the event', async () => {
      const possibleDates = [new Date(), new Date()]
      const aTitle = 'Event title'
      const anEventPoll = await createPoll(aTitle, possibleDates)

      expect(anEventPoll.title).toBe(aTitle)
      expect(anEventPoll.possibleDates).toBe(possibleDates)
    })

    it('gives an URL to share with attendees to vote', async () => {
      const anEventPoll = await createPoll()
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

function createPoll (aTitle, possibleDates) {
  const eventPollRepository = new EventPollRepository()
  const app = new App(baseUrl, eventPollRepository)

  return app.newEventPoll(aTitle, possibleDates)
    .then( (anEventPollId) => {
      return eventPollRepository.findById(anEventPollId)
    })
}
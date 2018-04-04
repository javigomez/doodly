import EventPoll from '../event_poll'
import VotingUrl from '../voting_url'
import App from './app'
import EventPollRepository from '../infrastructure/in_memory/event_poll_repository'

const baseUrl = 'http://domain.org'

describe('a doodle like app', () => {
  const eventPollRepository = new EventPollRepository()
  const app = new App(baseUrl, eventPollRepository)

  describe('create event scheduling poll', () => {
    const aTitle = 'Event title'
    const aDate = new Date()
    const anEventPollId = app.newEventPoll(aTitle, aDate)
    const anEventPoll = eventPollRepository.findById(anEventPollId)

    expect(anEventPoll).toBeInstanceOf(EventPoll)

    it('has a title and date', () => {
      expect(anEventPoll.title).toBe(aTitle)
      expect(anEventPoll.date).toBe(aDate)
    })

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

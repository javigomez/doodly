import EventPoll from '../event_poll'
import VotingUrl from '../voting_url'
import App from './app'
import EventPollRepository from '../infrastructure/in_memory/event_poll_repository'
import faker from 'faker'
const baseUrl = 'http://domain.org'

describe('a doodle like app', () => {
  const eventPollRepository = new EventPollRepository()
  const app = new App(baseUrl, eventPollRepository)

  describe('create event scheduling poll', () => {
    const aTitle = 'Event title'
    const possibleDates = [faker.date.future(), faker.date.future()]
    const anEventPollId = app.newEventPoll(aTitle, possibleDates)
    const anEventPoll = eventPollRepository.findById(anEventPollId)

    expect(anEventPoll).toBeInstanceOf(EventPoll)

    it('has a title and possible dates for the event', () => {
      expect(anEventPoll.title).toBe(aTitle)
      expect(anEventPoll.possibleDates).toBe(possibleDates)
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

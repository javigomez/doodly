import VotingUrl from './voting_url'
const Url = require('url')

describe('a voting url', () => {
  const abaseUrl = 'http://domain.org'
  const anEventPoll = { 'id': '32' }

  const aVotingUrl = new VotingUrl(abaseUrl, anEventPoll)

  expect(aVotingUrl).toBeInstanceOf(VotingUrl)

  it('has base url and a voting poll', () => {
    expect(aVotingUrl.baseUrl).toBe(abaseUrl)
    expect(aVotingUrl.votingPoll).toBe(anEventPoll)
  })

  it('has a value equal to a valid voting url', () => {
    const actualUrl = Url.parse(aVotingUrl.value())

    expect(actualUrl.host).toBe(Url.parse(abaseUrl).host)
    expect(actualUrl.protocol).toBe(Url.parse(abaseUrl).protocol)
    expect(actualUrl.path).toBe('/voting/' + anEventPoll.id)
  })

  it('is not equal to a random url', () => {
    expect(aVotingUrl.equalsTo('http://www.wikipedia.org')).toBeFalsy()
  })

  it('is not equal to a random votingUrl', () => {
    const anotherVotingUrl = new VotingUrl('http://domain.org', { 'id': 33 })
    expect(aVotingUrl.equalsTo(anotherVotingUrl)).toBeFalsy()
  })
})

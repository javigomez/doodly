import { mount } from 'enzyme'
import React from 'react'
import EventPollRepository from '../in_memory/event_poll_repository'
import CreatePoll from './create_poll'
import App from '../../application/app';

describe('UI integrated: creating a poll form', () => {
  const baseUrl = 'http://domain.org'
  const inMemoryPollingRepository = new EventPollRepository()
  const app = new App(baseUrl, inMemoryPollingRepository)
  const createPoll = app.newEventPoll.bind(app)

  it('App receives the create poll request and returns a created poll with the passed details', () => {
    const createPollComponent = mount(<CreatePoll createPoll = {createPoll} />)

      createPollComponent.find('#title')
        .simulate('change', { target: { value: 'An Event Poll' } })

      const chosenDates = tomorrow()
      createPollComponent.find('#date')
        .simulate('change', { target: { value: chosenDates } })
      
      createPollComponent.find('form').first()
        .simulate('submit')

      const existingPolls = inMemoryPollingRepository.all()
      expect(existingPolls.length).toBe(1)
      expect(existingPolls[0].title).toBe('An Event Poll')
      expect(existingPolls[0].possibleDates).toEqual([chosenDates])
    })
  })


function tomorrow() {
  const currentDate = new Date()
  return currentDate.setDate(currentDate.getDate() + 1)
}
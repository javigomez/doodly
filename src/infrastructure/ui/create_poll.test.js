import { mount } from 'enzyme'
import React from 'react'
import EventPollRepository from '../in_memory/event_poll_repository'
import CreatePoll from './create_poll'

describe('Create a poll', () => {
  const baseUrl = 'http://domain.org'
  const inMemoryPollingRepository = new EventPollRepository()


  it('Creates a poll', () => {
    const createPoll = mount(<CreatePoll domain={baseUrl} pollingRepository={inMemoryPollingRepository} />)

    createPoll.find('#title')
      .simulate('change', { target: { value: 'An Event Poll' } })
    
    const chosenDates = tomorrow()
    createPoll.find('#date')
      .simulate('change', { target: { value: chosenDates } })
    createPoll.find('form').first()
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
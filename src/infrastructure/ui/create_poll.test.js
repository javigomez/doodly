import { mount } from 'enzyme'
import { Router } from 'react-router'
import React from 'react'
import CreatePoll from './create_poll'
import { createMemoryHistory } from 'history'

describe('UI isolated: Creating a poll form', () => {
  const createdPollId = "123234"
  let createPollPromiseResolve
  const createPollPromise = new Promise(resolve => {
    createPollPromiseResolve = resolve
  })
  const pollFactory = jest.fn().mockImplementation((title, dates) => {
    return createPollPromise
  })
  const history = createMemoryHistory()

  it('calls createPoll function with poll details on form submit', () => {
    const createPollComponent = mount(
      <Router history={history}>
        <CreatePoll createPoll={pollFactory} />
      </Router>)
    
    createPollComponent.find('#title')
        .simulate('change', { target: { value: 'An Event Poll' } })
      
      const chosenDates = tomorrow()
      createPollComponent.find('#date')
        .simulate('change', { target: { value: chosenDates } })
      createPollComponent.find('form').first()
        .simulate('submit')
      
      expect(pollFactory.mock.calls.length).toBe(1)
      expect(pollFactory.mock.calls[0][0]).toEqual('An Event Poll')
      expect(pollFactory.mock.calls[0][1]).toEqual([chosenDates])

      expect(createPollComponent.find('#submit').props().disabled).toBe("disabled")

      createPollPromiseResolve(createdPollId)

      return createPollPromise.then(_ => {
        createPollComponent.update()
        expect(history.location.pathname).toBe('/poll/' + createdPollId)
      })
    })
  })

function tomorrow() {
  const currentDate = new Date()
  return currentDate.setDate(currentDate.getDate() + 1)
}
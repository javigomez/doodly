import { mount } from 'enzyme'
import { Router } from 'react-router'
import React from 'react'
import CreatePoll from './create_poll'
import { createMemoryHistory } from 'history'

describe('CreatePoll page', () => {
  const createdPollId = "123234"
  let createPollPromiseResolve
  const createPollPromise = new Promise(resolve => {
    createPollPromiseResolve = resolve
  })
  const pollFactory = jest.fn().mockImplementation((title, dates) => {
    return createPollPromise
  })
  const history = createMemoryHistory()
  const chosenDates = tomorrow()

  describe('a successful poll creation', () => {
    let createPollComponent = null
    beforeAll(() => {
      createPollComponent = mount(
        <Router history={history}>
          <CreatePoll createPoll={pollFactory} />
        </Router>)
      
      createPollComponent.find('#title')
        .simulate('change', { target: { value: 'An Event Poll' } })
      createPollComponent.find('#date')
        .simulate('change', { target: { value: chosenDates } })
      createPollComponent.find('form').first()
        .simulate('submit')
    })

    it('calls createPoll function with a Title and Dates', () => {
      expect(pollFactory.mock.calls.length).toBe(1)
      expect(pollFactory.mock.calls[0][0]).toEqual('An Event Poll')
      expect(pollFactory.mock.calls[0][1]).toEqual([chosenDates])
    })

    it('disables submission button', () => {
      expect(createPollComponent.find('#submit').props().disabled).toBe("disabled")
    })

    it('redirects to created poll', () => {    
      createPollPromiseResolve(createdPollId)

      return createPollPromise.then(_ => {
        createPollComponent.update()
        expect(history.location.pathname).toBe('/poll/' + createdPollId)
      })
    })
  })
})

function tomorrow() {
  const currentDate = new Date()
  return currentDate.setDate(currentDate.getDate() + 1)
}
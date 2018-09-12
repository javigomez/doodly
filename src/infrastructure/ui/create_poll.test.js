import { mount } from 'enzyme'
import {MemoryRouter, Route, Switch} from 'react-router'
import React from 'react'
import CreatePoll from './create_poll'

describe('CreatePoll page', () => {
  const createdPollId = '123234'
  const createdPollTitle = 'An Event Poll'
  let createPollPromiseResolve
  const createPollPromise = new Promise(resolve => {
    createPollPromiseResolve = resolve
  })
  const pollFactory = jest.fn().mockImplementation((title, dates) => {
    return createPollPromise
  })
  const chosenDates = tomorrow()
  const ViewPollMock = () => <div></div>
  const viewPollRoute = <Route component={ViewPollMock} path="/poll/:id"/>
  const createPollRoute = <Route
    exact={true} path="/"
    render={() => <CreatePoll createPoll={pollFactory} /> } />

  describe('a successful poll creation', () => {
    let createPollComponent = null
    beforeAll(() => {
      createPollComponent = mount(
        <MemoryRouter initialEntries={["/"]} initialIndex={0}>
          <Switch>
            {createPollRoute}
            {viewPollRoute}
          </Switch>
        </MemoryRouter>)

      createPollComponent.find('#title')
        .simulate('change', { target: { value: createdPollTitle } })
      createPollComponent.find('#date')
        .simulate('change', { target: { value: chosenDates } })
      createPollComponent.find('form').first()
        .simulate('submit')
    })

    it('calls createPoll function with a Title and Dates', () => {
      expect(pollFactory.mock.calls.length).toBe(1)
      expect(pollFactory.mock.calls[0][0]).toEqual(createdPollTitle)
      expect(pollFactory.mock.calls[0][1]).toEqual([chosenDates])
    })

    it('disables submission button', () => {
      expect(createPollComponent.find('#submit').props().disabled).toBe("disabled")
    })

    it('redirects to created poll', () => {    
      createPollPromiseResolve(createdPollId)

      return createPollPromise.then(_ => {
        createPollComponent.update()
        expect(createPollComponent.containsMatchingElement(viewPollRoute))
          .toBe(true)
        expect(createPollComponent.containsMatchingElement(createPollRoute))
          .toBe(false)
      })
    })
  })
})

function tomorrow() {
  const currentDate = new Date()
  return currentDate.setDate(currentDate.getDate() + 1)
}
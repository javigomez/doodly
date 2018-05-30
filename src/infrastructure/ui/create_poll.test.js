import { mount } from 'enzyme'
import { MemoryRouter, Redirect } from 'react-router'
import React from 'react'
import CreatePoll from './create_poll'

describe('UI isolated: Creating a poll form', () => {
  it('calls createPoll function with poll details on form submit', () => {
    const createdPollId = "123234"
    let createPollPromiseResolve
    const createPollPromise = new Promise(resolve => {
      createPollPromiseResolve = resolve
    })
    const pollFactory = jest.fn().mockImplementation((title, dates) => {
      console.log(createPollPromise)
      return createPollPromise
    })
    // const pollFactory = jest.fn().mockImplementation((title, dates, cb) => {
    //   createPollCallback = cb
    // })

    const createPollComponent = mount(<MemoryRouter>
      <CreatePoll createPoll={pollFactory} />
    </MemoryRouter>)

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
      expect(createPollComponent.containsMatchingElement(<Redirect to={`/poll/${createdPollId}`} />)).toBe(true)
    })
  })
})

function tomorrow() {
  const currentDate = new Date()
  return currentDate.setDate(currentDate.getDate() + 1)
}
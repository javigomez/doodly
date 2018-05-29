import { mount } from 'enzyme'
import { MemoryRouter, Redirect } from 'react-router'
import React from 'react'
import CreatePoll from './create_poll'

describe('UI isolated: Creating a poll form', () => {
  it('calls createPoll function with poll details on form submit', () => {
    const pollFactory = jest.fn()
    let pollCreationFinished
    pollFactory.mockReturnValue(new Promise(resolve => pollCreationFinished = resolve ))
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
    expect(pollFactory.mock.calls[0]).toEqual(['An Event Poll', [chosenDates]])

    expect(createPollComponent.find('#submit').props().disabled).toBe("disabled")

    const createdPollId = "123234"
    pollCreationFinished(createdPollId)

    expect(createPollComponent.containsMatchingElement(<Redirect to="/created-poll" />)).toBe(true)
  })
})

function tomorrow() {
  const currentDate = new Date()
  return currentDate.setDate(currentDate.getDate() + 1)
}
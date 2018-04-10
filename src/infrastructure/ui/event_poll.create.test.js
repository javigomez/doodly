import React from 'react'
import EventPollCreate from './event_poll.create'
import { shallow } from 'enzyme'

it('Event Poll Creation Page renders without crashing', () => {
  const component = shallow(<EventPollCreate />)
  expect(component.exists()).toEqual(true)
  expect(component.getElements()).toMatchSnapshot();
})


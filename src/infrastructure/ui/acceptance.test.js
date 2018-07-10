import { mount } from 'enzyme'
import React from 'react'
import EventPollRepository from '../in_memory/event_poll_repository'
import CreatePoll from './create_poll'
import App from '../../application/app'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

describe('UI integrated: creating a poll form', () => {
  const baseUrl = 'http://domain.org'
  const inMemoryPollingRepository = new EventPollRepository()
  const app = new App(baseUrl, inMemoryPollingRepository)
  const createPoll = app.newEventPoll.bind(app)

  const history = createMemoryHistory()

      it('redirects after submitting the form', async () => {
        const createPollComponent = mount(
          <Router history={history}>
            <CreatePoll createPoll = {createPoll} />
          </Router>
        )
    
          createPollComponent.find('#title')
            .simulate('change', { target: { value: 'An Event Poll' } })
    
          const chosenDates = tomorrow()
          createPollComponent.find('#date')
            .simulate('change', { target: { value: chosenDates } })
          
          createPollComponent.find('form').first()
            .simulate('submit')
    
          const existingPolls = await inMemoryPollingRepository.all()
          expect(existingPolls.length).toBe(1)
          expect(existingPolls[0].title).toBe('An Event Poll')
          expect(existingPolls[0].possibleDates).toEqual([chosenDates])

        return Promise.resolve().then(() => {
          createPollComponent.update()
          expect(createPollComponent.find('form').length).toBe(0)
          expect(history.location.pathname).toBe('/poll/' + existingPolls[0].id)
        })
      })
    })


function tomorrow() {
  const currentDate = new Date()
  return currentDate.setDate(currentDate.getDate() + 1)
}
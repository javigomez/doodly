import App from './application/app'
import EventPollRepository from './infrastructure/in_memory/event_poll_repository'
import CreatePoll from './infrastructure/ui/create_poll'
import {Router, Route, Switch} from 'react-router'
import React from 'react'
import ReactDOM from 'react-dom'

const baseUrl = 'http://domain.org'
const inMemoryPollingRepository = new EventPollRepository()
const app = new App(baseUrl, inMemoryPollingRepository)
const createPoll = app.newEventPoll.bind(app)
const ViewPollMock = () => <div />
const viewPollRoute = <Route component={ViewPollMock} path='/poll/:id' />
const createPollRoute = <Route exact path='/' render={() => <CreatePoll createPoll={createPoll} />} />

ReactDOM.render(
    <CreatePoll createPoll={createPoll} />
  , document.getElementById('root'));
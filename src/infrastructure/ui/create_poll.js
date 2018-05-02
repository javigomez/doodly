import React from 'react'
import PropTypes from 'prop-types'
import App from '../../application/app'
import EventPollRepository from '../in_memory/event_poll_repository'
const baseUrl = 'http://domain.org'


export class CreatePoll extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      date: ''
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleTitleChange(e){
    this.setState({title: e.target.value})
  }

  handleDateChange(e){
    this.setState({date: e.target.value})
  }
  
  onFormSubmit(e) {
    e.preventDefault()
    const app = new App(this.props.domain, this.props.pollingRepository)
    app.newEventPoll(this.state.title, [this.state.date])
  }

  render() {
    return (
      <form onSubmit={(e) => this.onFormSubmit(e)}>
        <input type='text' id='title' onChange={this.handleTitleChange} />
        <input type='text' id='date' onChange={this.handleDateChange} />
        <input type='submit' id='submit' />
      </form>
    )
  }
}

CreatePoll.propTypes = {
  domain: PropTypes.string,
  pollingRepository: PropTypes.instanceOf(EventPollRepository).isRequired,
}

export default CreatePoll


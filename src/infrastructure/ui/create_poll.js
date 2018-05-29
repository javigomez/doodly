import React from 'react'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'

export class CreatePoll extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      date: '',
      creatingPoll: false,
      createdPollId: null,
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  render() {
    return (
      <form onSubmit={(e) => this.onFormSubmit(e)}>
        <input type='text' id='title' onChange={this.handleTitleChange} />
        <input type='date' id='date' onChange={this.handleDateChange} />
        <input type='submit' id='submit' disabled={this.state.creatingPoll ? 'disabled' : ''} />
      </form>
    )
  }

  onFormSubmit(e) {
    e.preventDefault()
    this.setState({ creatingPoll: true })
    this.props.createPoll(this.state.title, [this.state.date])
      .then(pollId => this.setState({ createdPollId: pollId }))
    this.props.history.push(`/poll/${this.state.createdPollId}`);
  }

  handleTitleChange(e){
    this.setState({title: e.target.value})
  }

  handleDateChange(e){
    this.setState({date: e.target.value})
  }
}

CreatePoll.propTypes = {
  createPoll: PropTypes.func.isRequired,
}

export default withRouter(CreatePoll)


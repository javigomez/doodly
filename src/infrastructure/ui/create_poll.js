import React from 'react'
import PropTypes from 'prop-types'

export class CreatePoll extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      date: '',
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
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

  onFormSubmit(e) {
    e.preventDefault()
    this.props.createPoll(this.state.title, [this.state.date])
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

export default CreatePoll


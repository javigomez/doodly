import React from 'react'

export default class EventPollCreate extends React.Component {
  render () {
    return (
      <div>
        <h1>Create a Event Poll</h1>
        <form name="message" method="post">
          <label htmlFor="title">Event title</label>
          <input type="text" id="title" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

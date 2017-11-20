import React, { Component } from 'react';

export default class SelectMulti extends Component {
  constructor() {
    super();
    this.state = { };

    this.first = this.first.bind(this);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.last = this.last.bind(this);
    this.handleAction = this.handleAction.bind(this);
  }

  first() {
    this.handleAction('first')
  }

  previous() {
    this.handleAction('previous')
  }

  next() {
    this.handleAction('next')
  }

  last() {
    this.handleAction('last')
  }

  handleAction(str) {
    this.props.selection([this.props.name, str])
  }
  
  render() {
    /*
    Important Notes:

    This is a carousel bar:    <<     <      >    >> 
    meaning:                 first previous next last

    OnChange will return current state back to the calling component.
    The return value is an array of objects
    return prop = this.props.selection
    */

    const title = this.props.title;

    return (

      <div className="row">
        <div className="col-xs-12">

            <div className="col-xs-1 col-xs-offset-4 textWidth60 center noPadLR">
              <button onClick={ this.first }>
                <span className="glyphicon glyphicon-chevron-left textGrey" aria-hidden="true" />
                <span className="glyphicon glyphicon-chevron-left textGrey" aria-hidden="true" />
              </button>
            </div>

            <div className="col-xs-1 textWidth60 center noPadLR">
              <button onClick={ this.previous }>
                <span className="glyphicon glyphicon-chevron-left textGrey" aria-hidden="true" />
              </button>
            </div>

            <div className="col-xs-2 center textWidth120 noPadLR">
              <h5>{ title }</h5>
            </div>

            <div className="col-xs-1 textWidth60 center noPadLR">
              <button onClick={ this.next }>
                <span className="glyphicon glyphicon-chevron-right textGrey" aria-hidden="true" />
              </button>
            </div>

            <div className="col-xs-1 textWidth60 center noPadLR">
              <button onClick={ this.last }>
                <span className="glyphicon glyphicon-chevron-right textGrey" aria-hidden="true" />
                <span className="glyphicon glyphicon-chevron-right textGrey" aria-hidden="true" />
              </button>
            </div>

        </div>
      </div>

    )
  }
}

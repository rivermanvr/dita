import React, { Component } from 'react';

export default class TestBed extends Component {
  constructor() {
    super();
    this.state = { id: 0, name: '', errorAdd: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount(){
  }

  componentWillReceiveProps(nextProps) {
    //there is also: currentProps
    if (!nextProps.selectedTest.id) return;
    this.setState({
      id: nextProps.selectedTest.id,
      name: nextProps.selectedTest.name,
      errorAdd: ''
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.name) {
      const testChg = this.state;
      testChg.photo = this.props.selectedTest.photo;
      this.props.updateTest(testChg);
    } else {
      this.setState({ errorAdd: 'Name cannot be blank', name: this.state.test.name });
    }
  }

  handleInput(event) {
    const name = event.target.name;
    const value = event.target.value;
    switch (name) {
      case 'name':
        this.setState({ name: value });
        break;
      case 'phone':
        this.setState({ phone: value });
        break;
    }
  }

  render() {
    return (
      <div>
        our testBed component
      </div>
    )
  }
}

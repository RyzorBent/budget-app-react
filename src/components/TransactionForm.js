import React, { Component } from "react";
import { Box, CheckBox, FormField, TextInput, Button } from 'grommet';

class RecordForm extends Component {
  constructor(props) {
    super(props);
    this.state = { income: false, description: "", value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    //this.props.addRecordToList(this.state);
  }

  handleSelectChange(e) {
    console.log(e.target.value);
    this.setState({ record_type: e.target.value });
  }


  render() {
    const { income } = this.state;
    return (
      <form onSubmit={event => event.preventDefault()}>
        <Box direction="row" align="center" justify="center" flex padding="xlarge" >
          <CheckBox
            toggle
            checked={income}
            onChange={event => this.setState({ income: event.target.checked })}
          />
          <FormField label='Description'>/
            <TextInput />
          </FormField>
          <FormField label='Amount'><TextInput /></FormField>
          <Button type='submit' label='Submit' primary={true} />
        </Box>
      </form>




      // <form>
      //   <select value={this.state.record_type} onChange={this.handleSelectChange}>
      //     <option value="income" >+</option>
      //     <option value="expense">-</option>
      //   </select>
      //   <input
      //     type="text"
      //     name="description"
      //     placeholder="add description"
      //     value={this.state.description}
      //     onChange={this.handleChange}
      //   />
      //   <input
      //     type="text"
      //     name="value"
      //     placeholder="value"
      //     value={this.state.value}
      //     onChange={this.handleChange}
      //   />
      //   <button type='submit' onClick={this.handleSubmit}>add Record</button>
      // </form>
    );
  }
}

export default RecordForm;

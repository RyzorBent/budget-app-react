import React, { Component } from "react";
import { Box, CheckBox, TextInput, Button } from "grommet";

class ItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      income: false,
      record_type: "",
      description: "",
      value: ""
    };
  }

  

  render() {
    const { description, value, income } = this.state;
    const { addRecordToList } = this.props;
    return (
      <form onSubmit={event => event.preventDefault()}>
        <Box
          direction="row"
          align="center"
          justify="center"
          flex
          padding="xlarge"
        >
          <CheckBox
            toggle
            checked={income}
            onChange={event => this.setState({ income: event.target.checked })}
          />

          <TextInput
            name="description"
            placeholder="description"
            value={description}
            onChange={event =>
              this.setState({ description: event.target.value })
            }
          />
          <TextInput
            name="value"
            placeholder="amount"
            value={value}
            onChange={event => this.setState({ value: event.target.value })}
          />
          <Button
            type="submit"
            label="Submit"
            primary={true}
            onClick={event => addRecordToList(this.state)}
          />
        </Box>
      </form>
    );
  }
}

export default ItemForm;

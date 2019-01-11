import React, { Component } from "react";
import { Grommet, Box } from "grommet";
import { grommet } from "grommet/themes";
import TableColumn from './TableColumn';

class RecordsTable extends Component {

  constructor(props){
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(id){
    this.props.delete(id, 'expense');
  }

  render() {
    
    const formatedExpenses = this.props.expense.map((e) => {
     let {_id, description, percentage, month, value} = e;
     let date = new Date(month);
     let remove = this.handleDelete;
     return {_id, description, percentage, date: date.toDateString().toLocaleString('en-ZA'), value: Number(value), remove}
    });

    
   
    return (
      <Grommet theme={grommet}>
        <Box align="center" pad="large">
          <TableColumn
            // columns={columns.map(column => ({
            //   ...column}))}
            data={formatedExpenses}
            onDelete={this.handleDelete}
          />
        </Box>
      </Grommet>
    );
  }
}

export default RecordsTable
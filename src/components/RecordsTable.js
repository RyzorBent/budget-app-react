import React, { Component } from "react";
import { Grommet, Box } from "grommet";
import { grommet } from "grommet/themes";
import { ExpenseTableColumn, IncomeTableColumn } from './TableColumn';


class RecordsTable extends Component {

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(id, record_type) {
    this.props.delete(id, record_type);
  }

  render() {
    let remove = this.handleDelete;

    const formatedExpenses = this.props.expense.map((e) => {
      let { record_type, _id, description, percentage, month, value } = e;
      let date = new Date(month);
      return { record_type, _id, description, percentage, date: date.toDateString().toLocaleString('en-ZA'), value: Number(value), remove, remover: 100 }
    });

    const formatedIncome = this.props.income.map((i) => {
      let { record_type, _id, description, month, value } = i;
      let date = new Date(month);
      return { record_type, _id, description, date: date.toDateString().toLocaleString('en-ZA'), value: Number(value), remove, remover: 100 }
    });

    return (
      <Grommet theme={grommet}>
        <Box align="center" pad="large" elevation="small">
          <ExpenseTableColumn
            data={formatedExpenses}
          />
        </Box>
        <Box align="center" pad="large" elevation="small">
          <IncomeTableColumn data={formatedIncome} />
        </Box>
      </Grommet>
    );
  }
}

export default RecordsTable
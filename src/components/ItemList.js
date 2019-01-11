import React, { Component } from "react";
import ItemRecord from './ItemRecord';


class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      income: [],
      expense: [],
      totalIncome: 0,
      totalExpense: 0,
      budget: 0,
      percentage: -1
    };
  }

  render() {
    const {expense, income, totalExpense, totalIncome} = this.props
    const expenseRecords = expense.map(e => ( //EXPENSES
      <ItemRecord
        key={e._id}
        {...e}
        onDelete={this.props.delete.bind(
          this.props.AppComponent,
          e._id,
          e.record_type
        )}
      />
    ));
    const incomeRecords = income.map(i => ( //INCOMES
      <ItemRecord
        key={i._id}
        {...i}
        calculateAggregates={this.props.calculateAggregates}
        onDelete={this.props.delete.bind(
          this.props.AppComponent,
          i._id,
          i.record_type
        )}
      />
    ));

    return (
      <div>
        <h2>Expense Records: {totalExpense}</h2>
        <ul>{expenseRecords}</ul>
        <h2>Income Records: {totalIncome}</h2>
        <ul>{incomeRecords}</ul>
      </div>
    );
  }
}
export default ItemList;

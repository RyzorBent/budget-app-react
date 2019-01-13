import React, { Component } from "react";
import ItemList from "./components/ItemList";
import { Box, Heading, Grommet } from "grommet";
import NavBar from "./components/NavBar";
import Theme from "./themes/Main";
import * as apiCalls from "./api/FetchRecords";
import displayDate from "./utils/Months";
import BudgetMeter from "./components/BudgetMeter";
import ItemForm from "./components/ItemForm";
// import ServedDataTable from "./components/test";
import RecordsTable from "./components/RecordsTable";


const currentDate = displayDate();

class App extends Component {
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

    this.addRecord = this.addRecord.bind(this);
    this.calculateAggregates = this.calculateAggregates.bind(this);
  }

  componentDidMount() {
    this.loadRecords();
  }

  componentWillUpdate() { }

  calculateAggregates() {
    let totalIncome = 0;
    let totalExpense = 0;
    let budget = 0;
    let percentage = -1;

    this.state.income.forEach(i => (totalIncome += parseFloat(i.value)));
    this.state.expense.forEach(e => (totalExpense += parseFloat(e.value)));
    budget = totalIncome - totalExpense;

    if (totalIncome > 0) {
      percentage = Math.round((totalExpense / totalIncome) * 100);
    } else {
      percentage = -1;
    }
    this.setState({ totalIncome, totalExpense, budget, percentage });
  }

  async addRecord(record) {
    const { totalExpense } = this.state;

    record.value = Number(record.value);
    const itemValue = record.value;
    if (record.income) record.record_type = "income";
    else {
      record.record_type = "expense";
      //Item is not yet added to the total expense, thus we add it to get proper percentage.
      record.percentage = Math.round(
        (itemValue / (totalExpense + itemValue)) * 100
      );
    }

    let createdRecord = await apiCalls.createRecord(record);

    if (createdRecord.record_type === "income") {
      this.setState({ income: [...this.state.income, createdRecord] });
    }
    if (createdRecord.record_type === "expense") {
      const Expenses = [...this.state.expense, createdRecord];
      Expenses.forEach(e => {
        //recalculating percentage
        e.percentage = Math.round(
          (e.value / (totalExpense + parseFloat(createdRecord.value))) * 100
        );
      });

      this.setState({ expense: Expenses });
    }
    this.calculateAggregates();
  }

  async loadRecords() {
    let records = await apiCalls.getRecords();

    records.forEach(record => {
      if (record.record_type === "income") {
        this.setState({ income: [...this.state.income, record] });
      }
      if (record.record_type === "expense") {
        this.setState({ expense: [...this.state.expense, record] });
      }
      this.calculateAggregates();
    });
  }

  async updateRecords() {
    await apiCalls.updateRecords(this.state.expense);
  }

  async deleteRecord(id, record_type) {
    await apiCalls.deleteRecord(id);
    if (record_type === "income") {
      this.setState({
        income: this.state.income.filter(r => r._id !== id)
      });
    }
    if (record_type === "expense") {
      const { totalExpense } = this.state;
      const Expenses = this.state.expense.filter(e => e._id !== id);

      //remove expense of the deleted item, to get new total, to calculate new percentages
      const removedExpenseValue = this.state.expense.filter(ex => ex._id === id).map(v => v.value);
      Expenses.forEach(e => {
        //recalculating percentage
        e.percentage = Math.round((e.value / (totalExpense - removedExpenseValue)) * 100);
      });
      this.setState({
        expense: Expenses
      });
    }
    this.calculateAggregates();
    this.updateRecords();
  }
  render() {
    return (
      <Grommet theme={Theme} full>
        <NavBar>
          <Heading level="4" margin="none">
            Mantrasse
          </Heading>
          <Box
            direction="row"
            align="center"
            justify="center"
            flex
            padding="medium"
          >
            <Heading level="4" margin="small">
              Balance, R {this.state.budget}{" "}
            </Heading>
            <BudgetMeter percentage={this.state.percentage} />
          </Box>
          <Heading level="4" margin="none">
            {currentDate}
          </Heading>
        </NavBar>
        <Box
          fill="horizontal"
          direction="row"
          align="center"
          justify="center"
          flex
          width="large"
        />
        {/* <ServedDataTable /> */}
        <Box>
          <ItemForm addRecordToList={this.addRecord} />
          <Box
            direction="row"
            align="center"
            justify="end"
            flex
            overflow={{ horizontal: "hidden" }}
          >
            {/* <ItemList
              {...this.state}
              delete={this.deleteRecord}
              AppComponent={this}
            /> */}
            <RecordsTable expense={this.state.expense} income={this.state.income} delete={this.deleteRecord.bind(this)} AppComponent={this} />
          </Box>
        </Box>
      </Grommet>
    );
  }
}

export default App;

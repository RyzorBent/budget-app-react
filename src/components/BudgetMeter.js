import React, { Component } from "react";
import { Meter } from "grommet";

class BudgetMeter extends Component {
  state = {};

  render() {
    let expensePercentage = this.props.percentage;
    let incomePercentage = 100 - expensePercentage;
    let expenseColor = '';
    let incomeColor = '#7caeff';
    
    if (incomePercentage > 75){
        expenseColor = '#F8F8F8';
    }
    else if(incomePercentage >= 50 && incomePercentage <= 75 ){
        expenseColor = '#FFAA15';
    }
    else if(incomePercentage <= 50 && incomePercentage >1){
        expenseColor = '#FF4040';
    }
    else if(incomePercentage < 1){
        expenseColor = '#333333';
        // incomeColor = '#333333'
    }
    
    // console.log(expenseColor, ' ', incomePercentage);

    return (
      <Meter
        type="bar"
        round= {true}
        gridArea="budget"
        background = '#333333'
        values={[
          {
            label: "First",
            color: incomeColor,
            value: incomePercentage,
          },
          {
            label: "Second",
            color: expenseColor,
            value: expensePercentage,  
          }
        ]}
      />
    );
  }
}

export default BudgetMeter;

import React from "react";
import { Grommet, Box, DataTable, Meter, Text } from "grommet";
import { grommet } from "grommet/themes";

const amountFormatter = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
  minimumFractionDigits: 2
});

const columns = [
  {
    property: "description",
    header: <Text>Description</Text>,
    primary: true,
    footer: "Total"
  },
  {
    property: "date",
    header: "Date",
    align: "center"
  },
  {
    property: "percentage",
    header: "Percentage",
    align: "center",
    render: datum => (
      <Box pad={{ vertical: "xsmall" }}>
        <Meter
          values={[
            {
              value: Number(datum.percentage)
            }
          ]}
          thickness="small"
          size="small"
          round="true"
        />
      </Box>
    )
  },
  {
    property: "value",
    header: "Amount",
    render: datum => amountFormatter.format(datum.value),
    align: "end",
    aggregate: "sum",
    footer: { aggregate: true }
  }
  ,
  {
    property: "remover",
    align: "center",
    render: datum => (
      <Box pad={{ vertical: "xsmall" }} height="40px" width="40px">
        <Meter
          values={[
            {
              value: datum.remover,
              onClick: () => {
                datum.remove(datum._id, datum.record_type);
              },
              color: "light-3"
            }
          ]}
          thickness="xlarge"
          size="xsmall"
          round="true"
          type="circle"
        />
      </Box>
    )
  }
];

const ExpenseTableColumn = ({ data }) => {

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <DataTable key={data._id} columns={columns} data={data} />
      </Box>
    </Grommet>
  );
};

const IncomeTableColumn = ({ data }) => {

  console.log(data);
  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <DataTable key={data._id} columns={columns.filter((p) => (p.property !== 'percentage'))} data={data} />
      </Box>
    </Grommet>
  )

}

export { ExpenseTableColumn, IncomeTableColumn };

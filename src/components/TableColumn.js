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
    footer: "Total",
    render: datum => (
      <Box pad={{ vertical: "xsmall" }}>
        <Meter
          values={[
            {
              value: Number(datum.percentage),
              onClick: () => {
                datum.remove(datum._id);
              }
            }
          ]}
          thickness="small"
          size="small"
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
];

const TableColumn = ({ data, onDelete }) => {

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <DataTable key={data._id} columns={columns} data={data} />
      </Box>
    </Grommet>
  );
};

export default TableColumn;

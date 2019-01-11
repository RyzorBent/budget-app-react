import React, { Component } from "react";
// import { storiesOf } from "@storybook/react";

import { Grommet, Box, DataTable, Meter, Text } from "grommet";
import { grommet } from "grommet/themes";

const amountFormatter = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
  minimumFractionDigits: 2
});

const columns = [
  {
    property: "tool",
    header: <Text>Tooling</Text>,
    primary: true
    
  },
  {
    property: "documentation",
    header: "Documentation %",
    render: datum => (
      <Box pad={{ vertical: "xsmall" }}>
        <Meter
          values={[{ value: datum.documentation, color: "#0cffe6" }]}
          thickness="small"
          size="small"
          background ="#b6b7ba"
        />
      </Box>
    )
  },
  {
    property: "skills",
    header: "Available Skill Set %",
    render: datum => (
      <Box pad={{ vertical: "xsmall" }}>
        <Meter
          values={[{ value: datum.skills , color: "#0cffe6"}]}
          thickness="small"
          size="small"
          background ="#b6b7ba"
        />
      </Box>
    )
  },
  {
    property: "complexity",
    header: "Complexity %",
    render: datum => (
      <Box pad={{ vertical: "xsmall" }}>
        <Meter
          values={[{ value: datum.complexity , color: "#0cffe6" }]}
          thickness="small"
          size="small"
          background ="#b6b7ba"
        />
      </Box>
    )
  }
  ,
  {
    property: "admin",
    header: "Administration %",
    render: datum => (
      <Box pad={{ vertical: "xsmall" }}>
        <Meter
          values={[{ value: datum.admin, color: "#0cffe6" }]}
          thickness="small"
          size="small"
          background ="#b6b7ba"
        />
      </Box>
    )
  }
];

// const locations = [
//   "Boise",
//   "Fort Collins",
//   "Los Gatos",
//   "Palo Alto",
//   "San Francisco"
// ];
// const data = [];
// for (let i = 0; i < 40; i += 1) {
//   data.push({
//     name: `Name ${i + 1}`,
//     location: locations[i % locations.length],
//     date: `2018-07-${(i % 30) + 1}`,
//     percent: (i % 9) * 10,
//     paid: ((i + 1) * 22) % 1000
//   });
// }
const DATA = [
  {
    tool: "Integration Bus",
    documentation: 58,
    skills: 96,
    complexity: 70,
    admin: 60 
  },
  {
    tool: "WebSphere MQ",
    documentation: 56,
    skills: 98,
    complexity: 40,
    admin: 90
  },
  {
    tool: "MDB Development",
    documentation: 60,
    skills: 96,
    complexity: 70,
    admin: 90
  },
  {
    tool: "CICS Bridge",
    documentation: 10,
    skills: 0,
    complexity: 80,
    admin: 40
  }
];

const SimpleDataTable = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <DataTable columns={columns} data={DATA} />
    </Box>
  </Grommet>
);

// const SizedDataTable = () => (
//   <Grommet theme={grommet}>
//     <Box align="center" pad="large">
//       <DataTable columns={columns} data={data} size="medium" />
//     </Box>
//   </Grommet>
// );

// const TunableDataTable = () => (
//   <Grommet theme={grommet}>
//     <Box align="center" pad="large">
//       <DataTable
//         columns={columns.map(c => ({
//           ...c,
//           search: c.property === "name" || c.property === "location"
//         }))}
//         data={DATA}
//         sortable
//         resizeable
//       />
//     </Box>
//   </Grommet>
// );

// const groupColumns = [...columns];
// const first = groupColumns[0];
// groupColumns[0] = { ...groupColumns[1] };
// groupColumns[1] = { ...first };
// groupColumns[0].footer = groupColumns[1].footer;
// delete groupColumns[1].footer;

// const GroupedDataTable = () => (
//   <Grommet theme={grommet}>
//     <DataTable columns={groupColumns} data={DATA} groupBy="location" sortable />
//   </Grommet>
// );

class ServedDataTable extends Component {
  state = { data: DATA };

  // onSearch = search => {
  //   let nextData;
  //   if (search) {
  //     const expressions = Object.keys(search).map(property => ({
  //       property,
  //       exp: new RegExp(search[property], "i")
  //     }));
  //     nextData = DATA.filter(
  //       d => !expressions.some(e => !e.exp.test(d[e.property]))
  //     );
  //   } else {
  //     nextData = DATA;
  //   }
  //   this.setState({ data: nextData });
  // };

  render() {
    const { data: servedData } = this.state;
    return (
      <Grommet theme={grommet}>
        <Box align="center" pad="large">
          <SimpleDataTable
            columns={columns.map(column => ({
              ...column,
              search:
                column.property === "name" || column.property === "location"
            }))}
            data={servedData}
            onSearch={this.onSearch}
          />
        </Box>
      </Grommet>
    );
  }
}

// storiesOf("DataTable", module)
//   .add("Simple DataTable", () => <SimpleDataTable />)
//   .add("Sized DataTable", () => <SizedDataTable />)
//   .add("Tunable DataTable", () => <TunableDataTable />)
//   .add("Grouped DataTable", () => <GroupedDataTable />)
//   .add("Served DataTable", () => <ServedDataTable />);

  export default ServedDataTable
import React from 'react';
import { Box} from "grommet";


const NavBar = props => (
  <Box
    tag="header"
    direction="row"
    round={{"size": "xsmall", "corner": "bottom"}}
    align="center"
    justify="between"
    background="brand"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    elevation="medium"
    style={{ zIndex: "1" }}
    {...props}
  />
);

export default NavBar;

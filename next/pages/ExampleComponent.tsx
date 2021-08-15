/* eslint-disable */
import React from "react"; // Hey this uses react
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import PropsExample from "components/PropsExample";

// Every react component takes something called 'props'
function ExampleComponent(props) {
  const [clicked, setClicked] = React.useState(false);

  function buttonPush() {
    setClicked(true);
  }

  return (
    <>
      <Typography variant="h1" gutterBottom>
        Hello
      </Typography>
      <Typography variant="body1" gutterBottom>
        My name is sam
      </Typography>
      <Button color="primary" onClick={buttonPush}>
        Click me
      </Button>
      {clicked && <Typography variant="h4"> I've been clicked</Typography>}

      <PropsExample isParentClicked={clicked} isBlurred={clicked} />
    </>
  );
}

export default ExampleComponent;

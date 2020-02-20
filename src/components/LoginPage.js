import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactCodeInput from 'react-verification-code-input';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import People from "@material-ui/icons/People";
// core components
import Header from "./Header/Header.js";
import GridContainer from "./Grid/GridContainer.js";
import GridItem from "./Grid/GridItem.js";
import Button from "./CustomButtons/Button.js";
import Card from "./Card/Card.js";
import CardBody from "./Card/CardBody.js";
import CardHeader from "./Card/CardHeader.js";
import CardFooter from "./Card/CardFooter.js";
import CustomInput from "./CustomInput/CustomInput.js";
import styles from "../assets/jss/material-kit-react/views/loginPage.js";
import image from "./pictures/bg7.jpg";


const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  function handleClick(e, field) {
    if (name === "") {
      setBlank(true);
    } else {
      setBlank(false);
      switch(field) {
        case 'create':
          setButtonStatus(1);
          setRoom(['1', '2', '3', '4', '5']);
          break;
        case 'join':
          setButtonStatus(2);
          break;
      }
    }
  }

  function handleChange(e, field) {
    switch(field) {
      case 'name':
        setBlank(e.target.value === "");
        setName(e.target.value);
        break;
      case 'room':
        setRoom(e.split("")); // room has type List, e is String
        break;
    }
  }

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const [name, setName] = React.useState("");
  const [room, setRoom] = React.useState([]);
  const [blank, setBlank] = React.useState(false);
  const [buttonStatus, setButtonStatus] = React.useState(0); // 0: unlick, 1: createRoom, 2: joinRoom
  const { ...rest } = props;

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="CS130"
        // rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h1>XBoard</h1>
                  </CardHeader>
                  <CardBody>
                    {buttonStatus == 0 ? 
                      <CustomInput
                        labelText="Name..."
                        id="name"
                        formControlProps={{
                          fullWidth: true
                        }}
                        errorMessage={blank ? "Please enter your name" : undefined}
                        inputProps={{
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                          onChange: (e) => handleChange(e, "name"),
                          error: blank,
                        }}
                      />
                    :
                      <ReactCodeInput
                        fields={5}
                        type='number'
                        values={room}
                        onChange={(e) => handleChange(e, "room")}
                      />
                    }
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    {/* Only show Create Room button when no button clicked */}
                    {buttonStatus == 0 ?
                        [<Button
                          onClick={e => handleClick(e, "create")}
                          simple
                          color="primary"
                          size="lg"
                          key="create">
                          Create Room
                        </Button>,
                        <Button
                          onClick={e => handleClick(e, "join")}
                          // component={Link}
                          // to={`/createRoom/name=${name}&room=${room}`}
                          simple
                          color="primary"
                          size="lg"
                          key="join">
                          Join Room
                        </Button>]
                      :
                      <Button
                        onClick={e => console.log("START!!!")}
                        component={Link}
                        to={`/createRoom/name=${name}&room=${room}`}
                        simple
                        color="primary"
                        size="lg">
                        Start
                      </Button>
                    }
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}

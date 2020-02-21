import React, { Component } from 'react'
import { Rnd } from "react-rnd";
import style from "../assets/jss/draggableStyle";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Icon } from '@material-ui/core';

export default function DraggableText() {
  const handleChange = event => {
    setValue(event.target.value);
  };

  const [value, setValue] = React.useState("");
  
  return (
    <Rnd
      style={style}
      default={{
        x: 0,
        y: 0,
        width: 320,
        height: 250,
      }}
      enableUserSelectHack={false}
    >
      <Card style={{ width: '100%', height: '100%' }} >
        <CardHeader
          action={
            <IconButton aria-label="delete">
              <DeleteIcon fontSize="small" />
            </IconButton>
          }
        />
        <CardContent>
          <TextField
            value={value}
            // label="Multiline"
            multiline
            rows="4"
            rowsMax="10"
            variant="outlined"
            onChange={handleChange}
            style={{ width: '100%', height: '100%' }}
          />
        </CardContent>
      </Card>
    </Rnd>
  );
}

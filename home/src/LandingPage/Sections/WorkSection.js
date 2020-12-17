import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/workStyle.js";
import axios from 'axios'

const useStyles = makeStyles(styles);

export default function WorkSection() {
  const classes = useStyles();

  const [state, setState] = useState({
    name: "",
    from_email: "",
    message: ""
  })

  const submitForm = (e) => {
    e.preventDefault()
    console.log('Just finished submitting the form');
    axios.defaults.headers = {
      "Content-Type": "application/json",
    };
    const { name, from_email, message } = state
    axios.post('http://127.0.0.1:8000/users/contactadmin/', {
      name, from_email, message
    })
      .then(res => {
        console.log('Data submitted ', res.data)
        console.log(res.data)
      })
      .catch(err => {
        console.error(err)
        console.log(err)
      })
  }



  const onchange = (e) => {
    const value = e.target.value
    setState({
      ...state,
      [e.target.name]: value
    })
  }



  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}>Work with us</h2>
          <h4 className={classes.description}>
            Divide details about your product or agency work into parts. Write a
            few lines about each one and contact us about any further
            collaboration. We will responde get back to you in a couple of
            hours.
          </h4>
          <form onSubmit={submitForm} method='Post'>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Your Name"
                  id="name"
                  onChange={onchange}
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Your Email"
                  id="email"
                  onChange={onchange}
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <CustomInput
                labelText="Your Message"
                id="message"
                onChange={onchange}
                formControlProps={{
                  fullWidth: true,
                  className: classes.textArea
                }}
                inputProps={{
                  multiline: true,
                  rows: 5
                }}
              />
              <GridItem xs={12} sm={12} md={4}>
                <Button color="primary">Send Message</Button>
              </GridItem>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}

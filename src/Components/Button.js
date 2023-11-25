import React from "react";
import { Button } from "react-bootstrap";

const CustomButton = (props) => {
  return (
    <Button
      disabled={props.disabledButton}
      type={props.btnType}
      className={props.BtnClassName}
      onClick={props.ClickEvent}
    >
      {props.BtnTxt}
    </Button>
  );
};

export default CustomButton;

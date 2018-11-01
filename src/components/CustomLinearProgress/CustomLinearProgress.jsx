import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import LinearProgress from "@material-ui/core/LinearProgress";
import {
    dangerColor,
    grayColor,
    infoColor,
    primaryColor,
    roseColor,
    successColor,
    warningColor
} from "../../assets/Colors";
// core components

const customLinearProgressStyle = {
    root: {
        height: "40px",
        marginBottom: "20px",
        overflow: "hidden"
    },
    bar: {
        height: "40px"
    },
    primary: {
        backgroundColor: primaryColor
    },
    warning: {
        backgroundColor: warningColor
    },
    danger: {
        backgroundColor: dangerColor
    },
    success: {
        backgroundColor: successColor
    },
    info: {
        backgroundColor: infoColor
    },
    rose: {
        backgroundColor: roseColor
    },
    gray: {
        backgroundColor: grayColor
    },
    primaryBackground: {
        background: "rgba(156, 39, 176, 0.2)"
    },
    warningBackground: {
        background: "rgba(255, 152, 0, 0.2)"
    },
    dangerBackground: {
        background: "rgba(244, 67, 54, 0.2)"
    },
    successBackground: {
        background: "rgba(76, 175, 80, 0.2)"
    },
    infoBackground: {
        background: "rgba(0, 188, 212, 0.2)"
    },
    roseBackground: {
        background: "rgba(233, 30, 99, 0.2)"
    },
    grayBackground: {
        background: "rgba(221, 221, 221, 0.2)"
    }
};

function CustomLinearProgress({...props}) {
    const {classes, color, ...rest} = props;
    return (
        <LinearProgress
            {...rest}
            classes={{
                root: classes.root + " " + classes[color + "Background"],
                bar: classes.bar + " " + classes[color]
            }}

        />
    );
}

CustomLinearProgress.defaultProps = {
    color: "gray"
};

CustomLinearProgress.propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.oneOf([
        "primary",
        "warning",
        "danger",
        "success",
        "info",
        "rose",
        "gray"
    ])
};

export default withStyles(customLinearProgressStyle)(CustomLinearProgress);

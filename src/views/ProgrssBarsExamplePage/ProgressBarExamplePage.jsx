import React from "react";
import CustomLinearProgress from "../../components/CustomLinearProgress/CustomLinearProgress";
import Button from "../../components/CustomButtons/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import {infoColor} from "../../assets/Colors";
import * as axios from "axios";
import {generateId} from "../../helpers/helpers";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown";

const styles = {
    container: {
        width: "50%",
        minWidth: "500px",
        margin: "2%",
        padding: "2%",
        border: "1px solid " + infoColor,
        float: 'left'
    },
    heading: {
        margin: "2%",
        width: "96%",
        fontWeight: '700',
        fontSize: '2.35em',
        textAlign: 'left',
        fontFamily: 'Verdana, Geneva, sans-serif',
        float: 'left'
    },
    progressBar: {
        width: "98%"
    },
    operationsContainer: {
        float: 'left',
        width: '100%',
    },

    dropdown: {
        width: '16%',
        float: 'left',
        marginRight: '4%',

    },
    operations: {
        width: '80%',
        float: 'right',
    },
    operationButton: {
        width: '20%',
        float: 'right',
    }
};

class ProgressBarExamplePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            progressBars: [],
            buttons: [],
            names: [],
            limit: 0
        };
    }

    handleOperations(value) {
        console.log('handleOperations', value)
    }

    fetchData() {
        axios.get('https://pb-api.herokuapp.com/bars')
            .then((response) => {
                console.log('response', response);
                if (response.data.bars) {

                    let progressBars = [];
                    let names = [];

                    response.data.bars.map((value, key) => {
                        let barData = {};
                        barData.name = generateId();
                        barData.value = value;
                        barData.color = key % 2 === 0 ? 'rose' : 'info';
                        progressBars.push(barData);
                        names.push(barData.name);
                    });

                    this.setState({
                        progressBars,
                        buttons: response.data.buttons,
                        limit: response.data.limit,
                        names
                    });

                    console.log('progressBars', progressBars)
                }
            })
            .catch((error) => {
                console.log('error', error)
            });
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        const {classes, ...rest} = this.props;
        const {buttons, progressBars, limit, names} = this.state;
        console.log('state', this.state);
        return (
            <div>
                <div className={classes.heading}>
                    {"Progress Bars"}
                </div>
                <div className={classes.container}>

                    {progressBars && progressBars.map((data, key) => {
                        return (
                            <div className={classes.progressBar} key={key}>
                                {data.value + "%"}
                                <CustomLinearProgress
                                    variant="determinate"
                                    color={data.color}
                                    value={data.value}
                                />
                            </div>
                        )
                    })}

                    <div className={classes.operationsContainer}>
                        <div className={classes.dropdown}>
                            <CustomDropdown
                                buttonText="Select Bar"
                                // dropdownHeader="Dropdown Header"
                                buttonProps={{
                                    color: "warning"
                                }}
                                dropdownList={names}
                                hoverColor={"warning"}
                            />
                        </div>

                        <div className={classes.operations}>
                            {
                                buttons && buttons.map((value, key) => {
                                    return (
                                        <div className={classes.operationButton}>
                                            <Button color="primary" key={key} onClick={() => {
                                                this.handleOperations(value)
                                            }}>
                                                {value}
                                            </Button>
                                        </div>

                                    )
                                })
                            }
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default withStyles(styles)(ProgressBarExamplePage);

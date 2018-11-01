import React from "react";
import CustomLinearProgress from "../../components/CustomLinearProgress/CustomLinearProgress";
import Button from "../../components/CustomButtons/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import {infoColor} from "../../assets/Colors";
import * as axios from "axios";
import {generateId} from "../../helpers/helpers";

const styles = {
    container: {
        width: "50%",
        minWidth: "500px",
        margin: "2%",
        padding: "2%",
        border: "1px solid " + infoColor
    },
    heading: {
        margin: "2%",
        fontWeight: '700',
        fontSize: '2.35em',
        textAlign: 'left',
        fontFamily: 'Verdana, Geneva, sans-serif'
    },
    progressBar: {
        width: "96%"
    }
};

class ProgressBarExamplePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            progressBars: [],
            buttons: [],
            limit: 0
        };
    }


    fetchData() {
        axios.get('http://pb-api.herokuapp.com/bars')
            .then((response) => {
                console.log('response', response);
                if (response.data.bars) {

                    let progressBars = [];

                    response.data.bars.map((value, key) => {
                        let barData = {};
                        barData.name = generateId();
                        barData.value = value;
                        barData.color = key % 2 === 0 ? 'primary' : 'info';
                        progressBars.push(barData);
                    });

                    this.setState({
                        progressBars,
                        buttons: response.data.buttons,
                        limit: response.data.limit
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
        const {buttons, progressBars, limit} = this.state;
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

                    {
                        buttons && buttons.map((value, key) => {
                            return (
                                <Button color="primary" size="sm" key={key}>
                                    {value}
                                </Button>
                            )
                        })
                    }

                </div>
            </div>
        );
    }
}

export default withStyles(styles)(ProgressBarExamplePage);

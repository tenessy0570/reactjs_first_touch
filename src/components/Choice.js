import {Component} from "react";
import PropTypes from "prop-types";

class Choice extends Component {
    constructor(props) {
        super(props);
        this.state = { choice: props.choice };

        this.handleChoiceChange = this.handleChoiceChange.bind(this);
    }
    handleChoiceChange(event) {
        if (event.target.classList.contains("direction_variant")) {
            this.setState({choice: "class"});
        }
    }
    renderDirectionChoice() {
        let availableDirections = ["PVE", "PVP"];
        return (
            <div>
                <p className="text-dark text-center fs-2">Choose a direction.</p>
                <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="btn-group-vertical text-center col-sm-6">
                        {
                            availableDirections.map(
                                (direction, index) => (
                                    <button onClick={this.handleChoiceChange} key={index} className="direction_variant btn btn-outline-primary">{direction}</button>
                                )
                            )
                        }
                    </div>
                    <div className="col-sm-3"></div>
                </div>
            </div>

        )
    }
    renderClassChoice() {
        let availableGameClasses = ["Warrior", "Druid"];
        return (
            <div>
                <p className="text-dark text-center fs-2">Choose a direction.</p>
                <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="btn-group-vertical text-center col-sm-6">
                        {
                            availableGameClasses.map(
                                (gameClass, index) => (
                                    <button key={index} className="class_variant btn btn-outline-primary">{gameClass}</button>
                                )
                            )
                        }
                    </div>
                    <div className="col-sm-3"></div>
                </div>
            </div>

        )
    }
    render() {
        switch (this.state.choice) {
            case "direction":
                return this.renderDirectionChoice();
            case "class":
                return this.renderClassChoice();
            default:
                return (
                    <div>
                        <p>No choice selected.</p>
                    </div>
                );
        }
    }
}

Choice.defaultProps = { choice: "direction" };
Choice.propTypes = { choice: PropTypes.string };
export default Choice;
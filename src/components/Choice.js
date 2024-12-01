import {Component} from "react";
import PropTypes from "prop-types";

class Choice extends Component {
    constructor(props) {
        super(props);

        let nextChoiceByCurrent = {
            "direction": "class",
            "class": "spec",
            "spec": null
        };

        this.state = {
            choice: props.choice,
            nextChoiceByCurrent: nextChoiceByCurrent
        };

        this.handleChoiceChange = this.handleChoiceChange.bind(this);
    }

    handleChoiceChange(event) {
        let state = this.state;
        let choice = state.choice;
        let nextChoice = state.nextChoiceByCurrent[choice];

        switch (choice) {
            case "direction":
                fetch("https://reqres.in/api/users")
                    .then(res => res.json())
                    .then(data => {
                        // IMITATE API CALL
                        let availableClasses = ["Druid", "Warrior"];
                        this.setState({
                            availableClasses: availableClasses,
                            choice: nextChoice,
                            chosenDirection: event.target.textContent
                        });
                    });
                break;
            case "class":
                this.setState(
                    {
                        choice: nextChoice,
                        chosenDirection: state.chosenDirection,
                        chosenClass: event.target.textContent
                    }
                );
                break;
            case "spec":
                this.setState(
                    {
                        choice: nextChoice,
                        chosenDirection: state.chosenDirection,
                        chosenClass: state.chosenClass,
                        chosenSpec: event.target.textContent
                    }
                );
                break;
            default:
                return null;
        }
    }

    renderDirectionChoice() {
        let availableDirections = ["PVE", "PVP"];


        return this.renderAbstractChoice(availableDirections, this.handleChoiceChange);

    }

    renderClassChoice() {
        // let availableGameClasses = ["Warrior", "Druid"];
        return this.renderAbstractChoice(this.state.availableClasses, this.handleChoiceChange);

    }

    renderSpecChoice() {
        let availableClassSpecs = ["Frost", "Fire", "Arcane"];
        return this.renderAbstractChoice(availableClassSpecs, this.handleChoiceChange);
    }

    renderAbstractChoice(
        elementsList = ["1", "2", "3", "4", "5", "6"],
        clickHandler = () => {
        }
    ) {
        return (
            <div>
                <p className="text-dark text-center fs-2">Choose a direction.</p>
                <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="btn-group-vertical text-center col-sm-6">
                        {
                            elementsList.map(
                                (item, index) => (
                                    <button onClick={clickHandler} key={index}
                                            className="btn btn-outline-primary">{item}</button>
                                )
                            )
                        }
                    </div>
                    <div className="col-sm-3"></div>
                </div>
            </div>

        );
    }

    render() {
        switch (this.state.choice) {
            case "direction":
                return this.renderDirectionChoice();
            case "class":
                return this.renderClassChoice();
            case "spec":
                return this.renderSpecChoice();
            default:
                return (
                    <div>
                        <p className="text-dark">
                            Chosen guides
                            filter: {this.state.chosenSpec} {this.state.chosenClass} {this.state.chosenDirection}.
                        </p>
                    </div>
                );
        }
    }
}

Choice.defaultProps = {choice: "direction"};
Choice.propTypes = {choice: PropTypes.string};
export default Choice;
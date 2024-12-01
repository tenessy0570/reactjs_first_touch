import {Component} from "react";
import PropTypes from "prop-types";

class Choice extends Component {
    constructor(props) {
        super(props);
        this.state = {choice: props.choice};

        this.handleChoiceChange = this.handleChoiceChange.bind(this);
    }

    handleChoiceChange(event) {
        if (event.target.classList.contains("direction_variant")) {
            this.setState(
                {
                    choice: "class",
                    chosenDirection: event.target.textContent
                }
            );
            return null;
        }
        if (event.target.classList.contains("class_variant")) {
            this.setState(
                {
                    choice: "spec",
                    chosenDirection: this.state.chosenDirection,
                    chosenClass: event.target.textContent
                }
            )
            return null;
        }
        if (event.target.classList.contains("spec_variant")) {
            this.setState(
                {
                    choice: null,
                    chosenDirection: this.state.chosenDirection,
                    chosenClass: this.state.chosenClass,
                    chosenSpec: event.target.textContent
                }
            );
            return null;
        }
    }

    renderDirectionChoice() {
        //let availableDirections = ...RETRIEVE FROM API;
        let availableDirections = ["PVE", "PVP"];
        return this.renderAbstractChoice("direction_variant", availableDirections, this.handleChoiceChange);

    }

    renderClassChoice() {
        // let availableGameClasses = ...RETRIEVE FROM API;
        let availableGameClasses = ["Warrior", "Druid"];
        return this.renderAbstractChoice("class_variant", availableGameClasses, this.handleChoiceChange);

    }

    renderSpecChoice() {
        // let availableClassSpecs = ...RETRIEVE FROM API;
        let availableClassSpecs = ["Frost", "Fire", "Arcane"];
        return this.renderAbstractChoice("spec_variant", availableClassSpecs, this.handleChoiceChange);
    }

    renderAbstractChoice(
        additionalButtonClass = "abstract_variant",
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
                                            className={`${additionalButtonClass} btn btn-outline-primary`}>{item}</button>
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
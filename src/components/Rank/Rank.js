import React from "react";

// Rank component -- displays name and current entry count
class Rank extends React.Component {
    constructor() {
        super();
        this.state = {
            emoji: ''
        }
    }

    componentDidMount() {
        this.generateEmoji(this.props.entries)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.entries === this.props.entries && prevProps.name === this.props.name) {
            return null
        }
        this.generateEmoji(this.props.entries);
    }

    generateEmoji = (entries) => {
        fetch(`https://993qcnoom6.execute-api.us-east-1.amazonaws.com/prod/rank?rank=${entries}`)
            .then(response => response.json())
            .then(data => this.setState({ emoji: data.input }))
            .catch(console.log('errors'))
    }
    render() {
    return (
        <div>
            <div className="white f3">
            {`${this.props.name}, your current entry count is... `}
            </div>
            <div className="white f1">
              {this.props.entries}
            </div>
            <div className="white f3">
              {`Rank Emoji: ${this.state.emoji}`}
            </div>
        </div>
    );
  }
}

export default Rank;
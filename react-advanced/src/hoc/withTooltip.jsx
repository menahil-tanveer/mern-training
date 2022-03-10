import React from "react";
function withTooltip(Component) {
  return class WithTooltip extends React.Component {
    state = {
      showTooltip: false,
    };
    mouseOver = () => {
      this.setState({ showTooltip: true });
    };
    mouseOut = () => {
      this.setState({ showTooltip: false });
    };
    render() {
      return (
        <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
          <Component {...this.props} showTooltip={this.state.showTooltip} />
        </div>
      );
    }
  };
}
export default withTooltip;
// NOTE: To be able to use 'Component' here, first letter of component must be
// capital

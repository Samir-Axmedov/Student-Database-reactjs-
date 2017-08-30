import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap';

const divPadding = {
  paddingLeft: '0px',
  paddingRight: '0px'
};
/** The app entry point */
class ReactWebApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
      return (
        <Grid className="react-web" style={divPadding}>
          {this.props.children}
        </Grid>
      );
  }
}

ReactWebApp.propTypes = {
  children: PropTypes.object,
};
const mapStateToProps = (state) => {
  return {
  };
};
// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(ReactWebApp);

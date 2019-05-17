import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map as ImmutableMap } from 'immutable';
// eslint-disable-next-line import/no-unresolved
import entitySample from 'state/entity-sample';

const {
  actions: {
    handleEntitySampleActionCreator,
  },
  selectors: {
    getEntitySampleFetching,
    getEntitySampleData,
  },
} = entitySample;

function withEntitySample(InnerComponent) {
  class EntitySampleWrapper extends Component {
    static propTypes = {
      /*
        Flag to check if is fetching
      */
      isFetchingEntitySample: PropTypes.bool.isRequired,
      /*
        Action creator
      */
      handleEntitySampleActionCreator: PropTypes.func.isRequired,
      /*
       Entity sample data
       */
      data: PropTypes.instanceOf(ImmutableMap).isRequired,
    };

    render() {
      return (
        <InnerComponent {...this.props} />
      );
    }
  }

  function mapStateToProps(state) {
    return {
      isFetchingAuthorization: getEntitySampleFetching(state),
      data: getEntitySampleData(state),
    };
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      handleEntitySampleActionCreator,
    }, dispatch);
  }

  return connect(mapStateToProps, mapDispatchToProps)(EntitySampleWrapper);
}

export default withEntitySample;

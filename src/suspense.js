import React from 'react';
import {loaderContext} from './context';

export default class Suspense extends React.PureComponent {
  constructor(props) {
    super(props);
    this.promise = null;
    this.fetchData = (func) => {
        func()
        .then(() => this.setState({
                isLoading: true
        }))
        .finally(() => this.setState({
            isLoading: false
        }));
    };

    this.state = {
      isLoading: false,
      fetchData: this.fetchData,
    };
  }

  render() {
    // The entire state is passed to the provider
    return (
      <loaderContext.Provider value={this.state}>
        {this.props.children}
      </loaderContext.Provider>
    );
  }
}
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
    const defaultStyles = {
        position: 'fixed',
        height: '100%',
        width: '100%',
        backgroundColor: 'grey',
    };
    // The entire state is passed to the provider
    return (
      <loaderContext.Provider value={this.state}>
        <div styles={{ ...defaultStyles }}>
            {this.props.fallback}
        </div>
        {this.props.children}
      </loaderContext.Provider>
    );
  }
}

export const Lazy = (Element) => {
  // It should have a single children
  // incase you have multiple then wrap it in React.Fragment
    return function(props){
      return(
        <loaderContext.Consumer>
          {({isLoading, fetchData}) => {
            return <Element {...props} fetchData={fetchData} isLoading={isLoading}/>
          }}
        </loaderContext.Consumer>
      )};
};
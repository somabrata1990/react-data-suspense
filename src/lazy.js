import {loaderContext} from './context';

function Lazy(props) {
  // It should have a single children
  // incase you have multiple then wrap it in React.Fragment
    return (
        <loaderContext.Consumer>
          {({isLoading, fetchData}) => {
              const defaultStyles = {
                  position: 'fixed',
                  height: '100%',
                  width: '100%',
                  backgroundColor: 'grey',
              };
              const children = React.Children.map(this.props.children, child => {
                return React.cloneElement(child, {
                  fetchData
                });
              });
            return <div
              style={{ ...defaultStyles, display: isLoading ? 'block' : 'none' }}>
              {children}
            </div>
          }}
        </loaderContext.Consumer>
      );
}

export default Lazy;
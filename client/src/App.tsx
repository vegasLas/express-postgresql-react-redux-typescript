import React from 'react';
import { Provider } from 'react-redux';
import './App.scss';
import TableContainer from './components/Table/TableContainer';
import store from './redux/redux-store';

const App = () => {
  return <React.StrictMode>
    <Provider store={store}>
      <TableContainer />
    </Provider>
  </React.StrictMode>
}
export default App;



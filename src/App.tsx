import React from 'react';
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';
import { Provider, useDispatch, useSelector } from 'react-redux';
import i18n from './i18n';

import logo from './logo.svg';
import './App.css';

interface MyState {
  value: number;
}

const initialState: MyState = {
  value: 0
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    inc: s => {
      s.value += 1;
    },
    dec: s => {
      s.value -= 1;
    }
  }
});

const { inc, dec } = counterSlice.actions;

const store = configureStore({
  reducer: counterSlice.reducer,
});

function _App() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const count = useSelector<MyState>(s => s.value);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Count: {count}
        </p>
        <button style={{fontSize: '32px'}} onClick={() => {
          i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en');
          dispatch(inc());
        }}>{t('Click')}</button>
      </header>
    </div>
  );
}

function App() {
  return <Provider store={store}>
    <_App />
  </Provider>;
}

export default App;

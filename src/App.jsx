import { Header } from 'components';
import Home from 'pages/Home';
import Rates from 'pages/Rates';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getBaseCurrency } from 'reduxState/operations';
import { setDefaultCurrency } from 'reduxState/CurrencySlice';

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function success(pos) {
      const crd = pos.coords;
      dispatch(getBaseCurrency(crd));
    }

    function error() {
      dispatch(setDefaultCurrency('USD'));
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [dispatch]);

  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rates" element={<Rates />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

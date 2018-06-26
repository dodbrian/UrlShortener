import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import UrlShortener from './components/UrlShortener/UrlShortener';
import Counter from './components/Counter';
import FetchData from './components/FetchData';

export default () => (
  <Layout>
    <Route exact path="/" component={UrlShortener} />
    <Route path="/counter" component={Counter} />
    <Route path="/fetchdata/:startDateIndex?" component={FetchData} />
  </Layout>
);

import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import UrlShortener from './components/UrlShortener/UrlShortener';
import AliasRedirector from './components/AliasRedirector/AliasRedirector';

export default () => (
  <Layout>
    <Route exact path="/" component={UrlShortener} />
    <Route path="/:alias" component={AliasRedirector} />
  </Layout>
);

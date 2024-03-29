import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
	Dashboard as DashboardView,
	ProductList as ProductListView,
	UserList as UserListView,
	Settings as SettingsView,
	SignUp as SignUpView,
	SignIn as SignInView,
	NotFound as NotFoundView,
	Upload as UploadView,
	Product as ProductView
} from './views';

const Routes = () => {
	return (
		<Switch>
			<RouteWithLayout component={ProductListView} exact layout={MainLayout} path="/" />
			<RouteWithLayout component={ProductView} exact layout={MainLayout} path="/product/:id" />
			<RouteWithLayout component={DashboardView} exact layout={MainLayout} path="/dashboard" />
			<RouteWithLayout component={UserListView} exact layout={MainLayout} path="/users" />
			{/* 
      TO BE ADDED IN FUTURE VERSIONS

      <RouteWithLayout
        component={UploadView}
        exact
        layout={MainLayout}
        path="/upload"
      /> */}
			<RouteWithLayout component={SettingsView} exact layout={MainLayout} path="/settings" />
			<RouteWithLayout component={SignUpView} exact layout={MinimalLayout} path="/sign-up" />
			<RouteWithLayout component={SignInView} exact layout={MinimalLayout} path="/sign-in" />
			<RouteWithLayout component={NotFoundView} exact layout={MinimalLayout} path="/not-found" />
			<Redirect to="/not-found" />
		</Switch>
	);
};

export default Routes;

import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
	// Redirect Empty Path To '/dashboards'
	{ path: '', pathMatch: 'full', redirectTo: 'dashboards' },

	// Redirect Signed In User To The '/dashboards'
	//
	// After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect' path.
	// Below is another redirection for that path to redirect the user to the desired location.
	// This is a small convenience to keep all main routes together here on this file.
	{ path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboards' },

	// Auth Routes For Guests
	{
		path: '',
		canActivate: [NoAuthGuard],
		canActivateChild: [NoAuthGuard],
		component: LayoutComponent,
		data: {
			layout: 'empty',
		},
		children: [
			{
				path: 'confirmation-required',
				loadChildren: () =>
					import(
						'app/modules/auth/confirmation-required/confirmation-required.module'
					).then(m => m.AuthConfirmationRequiredModule),
			},
			{
				path: 'forgot-password',
				loadChildren: () =>
					import(
						'app/modules/auth/forgot-password/forgot-password.module'
					).then(m => m.AuthForgotPasswordModule),
			},
			{
				path: 'reset-password',
				loadChildren: () =>
					import(
						'app/modules/auth/reset-password/reset-password.module'
					).then(m => m.AuthResetPasswordModule),
			},
			{
				path: 'sign-in',
				loadChildren: () =>
					import('app/modules/auth/sign-in/sign-in.module').then(
						m => m.AuthSignInModule
					),
			},
			{
				path: 'sign-up',
				loadChildren: () =>
					import('app/modules/auth/sign-up/sign-up.module').then(
						m => m.AuthSignUpModule
					),
			},
		],
	},

	// Auth Routes For Authenticated Users
	{
		path: '',
		canActivate: [AuthGuard],
		canActivateChild: [AuthGuard],
		component: LayoutComponent,
		data: {
			layout: 'empty',
		},
		children: [
			{
				path: 'sign-out',
				loadChildren: () =>
					import('app/modules/auth/sign-out/sign-out.module').then(
						m => m.AuthSignOutModule
					),
			},
			{
				path: 'unlock-session',
				loadChildren: () =>
					import(
						'app/modules/auth/unlock-session/unlock-session.module'
					).then(m => m.AuthUnlockSessionModule),
			},
		],
	},

	// Landing Routes
	{
		path: '',
		component: LayoutComponent,
		data: {
			layout: 'empty',
		},
		children: [
			{
				path: 'home',
				loadChildren: () =>
					import('app/modules/landing/home/home.module').then(
						m => m.LandingHomeModule
					),
			},
		],
	},

	// Admin Routes
	{
		path: '',
		canActivate: [AuthGuard],
		canActivateChild: [AuthGuard],
		component: LayoutComponent,
		resolve: {
			initialData: InitialDataResolver,
		},
		children: [
			{
				path: 'example',
				loadChildren: () =>
					import('app/modules/admin/example/example.module').then(
						m => m.ExampleModule
					),
			},

			// Dashboards
			{
				path: 'dashboards',
				loadChildren: () =>
					import('./modules/dashboard/dashboard.module').then(
						m => m.DashboardModule
					),
			},
		],
	},

	// Error Routes
	{
		path: '404-not-found',
		pathMatch: 'full',
		loadChildren: () =>
			import('./modules/error/error.module').then(m => m.ErrorModule),
	},
	{ path: '**', redirectTo: '404-not-found' },
];

import { lazy } from 'solid-js';
import type { RouteDefinition } from '@solidjs/router';

import Home from './pages/home';
import PageWrapper from './pages/pageWrapper';
import About from './pages/about';
import Contacts from './pages/contacts';
import ContactDetails from './pages/contactDetails';
import Login from './pages/login';


export const routes: RouteDefinition[] = [
    {
        path: '/',
        component: PageWrapper,
        children: [
            {
                path: '/',
                component: Home,
            }
        ]
    },
    {
        path: '/contacts',
        component: PageWrapper,
        children: [
            {
                path: '/',
                component: Contacts,
            }
        ]
    },
    {
        path: '/contacts/:id',
        component: PageWrapper,
        children: [
            {
                path: '/',
                component: ContactDetails,
            }
        ]
    },
    {
        path: '/login',
        component: PageWrapper,
        children: [
            {
                path: '/',
                component: Login,
            }
        ]
    },
    {
        path: '/about',
        component: PageWrapper,
        children: [
            {
                path: '/',
                component: About,
            }
        ]
    },
    {
        path: '**',
        component: PageWrapper,
        children: [
            {
                path: '**',
                component: lazy(() => import('./errors/404')),
            }
        ]

    }
];

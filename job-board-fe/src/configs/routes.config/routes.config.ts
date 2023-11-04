import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'
import { ADMIN, USER } from '@/constants/roles.constant'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'jobs',
        path: '/jobs',
        component: lazy(() => import('@/views/job/JobList/JobList')),
        authority: [ADMIN, USER],
    },
    {
        path: '/jobs/new',
        component: lazy(() => import('@/views/job/JobNew')),
        authority: [ADMIN],
    },
    {
        path: '/jobs/edit/:productId',
        component: lazy(() => import('@/views/job/JobEdit')),
        authority: [ADMIN],
    },
    {
        path: '/jobs/detail/:productId',
        component: lazy(() => import('@/views/job/JobDetail')),
        authority: [ADMIN, USER],
    },
    {
        key: 'jobs-history',
        path: '/jobs-history',
        component: lazy(() => import('@/views/job/JobList/JobListHistory')),
        authority: [ADMIN],
    },
    {
        key: 'jobs-applied',
        path: '/jobs-applied',
        component: lazy(() => import('@/views/job/JobList/JobApplied')),
        authority: [USER],
    },
]

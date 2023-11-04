import { NAV_ITEM_TYPE_ITEM } from '@/constants/navigation.constant'
import type { NavigationTree } from '@/@types/navigation'
import { ADMIN, USER } from '@/constants/roles.constant'

const navigationConfig: NavigationTree[] = [
    {
        key: 'jobs',
        path: '/jobs',
        title: 'Jobs',
        translateKey: 'nav.jobs',
        icon: 'jobs',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, USER],
        subMenu: [],
    },
    {
        key: 'jobs-history',
        path: '/jobs-history',
        title: 'Jobs history',
        translateKey: 'nav.jobs-history',
        icon: 'jobs-history',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN],
        subMenu: [],
    },
    {
        key: 'jobs-applied',
        path: '/jobs-applied',
        title: 'Job applied',
        translateKey: 'nav.jobs-applied',
        icon: 'jobs-applied',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [USER],
        subMenu: [],
    },
]

export default navigationConfig

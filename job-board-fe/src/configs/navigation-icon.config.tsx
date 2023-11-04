import {
    HiOutlineChartSquareBar,
    HiOutlineBookOpen,
    HiOutlineShare,
} from 'react-icons/hi'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    jobs: <HiOutlineChartSquareBar />,
    'jobs-history': <HiOutlineBookOpen />,
    'jobs-applied': <HiOutlineShare />
}

export default navigationIcon

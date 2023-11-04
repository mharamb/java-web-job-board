import Container from '@/components/shared/Container'
import reducer from './store'
import { injectReducer } from '@/store'
import ActionBar from './components/ActionBar'
import JobAppliedList from './components/JobAppliedList'
import { useTranslation } from 'react-i18next'
import { translationKey } from '@/constants/translationKey.constant'

injectReducer('projectList', reducer)

const JobApplied = () => {
    const { t } = useTranslation()
    const itemTitle = t(translationKey.jobAppliedList)

    return (
        <Container className="h-full">
            <ActionBar data={{
                title: itemTitle,
                showNewButton: false
            }} />
            <JobAppliedList />
        </Container>
    )
}

export default JobApplied

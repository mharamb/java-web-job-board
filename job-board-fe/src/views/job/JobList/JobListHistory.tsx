import JobListContent from './components/JobListContent'
import Container from '@/components/shared/Container'
import reducer from './store'
import { injectReducer } from '@/store'
import ActionBar from './components/ActionBar'
import { translationKey } from '@/constants/translationKey.constant'
import { useTranslation } from 'react-i18next'

injectReducer('projectList', reducer)

const JobListHistory = () => {
    const { t } = useTranslation()
    const itemTitle = t(translationKey.jobHistoryList)

    return (
        <Container className="h-full">
            <ActionBar data={{
                title: itemTitle,
                showNewButton: false
            }} />
            <JobListContent data={{isHistory: true}}/>
        </Container>
    )
}

export default JobListHistory

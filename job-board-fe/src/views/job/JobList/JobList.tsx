import ActionBar from './components/ActionBar'
import ProjectListContent from './components/JobListContent'
import Container from '@/components/shared/Container'
import reducer from './store'
import { injectReducer } from '@/store'
import { useTranslation } from 'react-i18next'
import { translationKey } from '@/constants/translationKey.constant'

injectReducer('projectList', reducer)

const JobList = () => {
    const { t } = useTranslation()
    const itemTitle = t(translationKey.jobList)

    return (
        <Container className="h-full">
            <ActionBar data={{
                title: itemTitle,
                showNewButton: true
            }} />
            <ProjectListContent />
        </Container>
    )
}

export default JobList

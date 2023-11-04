import JobForm, {
    FormModel,
    SetSubmitting,
} from '@/views/job/JobForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiPostJob } from '@/services/JobService'

const JobNew = () => {
    const navigate = useNavigate()

    const addJob = async (data: FormModel) => {
        const response = await apiPostJob<boolean, FormModel>(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const success = await addJob(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Successfuly added'}
                    type="success"
                    duration={2500}
                >
                    Job successfuly added
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/jobs')
        }
    }

    const handleDiscard = () => {
        navigate('/jobs')
    }

    return (
        <>
            <JobForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default JobNew

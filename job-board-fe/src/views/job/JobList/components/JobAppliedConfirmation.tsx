import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    useAppDispatch,
    useAppSelector,
    getList,
    toggleAppliedConfirmation,
} from '../store'
import { apiAppliedJob } from '@/services/JobService'
import { apiMe } from '@/services/AuthService'
import { setUser } from '@/store'
import { translationKey } from '@/constants/translationKey.constant'
import { useTranslation } from 'react-i18next'

const JobAppliedConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.projectList.data.appliedConfirmation
    )
    const selectedProduct = useAppSelector(
        (state) => state.projectList.data.selectedJobId
    )

    const onDialogClose = () => {
        dispatch(toggleAppliedConfirmation(false))
    }

    const { t } = useTranslation()

    const notificationTitle = t(translationKey.appliedTitle)
    const notificationDesc = t(translationKey.appliedDesc)
    const dialogTitle = t(translationKey.appliedDialogTitle)
    const dialogContent = t(translationKey.appliedDialogContent)

    const onConfirm = async () => {
        dispatch(toggleAppliedConfirmation(false))
        const success = await apiAppliedJob(selectedProduct)

        if (success) {
            const respMe = await apiMe()
            dispatch(
                setUser({
                    id: respMe.data.id,
                    firstName: respMe.data.firstName,
                    lastName: respMe.data.lastName,
                    username: respMe.data.username,
                    email: respMe.data.email,
                    appliedJobs: respMe.data.appliedJobs,
                    authority: respMe.data.authorities.map(
                        ({ authority }) => authority
                    ),
                })
            )

            dispatch(getList())
            toast.push(
                <Notification
                    title={notificationTitle}
                    type="success"
                    duration={2500}
                >
                    {notificationDesc}
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    return (
        <ConfirmDialog
            isOpen={dialogOpen}
            type="warning"
            title={dialogTitle}
            confirmButtonColor="green-900"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onConfirm}
        >
            <p>
                {dialogContent}
            </p>
        </ConfirmDialog>
    )
}

export default JobAppliedConfirmation

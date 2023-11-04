import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    useAppDispatch,
    useAppSelector,
    getList,
    toggleDeleteConfirmation,
} from '../store'
import { apiDeleteJob } from '@/services/JobService'
import { translationKey } from '@/constants/translationKey.constant'
import { useTranslation } from 'react-i18next'

const JobDeleteConfirmation = () => {
    const dispatch = useAppDispatch()
    const { t } = useTranslation()
    const deleteDialogTitle = t(translationKey.deleteDialogTitle)
    const deleteDialogContent = t(translationKey.deleteDialogContent)
    const successDeletedTitle = t(translationKey.successDeletedTitle)
    const successDeletedDesc = t(translationKey.successDeletedDesc)

    const dialogOpen = useAppSelector(
        (state) => state.projectList.data.deleteConfirmation
    )
    const selectedProduct = useAppSelector(
        (state) => state.projectList.data.selectedJobId
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await apiDeleteJob(selectedProduct)

        if (success) {
            dispatch(getList())
            toast.push(
                <Notification
                    title={successDeletedTitle}
                    type="success"
                    duration={2500}
                >
                    {successDeletedDesc}
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
            type="danger"
            title={deleteDialogTitle}
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>{deleteDialogContent}</p>
        </ConfirmDialog>
    )
}

export default JobDeleteConfirmation

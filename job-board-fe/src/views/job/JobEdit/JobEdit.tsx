import { useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import reducer, {
    getProduct,
    deleteProduct,
    useAppSelector,
    useAppDispatch,
} from './store'
import { injectReducer } from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'

import JobForm, {
    SetSubmitting,
    OnDeleteCallback,
} from '@/views/job/JobForm'
import isEmpty from 'lodash/isEmpty'
import { apiUpdateJob } from '@/services/JobService'

injectReducer('salesProductEdit', reducer)

const JobEdit = () => {
    const dispatch = useAppDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const productData = useAppSelector(
        (state) => state.salesProductEdit.data.productData
    )
    const loading = useAppSelector(
        (state) => state.salesProductEdit.data.loading
    )

    const fetchData = (id: number) => {
        dispatch(getProduct(id))
    }

    const handleFormSubmit = async (
        values: any,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const success = await apiUpdateJob(values.id, {
            name: values.name,
            description: values.description,
            statusId: values.statusId
        })
        setSubmitting(false)
        if (success) {
            popNotification('updated')
        }
    }

    const handleDiscard = () => {
        navigate('/jobs')
    }

    const handleDelete = async (setDialogOpen: OnDeleteCallback) => {
        setDialogOpen(false)
        const success = await deleteProduct(productData.id)
        if (success) {
            popNotification('deleted')
        }
    }

    const popNotification = (keyword: string) => {
        toast.push(
            <Notification
                title={`Successfuly ${keyword}`}
                type="success"
                duration={2500}
            >
                Product successfuly {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/jobs')
    }

    useEffect(() => {
        const id = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        fetchData(parseInt(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    return (
        <>
            <Loading loading={loading}>
                {!isEmpty(productData) && (
                    <>
                        <JobForm
                            type="edit"
                            initialData={{
                                id: productData.id,
                                name: productData.name,
                                description: productData.description,
                                statusId: productData.status.id
                            }}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                            onDelete={handleDelete}
                        />
                    </>
                )}
            </Loading>
            {!loading && isEmpty(productData) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No product found!"
                    />
                    <h3 className="mt-8">No product found!</h3>
                </div>
            )}
        </>
    )
}

export default JobEdit

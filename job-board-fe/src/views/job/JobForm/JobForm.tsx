import { forwardRef, useState } from 'react'
import { FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import StickyFooter from '@/components/shared/StickyFooter'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { Form, Formik, FormikProps } from 'formik'
import BasicInformationFields from './BasicInformationFields'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineArrowLeft, AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { translationKey } from '@/constants/translationKey.constant'
import { useTranslation } from 'react-i18next'
import AppliedUserTable from './AppliedUserTable'
import { useAppSelector } from '@/store'
import { ADMIN } from '@/constants/roles.constant'

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type FormikRef = FormikProps<any>

type InitialData = {
    id?: number
    name?: string
    description?: string
    statusId?: number
    appliedUsers?: {
        firstName: string
        lastName: string
        email: string
    }[]
}

export type FormModel = InitialData

export type SetSubmitting = (isSubmitting: boolean) => void

export type OnDeleteCallback = React.Dispatch<React.SetStateAction<boolean>>

type OnDelete = (callback: OnDeleteCallback) => void

type ProductForm = {
    initialData?: InitialData
    type: 'edit' | 'new' | 'view'
    onDiscard?: () => void
    onDelete?: OnDelete
    onFormSubmit: (formData: FormModel, setSubmitting: SetSubmitting) => void
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Product Name Required'),
    description: Yup.string().required('Product Description Required'),
})

const DeleteProductButton = ({ onDelete }: { onDelete: OnDelete }) => {
    const [dialogOpen, setDialogOpen] = useState(false)

    const { t } = useTranslation()
    const deleteTitle = t(translationKey.delete)
    const deleteDialogTitle = t(translationKey.deleteDialogTitle)
    const deleteDialogContent = t(translationKey.deleteDialogContent)

    const onConfirmDialogOpen = () => {
        setDialogOpen(true)
    }

    const onConfirmDialogClose = () => {
        setDialogOpen(false)
    }

    const handleConfirm = () => {
        onDelete?.(setDialogOpen)
    }

    return (
        <>
            <Button
                className="text-red-600"
                variant="plain"
                size="sm"
                icon={<HiOutlineTrash />}
                type="button"
                onClick={onConfirmDialogOpen}
            >
                {deleteTitle}
            </Button>
            <ConfirmDialog
                isOpen={dialogOpen}
                type="danger"
                title={deleteDialogTitle}
                confirmButtonColor="red-600"
                onClose={onConfirmDialogClose}
                onRequestClose={onConfirmDialogClose}
                onCancel={onConfirmDialogClose}
                onConfirm={handleConfirm}
            >
                <p>
                    {deleteDialogContent}
                </p>
            </ConfirmDialog>
        </>
    )
}

const JobForm = forwardRef<FormikRef, ProductForm>((props, ref) => {
    const {
        type,
        initialData = {
            name: '',
            description: '',
            statusId: 0,
        },
        onFormSubmit,
        onDiscard,
        onDelete,
    } = props

    const navigate = useNavigate();

    const { t } = useTranslation()
    const saveTitle = t(translationKey.save)
    const backTitle = t(translationKey.back)
    const discardTitle = t(translationKey.discard)
    const user = useAppSelector(
        (state) => state.auth.user
    )

    return (
        <>
            <Formik
                innerRef={ref}
                initialValues={initialData}
                validationSchema={validationSchema}
                onSubmit={(values: FormModel, { setSubmitting }) => {
                    const formData = cloneDeep(values)
                    onFormSubmit?.(formData, setSubmitting)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                                <div className="lg:col-span-2">
                                    <BasicInformationFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                        isInputDisabled={type === 'view'}
                                    />
                                </div>
                                {(user.authority?.includes(ADMIN) && type === 'view' && initialData.appliedUsers?.length) ? (
                                    <div className="lg:col-span-2">
                                        <AppliedUserTable data={{
                                            users: initialData.appliedUsers
                                        }} />
                                    </div>
                                ) : ''}
                            </div>
                            <StickyFooter
                                className="-mx-8 px-8 flex items-center justify-between py-4"
                                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            >
                                <div>
                                    {type === 'edit' && (
                                        <DeleteProductButton
                                            onDelete={onDelete as OnDelete}
                                        />
                                    )}
                                </div>
                                <div className="md:flex items-center">
                                    {(type == 'new' || type === 'edit') && (
                                        <>
                                            <Button
                                                size="sm"
                                                className="ltr:mr-3 rtl:ml-3"
                                                type="button"
                                                onClick={() => onDiscard?.()}
                                            >
                                                {discardTitle}
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="solid"
                                                loading={isSubmitting}
                                                icon={<AiOutlineSave />}
                                                type="submit"
                                            >
                                                {saveTitle}
                                            </Button>
                                        </>
                                    )}
                                    {type == 'view' && (
                                        <>
                                            <Button
                                                size="sm"
                                                variant="solid"
                                                icon={<AiOutlineArrowLeft />}
                                                type="button"
                                                onClick={() => navigate(-1)}
                                            >
                                                {backTitle}
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </StickyFooter>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </>
    )
})

JobForm.displayName = 'JobForm'

export default JobForm

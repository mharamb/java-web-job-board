import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import { translationKey } from '@/constants/translationKey.constant'
import { useTranslation } from 'react-i18next'

type FormFieldsName = {
    name: string
    description: string
    statusId: number
}

type BasicInformationFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {
        statusId: number
    }
    isInputDisabled: boolean
}

const categories = [
    { label: 'VALID', value: 1 },
    { label: 'EXPIRED', value: 2 }
]

const BasicInformationFields = (props: BasicInformationFields) => {
    const { values = { statusId: '' }, touched, errors, isInputDisabled } = props
    const { t } = useTranslation()
    const jobFormTitle = t(translationKey.jobFormTitle)
    const jobFormDesc = t(translationKey.jobFormDesc)
    const jobFormName = t(translationKey.jobFormName)
    const descTitle = t(translationKey.desc)
    const statusTitle = t(translationKey.status)
    
    return (
        <AdaptableCard divider className="mb-4">
            <h5>{jobFormTitle}</h5>
            <p className="mb-6">{jobFormDesc}</p>
            <FormItem
                label={jobFormName}
                invalid={(errors.name && touched.name) as boolean}
                errorMessage={errors.name}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="name"
                    disabled={isInputDisabled}
                    placeholder="Name"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label={descTitle}
                labelClass="!justify-start"
                invalid={(errors.description && touched.description) as boolean}
                errorMessage={errors.description}
            >
                <Field name="description">
                    {({ field, form }: FieldProps) => (
                        <RichTextEditor
                            readOnly={isInputDisabled}
                            value={field.value}
                            onChange={(val) =>
                                form.setFieldValue(field.name, val)
                            }
                        />
                    )}
                </Field>
            </FormItem>
            <FormItem
                label={statusTitle}
                invalid={
                    (errors.statusId && touched.statusId) as boolean
                }
                errorMessage={errors.statusId}
            >
                <Field name="statusId">
                    {({ field, form }: FieldProps) => (
                        <Select
                            field={field}
                            form={form}
                            isDisabled={isInputDisabled}
                            options={categories}
                            value={categories.filter(
                                (category) =>
                                    category.value === values.statusId
                            )}
                            onChange={(option) =>
                                form.setFieldValue(
                                    field.name,
                                    option?.value
                                )
                            }
                        />
                    )}
                </Field>
            </FormItem>
        </AdaptableCard>
    )
}

export default BasicInformationFields

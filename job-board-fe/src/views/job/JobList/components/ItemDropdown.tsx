import Dropdown from '@/components/ui/Dropdown'
import { useNavigate } from 'react-router-dom'
import {
    HiPencil,
    HiTrash
} from 'react-icons/hi'
import { setSelectedProduct, toggleAppliedConfirmation, toggleDeleteConfirmation, useAppDispatch } from '../store'
import EllipsisButton from '@/components/shared/EllipsisButton'
import { UserState } from '@/store'
import { ADMIN, USER } from '@/constants/roles.constant'
import { useTranslation } from 'react-i18next'
import { translationKey } from '@/constants/translationKey.constant'

type Item = {
    id: number
    user: UserState
}

const ItemDropdown = ({ row }: { row: Item }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { t } = useTranslation()

    const applyTitle = t(translationKey.jobAppliedList)
    const editTitle = t(translationKey.jobAppliedList)
    const deleteTitle = t(translationKey.jobAppliedList)

    const onEdit = () => {
        navigate(`/jobs/edit/${row.id}`)
    }
    
    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedProduct(row.id))
    }

    const onApply = () => {
        dispatch(toggleAppliedConfirmation(true))
        dispatch(setSelectedProduct(row.id))
    }

    const dropdownList = () => {
        const {user} = row

        if (user.authority?.length === 1 && user.authority.includes(USER) && !user.appliedJobs.find((appliedJob) => appliedJob.id === row.id)) {
            return [
                { label: applyTitle, value: 'addFlag', icon: <HiPencil />, onClick: () => {
                    onApply()
                } },
            ]
        } else if (user.authority && user.authority.includes(ADMIN)) {
            return [
                { label: editTitle, value: 'addFlag', icon: <HiPencil />, onClick: () => {
                    onEdit()
                } },
                { label: deleteTitle, value: 'move', icon: <HiTrash />, onClick: () => {
                    onDelete()
                } },
            ]
        }

        return []
    }
    

    return (
        <>
            {dropdownList().length ? (
                <Dropdown placement="bottom-end" renderTitle={<EllipsisButton />}>
                    {dropdownList().map((item) => (
                        <Dropdown.Item key={item.value} eventKey={item.value} onClick={item.onClick}>
                            <span className="text-lg">{item.icon}</span>
                            <span className="ml-2 rtl:mr-2">{item.label}</span>
                        </Dropdown.Item>
                    ))}
                </Dropdown>
            ) : <></>}
        </>
    )
}

export default ItemDropdown

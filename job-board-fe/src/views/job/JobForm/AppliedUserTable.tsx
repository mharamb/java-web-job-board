import { useMemo, useRef } from 'react'
import DataTable from '@/components/shared/DataTable'
import type {
    DataTableResetHandle,
    ColumnDef,
} from '@/components/shared/DataTable'
import { translationKey } from '@/constants/translationKey.constant'
import { useTranslation } from 'react-i18next'

type User = {
    firstName: string
    lastName: string
    email: string
}

type AppliedUserTableProps = {
    data: {
        users: User[]
    }
}

const AppliedUserTable = ({ data }: AppliedUserTableProps) => {
    const { users } = data
    
    const tableRef = useRef<DataTableResetHandle>(null)
    const { t } = useTranslation()
    
    const itemFirstName = t(translationKey.firstName)
    const itemLastName = t(translationKey.lastName)
    const itemEmail = t(translationKey.email)
    const itemAppliedUsers = t(translationKey.appliedUsers)

    const columns: ColumnDef<User>[] = useMemo(
        () => [
            {
                header: itemFirstName,
                accessorKey: 'firstName',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.firstName}</span>
                },
            },
            {
                header: itemLastName,
                accessorKey: 'lastName',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.lastName}</span>
                },
            },
            {
                header: itemEmail,
                accessorKey: 'email',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.email}</span>
                },
            },
            
        ],
        [itemFirstName, itemLastName, itemEmail]
    )

    return (
        <>
            <p className='mb-2'>{itemAppliedUsers}</p>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={users}
            />
        </>
    )
}

export default AppliedUserTable

import { useMemo, useRef } from 'react'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/shared/DataTable'
import type {
    DataTableResetHandle,
    ColumnDef,
} from '@/components/shared/DataTable'
import { useAppSelector } from '@/store'
import { translationKey } from '@/constants/translationKey.constant'
import { useTranslation } from 'react-i18next'

type Product = {
    id: string
    name: string
    status: {
        id: number
        name: string
    } | number
}

const inventoryStatusColor: Record<
    number,
    {
        label: string
        dotClass: string
        textClass: string
    }
> = {
    1: {
        label: 'VALID',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    2: {
        label: 'EXPIRED',
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
    },
}


const JobAppliedList = () => {
    const tableRef = useRef<DataTableResetHandle>(null)
    const { t } = useTranslation()
    
    const itemName = t(translationKey.name)
    const itemStatus = t(translationKey.status)


    const { appliedJobs } = useAppSelector(
        (state) => state.auth.user
    )

    const columns: ColumnDef<Product>[] = useMemo(
        () => [
            {
                header: itemName,
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.name}</span>
                },
            },
            {
                header: itemStatus,
                accessorKey: 'status',
                cell: (props) => {
                    const { status } = props.row.original
                    let statusId = 0

                    if (typeof status === "number") {
                        statusId = status
                    } else if (typeof status === 'object') {
                        statusId = status.id
                    }


                    return (
                        <>
                            {status && (
                        <div className="flex items-center gap-2">
                        <Badge
                            className={
                                inventoryStatusColor[statusId].dotClass
                            }
                        />
                        <span
                            className={`capitalize font-semibold ${inventoryStatusColor[statusId].textClass}`}
                        >
                            {inventoryStatusColor[statusId].label}
                        </span>
                    </div>
                            )}
                        </>

                    )
                },
            },
        ],
        [itemName, itemStatus]
    )

    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={appliedJobs}
            />
        </>
    )
}

export default JobAppliedList

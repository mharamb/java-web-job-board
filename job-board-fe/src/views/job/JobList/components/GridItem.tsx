import Card from '@/components/ui/Card'
import Tag from '@/components/ui/Tag'
import ItemDropdown from './ItemDropdown'
import { Link } from 'react-router-dom'
import { useAppSelector } from '@/store'
import { HiOutlineClipboardCheck, HiPlusCircle } from 'react-icons/hi'

export type GridItemProps = {
    data: {
        id: number
        createdAt: string
        updatedAt: string
        name: string
        description: string
        status: {
            id: number
            name: string
        } | number
    }
}

const statusMap: Record<
number,
{
    label: string
    dotClass: string
}
>  = {
    1: {
        label: 'VALID',
        dotClass: 'bg-emerald-500'
    },
    2: {
        label: 'EXPIRED',
        dotClass: 'bg-amber-500'
    },
}

const getStatusName = (status: {
    id: number
    name: string
} | number) => {
    if (typeof status === 'number' ) {
        return statusMap[status]
    }

    return statusMap[status.id]
}

const GridItem = ({ data }: GridItemProps) => {
    const { id, name, status, createdAt } = data
    const user = useAppSelector(
        (state) => state.auth.user
    )

    const modifyStatus = getStatusName(status)
    
    return (
        <Card bodyClass="h-full">
            <div className="flex flex-col justify-between h-full">
                <div className="flex justify-between">
                    <Link to={`/jobs/detail/${id}`}>
                        <h6>{name}</h6>
                    </Link>
                    <ItemDropdown row={{id, user}} />
                </div>
                <div className="mt-3">
                    <div className="flex items-center justify-between mt-2">
                        <Tag prefix prefixClass={modifyStatus.dotClass}>
                            {modifyStatus.label}
                        </Tag>
                        {user.appliedJobs.find((appliedJob) => appliedJob.id === id) &&(
                        <Tag className='ml-1'
                            prefix={
                                    <HiPlusCircle className="text-base text-blue-500 mr-1" />
                                }
                            >
                                APPLIED
                            </Tag>
                        )}
                        <div className="flex items-center rounded-full font-semibold text-xs">
                            <div className="flex items-center px-2 py-1 border border-gray-300 rounded-full">
                                <HiOutlineClipboardCheck className="text-base" />
                                <span className="ml-1 rtl:mr-1 whitespace-nowrap">
                                    {new Date(createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default GridItem

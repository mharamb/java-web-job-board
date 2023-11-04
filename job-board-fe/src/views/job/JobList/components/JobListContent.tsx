import { useEffect } from 'react'
import classNames from 'classnames'
import GridItem from './GridItem'
import Spinner from '@/components/ui/Spinner'
import { getList, useAppDispatch, useAppSelector } from '../store'
import JobDeleteConfirmation from './JobDeleteConfirmation'
import JobAppliedConfirmation from './JobAppliedConfirmation'

type JobListContentProps = {
    data?: {
        isHistory: boolean
    }
}

const JobListContent = ({ data = {isHistory: false} }: JobListContentProps) => {
    const { isHistory } = data
     const dispatch = useAppDispatch()
    const loading = useAppSelector((state) => state.projectList.data.loading)
    const projectList = useAppSelector(
        (state) => state.projectList.data.jobList
    )

    useEffect(() => {
        dispatch(getList())
    }, [dispatch])

    return (
        <>
            <div
                className={classNames(
                    'mt-6 h-full flex flex-col',
                    loading && 'justify-center'
                )}
            >
                {loading && (
                    <div className="flex justify-center">
                        <Spinner size={40} />
                    </div>
                )}
                {projectList.length > 0 && !loading && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {isHistory ? (
                            <>
                                {projectList.map((project) => (
                                    <GridItem key={project.id} data={project} />
                                ))}
                            </>
                        ) : (
                            <>
                                {projectList.filter(project => {
                                    const {status} = project

                                    if (typeof status === "number") {
                                        return status === 1
                                    }

                                    return status.id === 1
                                }).map((project) => (
                                    <GridItem key={project.id} data={project} />
                                ))}
                            </>
                        )}
                    </div>
                )}
            </div>
            <JobDeleteConfirmation />
            <JobAppliedConfirmation />
        </>
    )
}

export default JobListContent

import Button from '@/components/ui/Button'
import { ADMIN } from '@/constants/roles.constant'
import { translationKey } from '@/constants/translationKey.constant'
import { useAppSelector } from '@/store'
import { useTranslation } from 'react-i18next'
import { HiOutlinePlusCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom'

type ActionBarProps = {
    data: {
        title: string
        showNewButton: boolean
    }
}

const ActionBar = ({ data = { title: '', showNewButton: true } }: ActionBarProps) => {
    const { title, showNewButton } = data
    const { authority } = useAppSelector(
        (state) => state.auth.user
    )
    const { t } = useTranslation()
    
    const newJobTitle = t(translationKey.newJobTitle)

    return (
        <div className="lg:flex items-center justify-between mb-4">
            <h3 className="mb-4 lg:mb-0">{title}</h3>
            {showNewButton && authority?.includes(ADMIN) && (
                <div className="flex flex-col md:flex-row md:items-center gap-1">
                    <Link to="/jobs/new">
                        <Button
                            size="sm"
                            variant="twoTone"
                            icon={<HiOutlinePlusCircle />}
                        >
                            {newJobTitle}
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default ActionBar

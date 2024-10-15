import Header from 'components/common/elements/header'
import Sidebar from 'components/common/elements/sidebar'

const DashboardLayout = ({ children, type, active }) => {
    return (
        <div className='flex h-screen'>
            <Sidebar active={active} type={type} />
            <div className='bg-[#f1f2f8] flex-1 pl-3 overflow-auto'>
                <Header />
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout
import {ReactNode} from 'react';
import DashboardLayout from './_components/dashboard-layout';

type LayouthProps = {
  children: ReactNode
}

const Layout = ({ children }: LayouthProps) => {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  )
}

export default Layout
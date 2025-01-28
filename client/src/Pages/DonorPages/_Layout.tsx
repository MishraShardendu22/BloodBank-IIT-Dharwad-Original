import type { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

<<<<<<< HEAD
const _Layout = ({ children }: LayoutProps) => {
  return <div>{children}</div>;
};

export default _Layout;
=======
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">{children}</main>
    </div>
  )
}

export default Layout

>>>>>>> 7c0dfb70bc445b745494f7d0bed5e5559c7a9f5d

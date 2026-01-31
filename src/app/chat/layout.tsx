import ChatLayout from "@/layout/ChatLayout"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ChatLayout>{children}</ChatLayout>
  )
}

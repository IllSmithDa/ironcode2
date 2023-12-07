import Auth from "@/components/Auth/Auth"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Auth>
      {children}
    </Auth>
  )
}

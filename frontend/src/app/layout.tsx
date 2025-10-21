import './globals.css'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        {/* Navbar */}
        

        {/* Page content */}
        <main className="p-6">{children}</main>
      </body>
    </html>
  )
}
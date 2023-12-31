import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/ui/header'
import { AuthProvider } from '@/providers/auth'
import Footer from '@/components/ui/footer'
import CartProvider from '@/providers/cart'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ted Store',
  description: 'Sua loja de acessórios para seu computador',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-full flex-col">
          <AuthProvider>
           <CartProvider>
            <Header/>
              <Toaster />
              <div className="flex-1">{children}</div> 
              <Footer/>
            </CartProvider>
          </AuthProvider>
        </div>
        
      </body>
    </html>
  )
}

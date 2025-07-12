"use client"

import { Button } from "@/components/ui/button"
import { Package, Menu } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { useState } from "react"

export function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Package className="h-4 w-4" />
            </div>
            <span className="text-xl font-bold">Walmart Invoice Hub</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#demo" className="text-muted-foreground hover:text-foreground transition-colors">
              Demo
            </Link>
            <Link href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/auth/login">
              <Button variant="outline" className="bg-transparent">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="walmart-gradient">Get Started</Button>
            </Link>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link href="#features" className="block py-2 text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="#demo" className="block py-2 text-muted-foreground hover:text-foreground">
              Demo
            </Link>
            <Link href="#testimonials" className="block py-2 text-muted-foreground hover:text-foreground">
              Testimonials
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="walmart-gradient w-full">Get Started</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

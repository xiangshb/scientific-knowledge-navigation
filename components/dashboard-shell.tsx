"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  BrainCircuit,
  Bot,
  Network,
  Settings,
  Search,
  Bell,
  Menu,
  X,
  Briefcase,
  Wrench,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40">
        <div className="flex h-14 items-center px-4 md:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>

          <div className="flex items-center gap-2 font-semibold text-lg tracking-tight">
            <div className="bg-primary/10 p-1.5 rounded-md">
              <BrainCircuit className="h-5 w-5 text-primary" />
            </div>
            <span className="hidden md:inline-block">Scientific Insight Engine</span>
            <span className="md:hidden">SIE</span>
          </div>

          <div className="ml-auto flex items-center gap-4">
            <div className="relative hidden md:block w-64 lg:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search knowledge, agents, or tools..."
                className="h-9 w-full rounded-full bg-secondary/50 pl-9 text-sm focus:bg-background transition-colors border-transparent focus:border-primary/20"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
              <span className="sr-only">Notifications</span>
            </Button>
            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center border overflow-hidden">
              <span className="text-xs font-medium">DR</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 transform bg-background/50 backdrop-blur-sm transition-transform duration-200 ease-in-out md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:translate-x-0",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-full flex-col gap-2 p-4">
            {/* Mobile Close Button */}
            <div className="flex justify-end md:hidden mb-4">
              <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
              Platform
            </div>
            <NavItem href="/" icon={LayoutDashboard}>
              Overview
            </NavItem>
            <NavItem href="/research" icon={Briefcase}>
              Research Management
            </NavItem>
            <NavItem href="/analytics" icon={BarChart3}>
              Analytics Center
            </NavItem>

            <div className="mt-6 px-2 py-1.5 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
              System Layers
            </div>
            <NavItem href="/agents" icon={Bot}>
              Agent Ecosystem
            </NavItem>
            <NavItem href="/knowledge-network" icon={Network}>
              Knowledge Network
            </NavItem>
            <NavItem href="/tools" icon={Wrench}>
              Tool Ecosystem
            </NavItem>
            <NavItem href="/model-test" icon={BrainCircuit}>
              Model Test Console
            </NavItem>

            <div className="mt-auto pt-4">
              <NavItem href="#" icon={Settings}>
                System Settings
              </NavItem>
              <div className="px-4 py-4">
                <div className="rounded-xl bg-secondary/30 p-3 text-xs backdrop-blur-md">
                  <div className="font-medium mb-1">System Status</div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Operational (v1.2.0)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 md:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-background/50 p-4 md:p-8 lg:p-10">
          <div className="mx-auto max-w-7xl space-y-8">{children}</div>
        </main>
      </div>
    </div>
  )
}

function NavItem({ href, icon: Icon, children }: { href: string; icon: any; children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
      )}
    >
      <Icon className="h-4 w-4" />
      {children}
    </Link>
  )
}

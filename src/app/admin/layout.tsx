'use client'

import { useState, useEffect, ReactNode, createContext, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ShoppingBag,
    Flame,
    LogOut,
    Menu,
    ChevronRight,
    LayoutDashboard
} from 'lucide-react'

// ============================================
// TYPES & INTERFACES
// ============================================

interface AdminUser {
    id: string
    username: string
    role: 'admin' | 'manager' | 'viewer'
    email: string
    createdAt: string
    lastLogin: string
}

interface ThemeContextType {
    theme: 'light'
    currentUser: AdminUser | null
}

const DEFAULT_USERS: AdminUser[] = [
    {
        id: '1',
        username: 'admin',
        role: 'admin',
        email: 'admin@maauniquedham.com',
        createdAt: '2024-01-01',
        lastLogin: new Date().toISOString()
    },
]

const DEFAULT_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    currentUser: null
})

export const useTheme = () => useContext(ThemeContext)

// ============================================
// COMPACT NAV COMPONENT
// ============================================

interface NavItemProps {
    href: string
    label: string
    icon: any
    isActive: boolean
    isSidebarOpen: boolean
}

function NavItem({ href, label, icon: Icon, isActive, isSidebarOpen }: NavItemProps) {
    return (
        <Link href={href}>
            <div
                className={`relative flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group ${
                    isActive 
                    ? 'bg-[#E95D24] text-white' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
            >
                <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#E95D24]'} />
                <AnimatePresence mode="wait">
                    {isSidebarOpen && (
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="text-sm font-medium flex-1 whitespace-nowrap"
                        >
                            {label}
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
        </Link>
    )
}

// ============================================
// GLOW CARD COMPONENT (Shared UI)
// ============================================

interface GlowCardProps {
    children: ReactNode
    className?: string
    onClick?: () => void
}

export function GlowCard({ children, className, onClick }: GlowCardProps) {
    return (
        <div 
            onClick={onClick}
            className={className}
        >
            {children}
        </div>
    )
}


export default function AdminLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState<AdminUser | null>(null)
    const [isProfileOpen, setIsProfileOpen] = useState(false)

    useEffect(() => {
        const auth = sessionStorage.getItem('admin_auth')
        const savedUser = sessionStorage.getItem('admin_user')
        if (auth === 'true' && savedUser) {
            setIsAuthenticated(true)
            setCurrentUser(JSON.parse(savedUser))
        }
    }, [])

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (username === DEFAULT_CREDENTIALS.username && password === DEFAULT_CREDENTIALS.password) {
            const user = DEFAULT_USERS[0]
            setIsAuthenticated(true)
            setCurrentUser(user)
            sessionStorage.setItem('admin_auth', 'true')
            sessionStorage.setItem('admin_user', JSON.stringify(user))
            setError('')
        } else {
            setError('Invalid username or password')
        }
    }

    const handleLogout = () => {
        setIsAuthenticated(false)
        setCurrentUser(null)
        sessionStorage.removeItem('admin_auth')
        sessionStorage.removeItem('admin_user')
    }

    const navItems = [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/admin/products', label: 'Sacred Store', icon: ShoppingBag },
        { href: '/admin/pujas', label: 'Puja Booking', icon: Flame },
    ]

    const gridBackgroundStyle = {
        backgroundImage: `linear-gradient(to right, #f1f5f9 1px, transparent 1px), 
                          linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
        opacity: 0.5
    };

    if (!isAuthenticated) {
        return (
            <div className="fixed inset-0 bg-slate-50 flex items-center justify-center p-4 z-[9999] font-body">
                <div className="absolute inset-0 pointer-events-none" style={gridBackgroundStyle} />
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-slate-200 rounded-xl p-8 w-full max-w-sm relative z-10 shadow-lg shadow-slate-200/50"
                >
                    <div className="text-center mb-8">
                        <div className="mb-6 flex justify-center">
                            <Image src="/logo.png" alt="Maa Unique Dham" width={140} height={32} className="h-8 w-auto object-contain" />
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-slate-900">Admin Login</h1>
                        <p className="text-slate-500 mt-1 text-sm">Please log in to continue</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-600 block">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter username"
                                    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-900/10 transition-all outline-none"
                                />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-600 block">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-900/10 transition-all outline-none"
                                />
                        </div>
                        {error && <p className="text-red-500 text-xs font-medium text-center">{error}</p>}
                        <button
                            type="submit"
                            className="w-full py-2.5 bg-[#E95D24] text-white text-sm font-semibold rounded-lg hover:bg-[#d14d1b] transition-all mt-6"
                        >
                            Login
                        </button>
                    </form>
                </motion.div>
            </div>
        )
    }

    return (
        <ThemeContext.Provider value={{ theme: 'light', currentUser }}>
            <div className="fixed inset-0 bg-slate-50 flex flex-col md:flex-row z-[9999] font-body antialiased text-slate-900 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none" style={gridBackgroundStyle} />

                {/* Mobile Header */}
                <div className="md:hidden h-16 bg-white border-b border-slate-200 px-4 flex items-center justify-between relative z-50">
                    <Image src="/logo.png" alt="Maa Unique Dham" width={100} height={20} className="h-5 w-auto object-contain" />
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                        <Menu size={20} className="text-slate-600" />
                    </button>
                </div>

                {/* Mobile Sidebar Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <>
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] md:hidden"
                            />
                            <motion.aside
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '-100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed inset-y-0 left-0 w-[280px] bg-white z-[70] md:hidden flex flex-col shadow-2xl"
                            >
                                <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100">
                                    <Image src="/logo.png" alt="Maa Unique Dham" width={120} height={24} className="h-6 w-auto object-contain" />
                                    <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-slate-50 rounded-lg">
                                        <X size={20} className="text-slate-400" />
                                    </button>
                                </div>
                                <nav className="flex-1 p-4 space-y-1">
                                    {navItems.map((item) => (
                                        <div key={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                                            <NavItem 
                                                href={item.href} 
                                                label={item.label} 
                                                icon={item.icon} 
                                                isActive={item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)} 
                                                isSidebarOpen={true} 
                                            />
                                        </div>
                                    ))}
                                </nav>
                                <div className="p-4 border-t border-slate-100">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-xl text-sm font-bold transition-all"
                                    >
                                        <LogOut size={18} />
                                        Logout Account
                                    </button>
                                </div>
                            </motion.aside>
                        </>
                    )}
                </AnimatePresence>

                {/* Desktop Sidebar */}
                <motion.aside
                    initial={false}
                    animate={{ width: isSidebarOpen ? 260 : 80 }}
                    className="hidden md:flex bg-white border-r border-slate-200 flex-col h-full relative z-20 shadow-sm"
                >
                    <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100">
                        <AnimatePresence mode="wait">
                            {isSidebarOpen ? (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="flex items-center"
                                >
                                    <Image src="/logo.png" alt="Maa Unique Dham" width={120} height={24} className="h-6 w-auto object-contain" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    className="w-8 h-8 bg-[#E95D24] rounded-lg flex items-center justify-center mx-auto"
                                >
                                    <Image src="/logo.png" alt="M" width={16} height={16} className="w-4 h-4 object-contain invert" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                        {navItems.map((item) => (
                            <NavItem 
                                key={item.href}
                                href={item.href} 
                                label={item.label} 
                                icon={item.icon} 
                                isActive={item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)} 
                                isSidebarOpen={isSidebarOpen} 
                            />
                        ))}
                    </nav>

                    <div className="p-4 border-t border-slate-100 space-y-2">
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200"
                            >
                                <div className="w-8 h-8 rounded-md bg-[#E95D24] flex items-center justify-center text-white text-xs font-bold">
                                    {currentUser?.username.charAt(0).toUpperCase()}
                                </div>
                                {isSidebarOpen && (
                                    <div className="flex-1 text-left">
                                        <p className="text-sm font-semibold text-slate-900">{currentUser?.username}</p>
                                        <p className="text-xs text-slate-500 capitalize">{currentUser?.role}</p>
                                    </div>
                                )}
                                {isSidebarOpen && <ChevronRight size={14} className="text-slate-400" />}
                            </button>

                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 5 }}
                                        className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden p-1"
                                    >
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md text-sm font-medium transition-all"
                                        >
                                            <LogOut size={14} />
                                            Logout
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-all"
                        >
                            <Menu size={16} />
                        </button>
                    </div>
                </motion.aside>

                <main className="flex-1 overflow-y-auto relative custom-scrollbar">
                    <div className="p-4 md:p-8 lg:p-10 w-full">
                        {children}
                    </div>
                </main>
            </div>
        </ThemeContext.Provider>
    )
}

import { X } from 'lucide-react'

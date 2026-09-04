// src/blocks/Navbar/Component.tsx
'use client'
import React, { useState } from 'react'
import { Link } from '@/i18n/navigation'
import { Media } from '@/payload-types'

type NavbarProps = {
  logoText: string
  links: { text: string; url: string }[]
  button: { text: string; url: string }
  avatar: Media
}

export const NavbarBlock: React.FC<NavbarProps> = ({ logoText, links, button, avatar }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="px-4 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="opacity-0 animate-[fadeInUp_0.6s_ease-out_0.1s_forwards]">
            <Link href="/" className="text-title-lg text-on-surface hover:text-primary transition-colors duration-200">
              {logoText}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.3s_forwards]">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="text-on-surface hover:text-primary transition-colors duration-200 font-medium"
              >
                {link.text}
              </a>
            ))}
          </div>

          {/* Action Button & Avatar - Desktop */}
          <div className="hidden md:flex items-center space-x-4 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.5s_forwards]">
            {/* Action Button */}
            <a
              href={button.url}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all duration-200 transform hover:scale-105 shadow-e1 hover:shadow-e1"
            >
              {button.text}
            </a>

            {/* Avatar Dropdown */}
            {/* <div className="relative group">
              <button className="w-10 h-10 rounded-full overflow-hidden border-2 border-border hover:border-primary transition-all duration-200 transform hover:scale-105">
                {avatar?.url ? (
                  <img 
                    src={avatar.url} 
                    alt={avatar.alt || 'Avatar'} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                    <svg className="w-6 h-6 text-on-surface-variant" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                )}
              </button>

              <div className="absolute right-0 mt-2 w-48 bg-card rounded-md shadow-e2 border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {links.slice(0, 3).map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      className="block px-4 py-2 text-on-surface hover:bg-surface-container-low hover:text-primary transition-colors duration-200"
                    >
                      {link.text}
                    </a>
                  ))}
                  <hr className="my-2 border-border" />
                  <a href="#" className="block px-4 py-2 text-on-surface hover:bg-surface-container-low hover:text-primary transition-colors duration-200">
                    Настройки
                  </a>
                  <a href="#" className="block px-4 py-2 text-on-surface hover:bg-surface-container-low hover:text-red-500 transition-colors duration-200">
                    Выйти
                  </a>
                </div>
              </div>
            </div> */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden opacity-0 animate-[fadeInUp_0.6s_ease-out_0.3s_forwards]">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-on-surface hover:text-primary hover:bg-surface-container-low transition-all duration-200"
            >
              <svg
                className={`w-6 h-6 transform transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="pt-4 pb-2 space-y-2">
            {/* Mobile Action Button */}
            <div className="px-2 pb-4">
              <a
                href={button.url}
                className="block w-full text-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all duration-200"
              >
                {button.text}
              </a>
            </div>

            {/* Mobile Links */}
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="block px-2 py-3 text-on-surface hover:text-primary hover:bg-surface-container-low rounded-md transition-all duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.text}
              </a>
            ))}

            {/* Mobile Avatar Section */}
            {/* <div className="border-t border-border pt-4 mt-4">
              <div className="flex items-center space-x-3 px-2 py-2">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-border">
                  {avatar?.url ? (
                    <img 
                      src={avatar.url} 
                      alt={avatar.alt || 'Avatar'} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                      <svg className="w-6 h-6 text-on-surface-variant" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-on-surface font-medium">Профиль</p>
                  <p className="text-on-surface-variant text-sm">Управление аккаунтом</p>
                </div>
              </div>
              <div className="space-y-1 mt-2">
                <a href="#" className="block px-2 py-2 text-on-surface hover:text-primary hover:bg-surface-container-low rounded-md transition-all duration-200">
                  Настройки
                </a>
                <a href="#" className="block px-2 py-2 text-on-surface hover:text-red-500 hover:bg-surface-container-low rounded-md transition-all duration-200">
                  Выйти
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </nav>
  )
}

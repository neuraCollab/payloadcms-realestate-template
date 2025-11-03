'use client'

import React from 'react'
import { Agent } from '@/payload-types'
import { Linkedin, Twitter, Facebook, Instagram } from 'lucide-react'

export type AgentsBlockType = {
  blockType: 'agents'
  label: string
  title: string
  agents: Agent[]
}

const SOCIAL_ICONS = {
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
}

export const AgentsBlock: React.FC<AgentsBlockType> = ({ label, title, agents }) => {
  return (
    <section className="px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-12 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.1s_forwards]">
          <div className="text-sm text-primary mb-2 font-medium">{label}</div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">{title}</h2>
        </div>

        {/* Сетка агентов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent, index) => (
            <div 
              key={agent.id} 
              className={`group p-6 rounded-lg border border-gray-200 hover:border-primary/30 hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-4px] opacity-0 animate-[fadeInUp_0.6s_ease-out_${0.3 + index * 0.1}s_forwards]`}
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl mb-6 shadow-sm group-hover:shadow-md transition-all duration-300">
                <img
                  src={typeof agent.image === 'object' ? agent.image.url : '/placeholder.jpg'}
                  alt={agent.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-200">
                {agent.name}
              </h3>
              <p className="text-gray-600 mb-4">{agent.position}</p>

              {agent.socialLinks && agent.socialLinks.length > 0 && (
                <div className="flex gap-3">
                  {agent.socialLinks.map((social, index) => {
                    const Icon = SOCIAL_ICONS[social.platform as keyof typeof SOCIAL_ICONS]
                    return Icon ? (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all duration-200 transform hover:scale-110 shadow-sm hover:shadow-md"
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    ) : null
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

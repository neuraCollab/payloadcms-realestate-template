'use client'

import React from 'react'
import { Post } from '@/payload-types'
import { formatDate } from '@/utilities/formatDate'

export type BlogBlockType = {
  blockType: 'blog'
  title: string
  subtitle?: string
  posts: Post[]
  showAllLink?: string
  itemsPerPage: number
}

const PostCard: React.FC<{ post: Post; index: number }> = ({ post, index = 1 }) => {
  return (
    <div className={`group opacity-0 animate-[fadeInUp_0.6s_ease-out_${0.3 + index * 0.1}s_forwards]`}>
      <a href={`/posts/${post.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4 shadow-sm hover:shadow-md transition-all duration-300">
          <img
            src={
              typeof post.image === 'object' && post.image?.url ? post.image.url : '/placeholder.jpg'
            }
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {post.categories?.[0] && (
            <div className="absolute top-4 left-4">
              <div className="px-3 py-1 bg-primary text-white text-sm rounded-full">
                {typeof post.categories[0] === 'object' ? post.categories[0].title : 'Resource'}
              </div>
            </div>
          )}
        </div>
        <h3 className="text-lg font-semibold line-clamp-2 mb-2 text-gray-900 group-hover:text-primary transition-colors duration-200">
          {post.title}
        </h3>
        {post.meta?.description && (
          <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
            {post.meta.description}
          </p>
        )}
      </a>
    </div>
  )
}

export const BlogBlock: React.FC<BlogBlockType> = ({
  title,
  subtitle,
  posts = [],
  showAllLink,
  itemsPerPage = 3,
}) => {
  const displayedPosts = posts.slice(0, itemsPerPage)

  return (
    <section className="px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="mb-12 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.1s_forwards]">
          {subtitle && (
            <div className="text-sm font-medium text-primary mb-2">{subtitle}</div>
          )}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">{title}</h2>
            {showAllLink && (
              <a 
                href={showAllLink} 
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
              >
                View all posts
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Сетка постов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPosts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

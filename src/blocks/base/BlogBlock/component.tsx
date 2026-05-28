'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Post } from '@/payload-types'

export type BlogBlockType = {
  blockType: 'blog'
  title: string
  subtitle?: string
  posts: Post[]
  showAllLink?: string
  itemsPerPage?: number
}

const PostCard: React.FC<{ post: Post; index: number; className?: string }> = ({
  post,
  index,
  className = '',
}) => {
  return (
    <div
      className={`group ${className}`}
      style={{ animation: `fadeInUp 0.6s ease-out ${0.2 + index * 0.08}s both` }}
    >
      <a href={`/posts/${post.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-md mb-4 shadow-e1 hover:shadow-e2 transition-all duration-300">
          <img
            src={
              typeof post.image === 'object' && post.image?.url ? post.image.url : '/placeholder.jpg'
            }
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {post.categories?.[0] ? (
            <div className="absolute top-4 left-4">
              <div className="px-3 py-1 bg-primary text-primary-foreground text-label rounded-full">
                {typeof post.categories[0] === 'object' ? post.categories[0].title : 'Категория'}
              </div>
            </div>
          ) : null}
        </div>
        <h3 className="text-title line-clamp-2 mb-2 text-on-surface group-hover:text-primary transition-colors duration-200">
          {post.title}
        </h3>
        {post.meta?.description ? (
          <p className="text-on-surface-variant line-clamp-2 text-body-sm leading-relaxed">
            {post.meta.description}
          </p>
        ) : null}
      </a>
    </div>
  )
}

// Responsive count by breakpoint. Posts beyond a breakpoint's cap are hidden
// via Tailwind's hidden/...:block classes so we don't ship them at all.
//   mobile: 1 visible
//   sm:    2 visible
//   lg:    3 visible
//   xl:    4 visible
const HIDE_CLASSES = ['', 'hidden sm:block', 'hidden lg:block', 'hidden xl:block']

export const BlogBlock: React.FC<BlogBlockType> = ({
  title,
  subtitle,
  posts = [],
  showAllLink,
  itemsPerPage = 4,
}) => {
  const displayedPosts = posts.slice(0, Math.max(itemsPerPage, 4))

  return (
    <section className="px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          {subtitle ? (
            <div className="text-sm font-medium text-primary mb-2">{subtitle}</div>
          ) : null}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-headline md:text-display text-on-surface">{title}</h2>
            {showAllLink ? (
              <a
                href={showAllLink}
                className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Все статьи
                <ArrowRight className="w-4 h-4" />
              </a>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedPosts.map((post, index) => (
            <PostCard
              key={post.id}
              post={post}
              index={index}
              className={HIDE_CLASSES[index] ?? 'hidden xl:block'}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

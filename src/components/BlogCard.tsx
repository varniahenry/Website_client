'use client';
import { Card } from './Card';
import { BlogPostProps } from '@/types';

export function BlogCard(blog: BlogPostProps) {
  return (
    <Card
      {...blog}
      basePath='blog'
    />
  );
}

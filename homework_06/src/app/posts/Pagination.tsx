'use client'
import { Post } from '@/api/JsonPlaceholderAPI/types';
import { Pagination, PaginationItem, PaginationRenderItemParams } from '@mui/material'
import Link from 'next/link'

interface PaginationParams {
  pageNumber: number,
  pageCount: number,
}

const PaginationSection = ({ pageNumber, pageCount }: PaginationParams) => {
  const handleRenderItem = (item: PaginationRenderItemParams) => (
    <PaginationItem component={Link} href={`/posts${item.page === 1 ? '' : `?page=${item.page}`}`} {...item} />
  )

  return (
    <Pagination
      page={pageNumber}
      count={pageCount}
      shape="rounded"
      renderItem={handleRenderItem}
  />)
}

export default PaginationSection

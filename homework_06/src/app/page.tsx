// 'use client'
import JsonPlaceholderAPI from '@/api/JsonPlaceholderAPI/JsonPlaceholderAPI';
import Image from 'next/image'
import styles from './page.module.css'
import { Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material'

export default async function Photos() {
  const photos = await JsonPlaceholderAPI.getPhotos( {signal: new AbortController().signal, cache: "no-cache" })

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Photos
      </Typography>
      <Grid container spacing={2}>
          <ImageList cols={4} gap={16}>
            {photos.map((photo) => (
              <ImageListItem key={photo.id}>
                <Image src={photo.url} alt={photo.title} width={280} height={280} priority />
                <ImageListItemBar
                  title={photo.title}
                  actionIcon={
                    <IconButton>
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
      </Grid>
    </>
  )
}

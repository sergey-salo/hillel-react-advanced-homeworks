import { useEffect } from 'react'

import InfoIcon from '@mui/icons-material/Info'
import { Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material'

import { Loader } from '../../components/Loader/Loader'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { getPhotos } from '../../store/photos'

const Photos = () => {
  const { photos, loading } = useAppSelector((state) => state.photos)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPhotos())
  }, [])

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Photos
      </Typography>
      <Grid container spacing={2}>
        {loading ? (
          <Loader />
        ) : (
          <ImageList cols={4} gap={16}>
            {photos.map((photo) => (
              <ImageListItem key={photo.id}>
                <img src={photo.url} alt={photo.title} width={280} height={280} />
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
        )}
      </Grid>
    </>
  )
}

export { Photos }

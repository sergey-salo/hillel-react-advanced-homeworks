import { useLoaderData, useNavigation } from 'react-router-dom'

import InfoIcon from '@mui/icons-material/Info'
import { Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material'

import { Loader } from '../../components/Loader/Loader.jsx'

const Photos = () => {
  const photos = useLoaderData()
  const navigation = useNavigation()

  const isLoading = navigation.state === 'loading'

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Photos
      </Typography>
      <Grid container spacing={2}>
        {isLoading ? (
          <Loader />
        ) : (
          <ImageList cols={4} gap={16}>
            {photos.map((photo) => (
              <ImageListItem key={photo.id}>
                <img src={photo.url} alt={photo.title} width={280} height={280} />
                <ImageListItemBar
                  title={photo.title}
                  actionIcon={
                    <IconButton onClick={() => {}}>
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

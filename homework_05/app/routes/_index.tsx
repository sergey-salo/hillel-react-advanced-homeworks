import type { LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData, useNavigation } from "@remix-run/react"
import { Info as InfoIcon} from '@mui/icons-material'
import { Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material'

import { Loader } from '~/components/Loader/Loader'
import JsonPlaceholderAPI from '~/api/JsonPlaceholderAPI/JsonPlaceholderAPI'

export const meta: MetaFunction = () => {
  return [
    { title: "Photos (homework_05)" },
  ]
}

export const loader = async ({ request: { signal } }: Parameters<LoaderFunction>[number]) => {
  return await JsonPlaceholderAPI.getPhotos({ signal })
}

export default function Index() {
  const photos = useLoaderData<typeof loader>()
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

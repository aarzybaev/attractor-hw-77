import React from 'react';
import { Card, CardContent, CardHeader, CardMedia, Grid, Typography } from '@mui/material';
import { apiURL } from '../../../constants.ts';
import { Message } from '../../../types';
import dayjs from 'dayjs';

interface Props {
  item: Message;
}
const MessageItem: React.FC<Props> = ({item}) => {

  return (
  <Grid item xs>
    <Card sx={{ maxWidth: 500 }}>
      <CardHeader
        title={"Author: " + item.author}
        subheader={dayjs(item.createdAt).format('DD/MM/YYYY HH:mm')}
      />
      {item.image && <CardMedia
        component="img"
        height="194"
        image={apiURL + '/' + item.image}
        alt={item.author}
      />}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.message}
        </Typography>
      </CardContent>

    </Card>
  </Grid>
  );
};
export default MessageItem;
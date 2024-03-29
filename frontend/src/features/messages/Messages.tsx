import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import MessageForm from './components/MessageForm.tsx';
import { MessageMutation, MessageWithID } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { createMessage, fetchMessages } from './messagesThunks.ts';
import { useEffect, useState } from 'react';
import { selectMessages, selectMessagesCreating, selectMessagesFetching } from './messagesSlice.ts';
import MessageItem from './components/MessageItem.tsx';
import dayjs from 'dayjs';
const Messages = () => {
  const [messagesState, setMessagesState] = useState<MessageWithID[]>([]);
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectMessages);
  const createLoading = useAppSelector(selectMessagesCreating);
  const fetchLoading = useAppSelector(selectMessagesFetching);
  const onFormSubmit =  async (messageMutation: MessageMutation) => {
     await dispatch(createMessage(messageMutation));
     void dispatch(fetchMessages());
  };

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  useEffect(() => {
    if(messages) {
      setMessagesState(prevState => {
          const newArr = [...prevState, ...messages];
          return newArr.sort((a, b) =>
          dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix());
      });
    }
  }, [messages]);

  const progress = (<Box sx={{ width: '100%' }}>
    <LinearProgress />
  </Box>);




  return fetchLoading ? progress : (
    <>
      <Grid container direction="column" gap={2}>
        <Grid item>
          <Grid item>
            <Typography variant="h4" sx={{mb: 2}}>Messages</Typography>
          </Grid>
          <Grid item>
            <MessageForm onSubmit={onFormSubmit} Loading={createLoading}/>
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="column" gap={1} sx={{mt: 3}}>
        {messagesState.map(item => (
          <MessageItem key={item.id} item={item} />
        ))}
      </Grid>
    </>
  );
};

export default Messages;
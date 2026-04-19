import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';

import { selectFeed, fetchFeeds } from '../../slices/feedsSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const { isFeedLoading, orders: feeds } = useSelector(selectFeed);
  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (isFeedLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={feeds} handleGetFeeds={() => dispatch(fetchFeeds())} />
  );
};

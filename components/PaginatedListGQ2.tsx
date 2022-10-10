import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Box, Pagination, Typography } from '@mui/material';
import DashboardCardList from './DashboardCardList';
// import { APP_CONFIGS } from 'constants';
import { APP_CONFIGS } from '../constants';

type TPaginatedListGQ = {
  query: any;
  variables?: any;
  baseRoute: string;
  subtitle: string;
  title: string;
  getCardContent: {};
  renderActions?: JSX.Element;
};

const wrapperStyle = {
  alignItems: { md: 'center' },
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  justifyContent: { md: 'space-between' },
  mt: 3,
};

/**
 * Component for a paginated list
 */
export default function PaginatedListGQ({
  query,
  variables,
  baseRoute,
  subtitle,
  title,
  renderActions,
  getCardContent,
}: TPaginatedListGQ) {
  const pageSize = APP_CONFIGS.PAGE_SIZE;
  const [currentPage, setCurrentPage] = useState(1);
  // const [currentPageCount, setCurrentPageCount] = useState(2); //Unknown End
  const [items, setItems] = useState([]);
  const [first, setFirst] = useState(pageSize);
  const [skip, setSkip] = useState(0);

  //TODO: Use Order
  const [orderBy, setOrderBy] = useState({ createdAt: 'desc' });

  //TODO: Maybe handle the 'loading' state
  const { data, loading, error } = useQuery(query, {
    variables: { ...variables, first, skip },
  });

  useEffect(() => {
    if (error) console.error('PaginatedListGQ() query failed', { data, error });
    else console.log('PaginatedListGQ() query ', data, data?.souls);
    setItems(data?.souls);
  }, [data, error]);

  function pageChanged(page: number) {
    // console.log('Set Page', page);
    setSkip(page == 1 ? 0 : (page - 1) * pageSize);
    data && setCurrentPage(page);
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h1" gutterBottom>{title}</Typography>
          <Typography variant="subtitle1">{subtitle}</Typography>
        </Box>
        {!!renderActions && renderActions}
      </Box>
      <DashboardCardList
        loading={loading}
        baseRoute={baseRoute}
        dataAccessor={getCardContent}
        data={items}
      />
      <Box sx={wrapperStyle}>
        <Pagination
          color="primary"
          count={items?.length < first ? currentPage : currentPage + 1}
          onChange={(_, page) => pageChanged(page)}
          page={currentPage}
          sx={{ mt: { xs: 2, md: 0 } }}
        />
      </Box>
    </>
  );
}

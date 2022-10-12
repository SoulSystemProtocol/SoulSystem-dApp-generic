import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Box, Grid, Pagination, Typography } from '@mui/material';
import { APP_CONFIGS } from '../constants';
import Loader from './Loader';
import DashboardCard from './DashboardCard';

type TPaginatedList = {
  query: any;
  variables?: any;
  baseRoute: string;
  subtitle: string;
  title: string;
  getCardContent: (dataItem: any) => any;
  renderActions?: JSX.Element;
  entityName?: string;
  gridMD?: number;
  gridLG?: number;
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
export default function PaginatedList({
  query,
  variables,
  baseRoute,
  subtitle,
  title,
  renderActions,
  getCardContent,
  entityName = 'souls',
  gridMD = 6,
  gridLG = 6,
}: TPaginatedList) {
  const pageSize = APP_CONFIGS.PAGE_SIZE;
  const [currentPage, setCurrentPage] = useState(1);
  // const [currentPageCount, setCurrentPageCount] = useState(2); //Unknown End
  const [items, setItems] = useState<Array<any>>([]);
  const [first] = useState<number>(pageSize);
  const [skip, setSkip] = useState<number>(0);

  //TODO: Use Order
  const [orderBy, setOrderBy] = useState({ createdAt: 'desc' });

  const { data, loading, error } = useQuery(query, {
    variables: { ...variables, first, skip },
  });

  useEffect(() => {
    if (error) console.error('PaginatedList() query failed', { data, error });
    // else
    //   console.log('PaginatedList() query ', {
    //     data,
    //     entityName,
    //     entities: data?.[entityName],
    //   });
    setItems(data ? data?.[entityName] : []);
  }, [data, error]);

  function pageChanged(page: number) {
    // console.log('Set Page', page);
    setSkip(page == 1 ? 0 : (page - 1) * pageSize);
    data && setCurrentPage(page);
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {(title || subtitle) && (
          <Box>
            {title && (
              <Typography variant="h1" gutterBottom>
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="subtitle1">{subtitle}</Typography>
            )}
          </Box>
        )}
        {!!renderActions && renderActions}
      </Box>
      {loading ? (
        <Loader />
      ) : (
        <Grid container spacing={2}>
          {!items?.length ? (
            <Grid item xs={12}>
              <Typography>No Results</Typography>
            </Grid>
          ) : (
            <>
              {items.map((dataItem: any, index: number) => {
                const cardData = getCardContent(dataItem);
                return (
                  <Grid key={index} item xs={12} md={gridMD} lg={gridLG}>
                    <DashboardCard baseRoute={baseRoute} data={cardData} />
                  </Grid>
                );
              })}
            </>
          )}
        </Grid>
      )}
      <Box sx={wrapperStyle}>
        {items?.length > first && (
          <Pagination
            color="primary"
            count={items?.length < first ? currentPage : currentPage + 1}
            onChange={(_, page) => pageChanged(page)}
            page={currentPage}
            sx={{ mt: { xs: 2, md: 0 } }}
          />
        )}
      </Box>
    </>
  );
}

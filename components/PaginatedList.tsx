import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Box, Grid, Pagination, Typography } from '@mui/material';
import { APP_CONFIGS } from '../constants/app';
import { CardItem } from 'utils/cardContents';
import GridCard from './GridCard';
import GridCardTask from './GridCardTask';
import GridCardUser from './GridCardUser';
import Loader from './Loader';
import { NO_RESULTS } from 'constants/texts';

type TPaginatedList = {
  query: any;
  variables?: any;
  subtitle?: string;
  title?: string;
  getCardContent: (dataItem: any) => CardItem;
  itemsProcessing?: (items: any[]) => CardItem[];
  renderActions?: JSX.Element;
  entityName?: string;
  gridSM?: number;
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
 * Paginated list by GQL Query
 */
export default function PaginatedList({
  query,
  variables,
  subtitle,
  title,
  renderActions,
  getCardContent = (item) => item,
  itemsProcessing = (items): CardItem[] => items,
  entityName = 'souls',
  gridSM = 12,
  gridMD = 6,
  gridLG = 4,
}: TPaginatedList) {
  const pageSize = APP_CONFIGS.PAGE_SIZE;
  const [currentPage, setCurrentPage] = useState(1);
  // const [currentPageCount, setCurrentPageCount] = useState(2); //Unknown End
  const [items, setItems] = useState<Array<CardItem>>([]);
  const [first] = useState<number>(pageSize);
  const [skip, setSkip] = useState<number>(0);
  //TODO: Use Order
  const [orderBy, setOrderBy] = useState({ createdAt: 'desc' });
  const { data, loading, error } = useQuery(query, {
    variables: { ...variables, first, skip },
  });

  useEffect(() => {
    if (error) {
      console.error('PaginatedList() query failed', { data, error, variables });
      setItems([]);
    } else {
      //Validate
      if (data && !data.hasOwnProperty(entityName))
        console.error("Query Result doesn't have requested entity name", {
          entityName,
          data,
        });
      //Extract Items
      let items = data ? data?.[entityName] : [];
      //Process Items & Set
      setItems(itemsProcessing(items));
    }
  }, [data, error]);

  function pageChanged(page: number) {
    // console.log('[WIP] Set Page', page);
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
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
        )}
        {!!renderActions && (
          <Box sx={{ whiteSpace: 'nowrap' }}>{renderActions}</Box>
        )}
      </Box>
      {loading ? (
        <Loader />
      ) : (
        <Grid container spacing={2}>
          {!items?.length ? (
            <Grid item xs={12}>
              <Typography variant="caption" color="text.secondary">
                {NO_RESULTS}
              </Typography>
            </Grid>
          ) : (
            <>
              {items.map((dataItem: any, index: number) => {
                const cardData: CardItem = getCardContent(dataItem);
                return (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    sm={gridSM}
                    md={gridMD}
                    lg={gridLG}
                  >
                    {cardData?.component == 'GridCardUser' ? (
                      <GridCardUser {...cardData} />
                    ) : cardData?.component == 'GridCardTask' ? (
                      <GridCardTask {...cardData} />
                    ) : (
                      <GridCard {...cardData} />
                    )}
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
            onChange={(_: any, page: number) => pageChanged(page)}
            page={currentPage}
            sx={{ mt: { xs: 2, md: 0 } }}
          />
        )}
      </Box>
    </>
  );
}

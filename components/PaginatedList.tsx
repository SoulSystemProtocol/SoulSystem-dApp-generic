/**
 * Component for a paginated list
 */
import { useState } from 'react';
import { Box, Pagination, Typography } from '@mui/material';
import DashboardCardList from './DashboardCardList';

type TPaginatedList = {
  baseRoute: string;
  data: any;
  loadData: any;
  subtitle: string;
  title: string;
  renderActions: any | undefined;
  getCardContent: any;
};

const wrapperStyle = {
  alignItems: { md: 'center' },
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  justifyContent: { md: 'space-between' },
  mt: 3,
};

export default function PaginatedList({
  baseRoute,
  data,
  loadData,
  subtitle,
  title,
  renderActions,
  getCardContent,
}: TPaginatedList) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageCount, setCurrentPageCount] = useState(1); // TODO: update pagination

  function loadWithPagination(page: number) {
    loadData(page);

    if (data) {
      setCurrentPage(page);
    }
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="subtitle1">{subtitle}</Typography>
        </Box>
        {!!renderActions && renderActions}
      </Box>
      <DashboardCardList
        baseRoute={baseRoute}
        dataAccessor={getCardContent}
        data={data}
      />
      <Box sx={wrapperStyle}>
        <Pagination
          color="primary"
          count={currentPageCount}
          onChange={(_, page) => loadWithPagination(page)}
          page={currentPage}
          sx={{ mt: { xs: 2, md: 0 } }}
        />
      </Box>
    </>
  );
}

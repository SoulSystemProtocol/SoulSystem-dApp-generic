import { DataObjectOutlined } from '@mui/icons-material';
import { Box } from '@mui/system';
import {
  DataGrid,
  GridActionsCellItem,
  GridRowParams,
  GridToolbar,
} from '@mui/x-data-grid';
import JsonViewDialog from 'components/json/JsonViewDialog';
import { DialogContext, TDialogContext } from 'contexts/dialog';
import useAction from 'hooks/useAction';
import useError from 'hooks/useError';
import { capitalize } from 'lodash';
import { useContext, useEffect, useState } from 'react';

/**
 * Component: a table with actions.
 */
export default function ActionTable({ sx }: any): JSX.Element {
  // eslint-disable-next-line prettier/prettier
  const { showDialog, closeDialog }: Partial<TDialogContext> =
    useContext(DialogContext);
  const { handleError } = useError();
  const { getActions } = useAction();
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState<Array<any>>([]);

  const columns = [
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      width: 60,
      getActions: (params: GridRowParams) => {
        // console.log('[DEBUG] params', params);
        return [
          // <GridActionsCellItem
          //   key="viewJson"
          //   icon={<DataObjectOutlined />}
          //   label="View as JSON"
          //   title="View as JSON"
          //   onClick={() =>
          //     showDialog?.(
          //       <JsonViewDialog json={params.row} onClose={closeDialog} />,
          //     )
          //   }
          // />,
        ];
      },
    },
    {
      field: 'guid',
      headerName: 'GUID (ID)',
      width: 150,
      valueGetter: (params: any) => `${params.row.id}`,
    },
    {
      field: 'subject',
      headerName: 'Acted',
      width: 200,
      valueGetter: (params: any) => `${capitalize(params.row.subject) || ''}`,
    },
    {
      field: 'verb',
      headerName: 'Verb',
      width: 200,
      valueGetter: (params: any) => `${capitalize(params.row.verb) || ''}`,
    },
    {
      field: 'object',
      headerName: 'Object',
      width: 200,
      valueGetter: (params: any) => `${capitalize(params.row.object) || ''}`,
    },
  ];

  async function loadData() {
    try {
      setRows([]);
      setIsLoading(true);
      let actions = await getActions();
      actions = actions.sort((a, b) =>
        a.action?.subject?.localeCompare(b.action?.subject),
      );
      setRows(actions);
    } catch (error: any) {
      handleError(error, true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ height: 800, ...sx }}>
      <DataGrid
        loading={isLoading}
        rows={rows}
        columns={columns}
        pageSize={50}
        rowsPerPageOptions={[50]}
        rowHeight={84}
        getRowId={(row: any) => row.id}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </Box>
  );
}

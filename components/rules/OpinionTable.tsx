import { BlockOutlined, DataObjectOutlined } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import { DialogContext, TDialogContext } from 'contexts/dialog';
import useAction from 'hooks/useAction';
import useError from 'hooks/useError';
import useSubgraph from 'hooks/useSubgraph';
import { capitalize } from 'lodash';
import { useContext, useEffect, useState } from 'react';
import { formatActionName } from 'utils/converters';
import RuleDisableDialog from './RuleDisableDialog';
import JsonViewDialog from 'components/json/JsonViewDialog';
import { SelectedSoulContext } from 'contexts/SelectedSoul';

/**
 * Soul's Opinions in Table Display
 */
export default function OpinionTable({ item, sx }: any) {
  // eslint-disable-next-line prettier/prettier
  const { showDialog, closeDialog }: Partial<TDialogContext> =
    useContext(DialogContext);
  const { handleError } = useError();
  const { getActions } = useAction();
  const { getGameRules } = useSubgraph();
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState<Array<any>>([]);
  const { soul } = useContext(SelectedSoulContext);

  const columns = [
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      width: 100,
      // getActions: (params: any) => {
      //   const viewAsJsonAction = (
      //     <GridActionsCellItem
      //       key="viewJson"
      //       icon={<DataObjectOutlined />}
      //       label="View as JSON"
      //       title="View as JSON"
      //       onClick={() =>
      //         showDialog?.(
      //           <JsonViewDialog json={params.row} onClose={closeDialog} />,
      //         )
      //       }
      //     />
      //   );
      //   const disableAction = (
      //     <GridActionsCellItem
      //       key="disable"
      //       icon={<BlockOutlined />}
      //       label="Mark as Obsolete"
      //       title="Mark as Obsolete"
      //       onClick={() =>
      //         showDialog?.(
      //           <RuleDisableDialog
      //             item={item}
      //             rule={params.row.rule}
      //             onClose={closeDialog}
      //           />,
      //         )
      //       }
      //     />
      //   );
      //   return [
      //     viewAsJsonAction,
      //     ...(params.row.rule.isDisabled ? [] : [disableAction]),
      //   ];
      // },
    },
    {
      field: 'id',
      headerName: 'ID',
      width: 60,
      valueGetter: (params: any) => `${params.row.rule.ruleId}`,
    },
    {
      field: 'disabled',
      headerName: 'Obsolete',
      width: 100,
      valueGetter: (params: any) => (params.row.rule.isDisabled ? 'Yes' : 'No'),
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 320,
      valueGetter: (params: any) => `${params.row.action.id}`,
      renderCell: (params: any) => (
        <Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography>{formatActionName(params.row.action)}</Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {params.row.action.id}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'name',
      headerName: 'Name to display',
      width: 320,
      valueGetter: (params: any) =>
        `${params.row.rule.rule?.metadata?.name || ''}`,
    },
    {
      field: 'description',
      headerName: 'Description to display',
      width: 320,
      valueGetter: (params: any) =>
        `${params.row.rule.rule?.metadata?.description || ''}`,
    },
    {
      field: 'icon',
      headerName: 'Icon to display',
      width: 120,
      valueGetter: (params: any) =>
        `${params.row.rule.rule?.metadata?.icon || ''}`,
      renderCell: (params: any) => '[RuleIcon]',
    },
    {
      field: 'evidenceDescription',
      headerName: 'Evidence description',
      width: 320,
      valueGetter: (params: any) =>
        `${params.row.rule.rule?.metadata?.evidenceDescription || ''}`,
    },
    {
      field: 'affected',
      headerName: 'Affected',
      width: 200,
      valueGetter: (params: any) => `${params.row.rule.rule.affected || ''}`,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 140,
      valueGetter: (params: any) =>
        params.row.rule.isPositive ? 'positive' : 'negative',
      renderCell: (params: any) => {
        if (params.row.rule.isPositive) {
          return (
            <Typography sx={{ color: 'success.main' }}>Positive</Typography>
          );
        } else {
          return (
            <Typography sx={{ color: 'danger.main' }}>Negative</Typography>
          );
        }
      },
    },
    {
      field: 'effects',
      headerName: 'Effects',
      width: 360,
      valueGetter: (params: any) => JSON.stringify(params.row.rule.effects),
      renderCell: (params: any) => (
        <Stack>
          {params.row.rule.effects.map((effect: any, index: number) => {
            return (
              <Stack key={index} direction="row" spacing={2}>
                <Typography variant="body2">
                  {capitalize(effect.name)}
                </Typography>
                <Typography variant="body2">|</Typography>
                {effect.direction ? (
                  <Typography variant="body2" sx={{ color: 'success.main' }}>
                    Is Positive
                  </Typography>
                ) : (
                  <Typography variant="body2" sx={{ color: 'danger.main' }}>
                    Is Negative
                  </Typography>
                )}
                <Typography variant="body2">|</Typography>
                <Typography variant="body2">Value: {effect.value}</Typography>
              </Stack>
            );
          })}
        </Stack>
      ),
    },
    {
      field: 'evidence',
      headerName: 'Evidence required',
      width: 160,
      valueGetter: (params: any) =>
        `${params.row.rule.confirmation.evidence.toString() || ''}`,
    },
    {
      field: 'witness',
      headerName: 'Witnesses required',
      width: 180,
      valueGetter: (params: any) =>
        `${params.row.rule.confirmation.witness || ''}`,
    },
  ];

  async function loadData() {
    try {
      setRows([]);
      setIsLoading(true);
      const rows = [];
      
      const rules = await getGameRules([], item.id);

      // const actionGuids = new Set();
      const actionGuids = new Array();
      for (const rule of rules) {
        // actionGuids.add(rule.rule.about);
        actionGuids.push(rule.rule.about);
      }
      const actions = await getActions(Array.from(actionGuids));
      for (const rule of rules) {
        const action = actions.find((action) => action.id === rule.rule.about);
        rows.push({ action: action, rule: rule });
      }
      setRows(rows);
    } catch (error: any) {
      handleError(error, true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (item) loadData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  return (
    <Box sx={{ height: 800, ...sx }}>
      <DataGrid
        loading={isLoading}
        rows={rows}
        columns={columns}
        pageSize={50}
        rowsPerPageOptions={[50]}
        rowHeight={84}
        getRowId={(row: any) => row.rule.id}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </Box>
  );
}

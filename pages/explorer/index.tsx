// import axios from 'axios';
import { Contract, ethers } from 'ethers';
import { useContext, useEffect, useState } from 'react';
import { Web3Context } from 'contexts/web3';
import { Autocomplete, Box, Button, List, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
// import { DialogContext } from 'contexts/dialog';
// import { DataContext } from 'contexts/data';
import { getPageTitle } from '../../utils';
// import ProjectManageDialog from 'components/project/ProjectManageDialog';
import Layout from 'components/layout/Layout';
// import { MuiForm5 as Form } from '@rjsf/material-ui';
// import { LoadingButton } from '@mui/lab';
// import DAOListGQ from 'components/soul/DAOListGQ';
// import { hexStringToJson } from 'utils/converters';
// import { resolveLink } from 'utils/metadata';
// import { Save } from '@mui/icons-material';
import useContractEvents from 'hooks/useContractEvents';

const CONF = {
  PAGE_TITLE: 'Projects',
  TITLE: 'Projects',
  SUBTITLE: `Projects are companies and organizations that need some work done.`,
};


/**
 * Page for a list of projects
 */
export default function EventExplorer({}) {
  const { provider } = useContext(Web3Context);
  const { chainHelper, contracts, contractAddr, abi, extractEvents, setContractAddr } = useContractEvents();
  const [curEvent, setCurEvent] = useState(null);
  const [curEvents, setCurEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [displayAdd, setDisplayAdd] = useState(false);
  


  /**
   * Get All Contract's Events
   */
  const getEvents = async () => {
    // let contractAddress = "0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413";  //Mainnet DAI
    // let contractAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'; //USDC (Proxy ABI -- Missing Transfer Event in ABI... :o )
    // let contractAddress = process.env.NEXT_PUBLIC_HUB_CONTRACT_ADDRESS; //Hub
    let contractAddress = contractAddr;
    //Validate
    if(!contractAddress || !abi) return;
    if(abi == 'Contract source code not verified') throw new Error(`${abi} for contract: ${contractAddress}`);
    if(abi == 'Max rate limit reached, please use API Key for higher rate limit') throw new Error(`Rate Limit`);
    if(curEvent === null) return [];

    // console.log("ABI", abi);
    console.log("ABI Events", extractEvents(abi));
    //Contract instance      
    const contract = new Contract(contractAddress, abi, provider);

    // const blockNumber = 15424102;
    // const blockNumber = null;
    // let filter = contract.filters.Transfer("0xF791da446D04282f921f38FBF954aD5cAee899a3");
    // let filter = contract.filters.ContractCreated(null);
    // let filter = "ContractCreated";
    let filter = curEvent.name;
    // let filter = contract.filters.Initialized();
    // 0: {indexed: false, internalType: 'string', name: 'name', type: 'string'}
    // 1: {indexed: true, internalType: 'address', name: 'contractAddress', type: 'address'}
    // console.warn("Event filter:", filter);

    let latestBlock = provider.getBlockNumber();//.then((res) => console.log("Block Number", res));
    // let fromBlock = latestBlock-1000;
    let fromBlock = 27534049;

    // let eventCount = await contract.listenerCount("Initialized");
    // let eventCount = await contract.listenerCount(filter, fromBlock);
    // console.warn("event Count:", eventCount);

    //Get Events
    let events = await contract.queryFilter(filter, fromBlock).catch((error) => console.error("[CAUGHT] queryFilter ", error));
    console.log("Found "+events.length+" Events: ", events);
    setSelectedEvents(events);
    for(let event of events) console.warn("Event: ", event);
    console.warn("Events DONE");


    /* Event Listener (Triggers)
    contract.on("Transfer", (from, to, amount) => {
        console.log("on Transfer Event", {from, to, amount});
    });
    */

  }

  const buttonClick = () => {
    //Get Events
    getEvents();
    // isProxy().then((isContractProxy) => console.log("isProxy:", isContractProxy));
    // console.log("isProxy", isProxy);
    console.log("buttonClick() DONE");
  }

  useEffect(() => {
    // console.log("ABI Changed", abi);
    let events = abi ? extractEvents(abi) : [];
    // console.log("Setting Current Events for Contract", {events, abi});
    setCurEvents(events);
  }, [abi]);

  useEffect(() => {
    //Get Events
    getEvents();
  }, [curEvent]);

  /**
   * Handle Contract Select Change
   */
  async function handleContractChange(event: any) {
    let value = event.target.value;
    if(value == 'other'){
      // setDisplayAdd(true);
    }else{
      // setDisplayAdd(false);
      setContractAddr(value);
      setCurEvent(null);
    }
  };

  /**
   * Handle Contract Select Change
   */
  async function handleContractEventChange(event: any) {
    // console.log("Current Conttract Event Chagned to :", event.target.value);
    let newCurEvent = curEvents.find((curEvent) => curEvent.name == event.target.value);
    console.warn("Setting Current Event", newCurEvent);
    setCurEvent(newCurEvent);
    // setCurEvent(event.target.value);
  };

  return (
    <Layout title={getPageTitle(CONF.PAGE_TITLE)}>
      <Typography variant='h1'>Event Explorer</Typography>
      <Typography variant='subtitle1'>(Sight)</Typography>
      
      <Stack direction='row' spacing={2} sx={{my:2}}>
      
        <TextField
          id="outlined-select-contract"
          select
          // label={"Select Contract"}
          label={contracts.length > 0 ? "Select Contract" : "No Contracts For Chain"}
          value={contractAddr}
          onChange={handleContractChange}
          // helperText="Select contract"
        >
          {contracts.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          {/* <MenuItem key='other' value='other'>Other</MenuItem> */}
        </TextField>

        <Autocomplete
          disablePortal
          id="autocomplete"
          options={contracts}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Contract" />}
          onChange={handleContractChange}
          freeSolo
        />

        <TextField
          id="outlined-select-event"
          select
          label="Select Event"
          value={curEvent?.name || ''}
          onChange={handleContractEventChange}
          // helperText="Select event"
        >
          {curEvents.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        {(!!curEvent && !!contractAddr) && 
          <Button variant="outlined" onClick={() => {
            //Validate
            if(!!curEvent && !!contractAddr){
              console.log("[TODO] Subscribe to", {curEvent, contractAddr});
            }
            else console.error("Contract Event Not Selected", {event:curEvent.name, contractAddr});
          }}>Subscribe</Button>
        }
        <Button variant="outlined" onClick={() => setDisplayAdd(true)}>Add</Button>

      </Stack>

      <Box>
        {displayAdd && 
          <ContractAdd 
            onSubmit={(item: any) => console.log("Submit ContractAdd", item)} 
            close={() => setDisplayAdd(false)}
          />
        }
      </Box>

      {/* <Typography variant='h5'>Events</Typography> */}
      {/* <Stack>
          {curEvents.map((contractEvent) => <Box>
            
            <Typography key={contractEvent?.name} variant="body1">
              {contractEvent?.name}
            </Typography>

            <Stack direction="row" spacing={2}>
              {contractEvent?.inputs.map((eventInput) => 
                <Typography key={eventInput.name} variant="subtitle2">
                  {eventInput?.name} ({eventInput?.type})
                  {eventInput?.indexed && <>[i]</>}
                </Typography>
              )}
            </Stack>
          </Box>)}
      </Stack> */}
      
      <DisplayEvents items={selectedEvents} eventsData={curEvent} />

      <Box>
        <Button onClick={buttonClick} variant="outlined">Test Button</Button>
      </Box>

    </Layout>
  );
}

/**
 * Component: Get All Hub Events
 */
function DisplayEvents({ items, eventsData }): JSX.Element {
  // const { accountSoul } = useContext(DataContext);
  console.log("DisplayEvents", {items, eventsData});
  if(items.length == 0) return <>No Events</>;

  // const columns: GridColDef[] = [
  //   { field: 'col1', headerName: 'Column 1', width: 150 },
  //   { field: 'col2', headerName: 'Column 2', width: 150 },
  // ];
  const columns: GridColDef[] = eventsData?.inputs.map((eventField, id: number) => { return {id, field: eventField.name, headerName: eventField.name, width: '150'}; });

  // const rows: GridRowsProp = [
  //   { id: 1, col1: 'Hello', col2: 'World' },
  //   { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  //   { id: 3, col1: 'MUI', col2: 'is Amazing' },
  // ];
  const rows: GridRowsProp = items.map((eventData, index: number) => { 
    let data: any = { id: index };
    for(let column of columns) data[column.field] = eventData.args[column.field];
    // console.log("Processed Field:", {data, eventData, columns});
    return data;
  });
  
  return (
    <Box sx={{ height: 400, width: '100%' }}>
     <Typography variant='h5'>Events:</Typography>
      {(rows.length > 0 && columns.length > 0) && 
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />}
    </Box>
  );
}




/**
 * Component: Add Contract to List
 */
function ContractAdd({ onSubmit, close }): JSX.Element {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  // function onSubmit(event){
    // onSubmit()
  // }

  return (<>
    <Stack direction='row' spacing={2} sx={{my:2}}>

      <TextField
        id="outlined-text-address"
        variant="outlined"
        onChange={(event) => setAddress(event.target.value)}
        label="Address"
        name='address'
        value={address}
        required
      />

      <TextField
        id="outlined-text-name"
        variant="outlined"
        onChange={(event) => setName(event.target.value)}
        label="Name"
        name='name'
        value={name}
        required
      />
      
      <Button onClick={(event) => onSubmit({name, address})} variant="outlined">Add</Button>
      <Button onClick={close} variant="outlined">Cancel</Button>

      </Stack>

  </>);
}
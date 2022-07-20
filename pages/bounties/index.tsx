/**
 * Page for a list of bounties
 */
import * as React from 'react';
import { Box } from "@mui/material";
import Layout from "../../components/layout/Layout";

import type { TBountiesProps } from './bounties.types';

export default function BountiesPage({}: TBountiesProps) {
  return (
    <Layout>
      <Box>Bounties</Box>
    </Layout>
  )
}
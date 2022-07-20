/**
 * Page for a list of mDAOs
 */
import * as React from 'react';
import { Box } from "@mui/material";
import Layout from "../../components/layout/Layout";

import type { TDaosProps } from './daos.types';

export default function DaosPage({}: TDaosProps) {
  return (
    <Layout>
      <Box>Daos</Box>
    </Layout>
  )
}
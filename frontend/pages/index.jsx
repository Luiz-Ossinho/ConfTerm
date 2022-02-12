import SpeciesManagement from "../components/Species/SpeciesManagement";
import HousingsManagement from "../components/Housings/HousingsManagement";
import { Stack, Paper, Typography, CircularProgress } from "@mui/material"
import Image from 'next/image'
import React from "react";
import Maybe from '../components/Maybe';
import useAuthentication from '../lib/hooks/useAuthentication'
import useShowExtra from '../lib/hooks/useShowExtra'
import AnimalProductionsSideContent from "../components/AnimalProductions/AnimalProductionsSideContent";

export default function Home() {
  useShowExtra(true);
  const { currentUser, isAuthenticated } = useAuthentication();

  function Content() {
    if (!isAuthenticated) return <CircularProgress />

    return (<>
      <Maybe test={currentUser.IsAdmin}>
        <SpeciesManagement />
      </Maybe>
      <HousingsManagement />
    </>);
  }

  function Header() {

    return (<Stack direction="row" gap={1}>
      <Paper sx={{ padding: 1 }}>
        <Stack direction="row" gap={1}>
          <Image src="/LogoText.svg" height={70} width={70} />
          <Image src="/CowIcon.svg" height={100} width={100} />
        </Stack>
      </Paper>
      <Stack direction="column" justifyContent='center'>
        <Typography component='div' style={{
          fontWeight: 500
        }} alignItems='center'>Sistema de monitoramento <br /> de conforto termico</Typography>
      </Stack>
    </Stack>);
  }

  return (
    <Stack direction="column" gap={3} alignItems="center" >
      <Header />
      <Content />
    </Stack>
  )
};
import React from 'react';
import useShowExtra from '../../lib/hooks/useShowExtra'
import { useRouter } from 'next/router'
import SpeciesContent from '../../components/Species/SpeciesContent'

export default function SpeciesById() {
  useShowExtra(false);
  const router = useRouter();
  const { SpeciesId } = router.query

  return (<>
    <SpeciesContent SpeciesId={parseInt(SpeciesId)} />
  </>)
};
import useSpecies from '../../lib/hooks/useSpecies'
import { Stack, Paper, CircularProgress, Typography } from '@mui/material'
import ManagementListingItem from '../Management/ManagementListingItem';

export default function SpeciesListing({ filter }) {
    const { species, isLoading } = useSpecies();

    if (isLoading) return (<Paper sx={{ padding: 1 }} style={{ width: '80%' }}>
        <Stack direction="row" gap={1} alignItems='center' justifyContent='center'>
            <CircularProgress />
        </Stack>
    </Paper>);

    if (species.length === 0) return (<Paper sx={{ padding: 1 }} style={{ width: '80%' }}>
        <Stack direction="row" gap={1} alignItems='center' justifyContent='center'>
            <Typography variant="subtitle1" component="div">
                Adicione novas especies.
            </Typography>
        </Stack>
    </Paper>);

    const filteredSpecies = filter ? species.filter(entity => entity.Name.toUpperCase().includes(filter.toUpperCase())) : species;

    return (<>
        {filteredSpecies.map((entity, index) => {
            const options = {
                subtitle: "Animal em monitoramento",
                entity,
                routeTemplate: "/species/{Id}"
            }

            return <ManagementListingItem key={index} options={options} />
        })}
    </>)
}
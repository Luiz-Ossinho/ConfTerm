import useHousings from '../../lib/hooks/useHousings';
import { Stack, Paper, CircularProgress, Typography } from '@mui/material'
import ManagementListingItem from '../Management/ManagementListingItem';

export default function HousingsListing({ filter }) {
    const { housings, isLoading } = useHousings();

    if (isLoading) return (<Paper sx={{ padding: 1 }} style={{ width: '80%' }}>
        <Stack direction="row" gap={1} alignItems='center' justifyContent='center'>
            <CircularProgress />
        </Stack>
    </Paper>);

    if (housings.length === 0) return (<Paper sx={{ padding: 1 }} style={{ width: '80%' }}>
        <Stack direction="row" gap={1} alignItems='center' justifyContent='center'>
            <Typography variant="subtitle1" component="div">
                Adicione novos alojamentos.
            </Typography>
        </Stack>
    </Paper>);


    const filteredHousings = filter ? housings.filter(entity => entity.Name.toUpperCase().includes(filter.toUpperCase())) : housings;

    return (<>
        {filteredHousings.map((entity, index) => {
            const options = {
                subtitle: "Alojamento em monitoramento",
                entity,
                routeTemplate: "/housings/{Id}"
            }

            return <ManagementListingItem key={index} options={options} />
        })}
    </>)
}
import { Paper, Stack, Divider, Typography, CircularProgress } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, CartesianAxis, ReferenceArea } from 'recharts';
import React from 'react';
import { ConfortLevel } from '../../lib/utils';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { DateTime } from 'luxon'

export default function AnimalProductionCard({ animalProduction }) {
    const [recentMeasurements, setRecentMeasurements] = React.useState([]);
    const [isFetching, setFetching] = React.useState(true);
    const [currentConfortLevel, setCurrentConfortLevel] = React.useState(-1);
    const [confortLevels, setConfortLevels] = React.useState([]);
    const [species, setSpecies] = React.useState(null);
    const [housing, setHousing] = React.useState(null);

    const now = DateTime.now();

    const xDomain = [() => now.minus({ minutes: 30 }).valueOf(), () => now.valueOf()];
    const yDomain = [() => 0, () => 100];

    function dateTickFormatter(datetimeMillis) {
        const diff = DateTime.fromMillis(datetimeMillis).diff(now, 'minutes');

        return `${diff.minutes}m`
    };

    React.useEffect(() => {
        let isSubscribed = true;
        setFetching(true);

        async function fetchData() {
            const measurements = await animalProduction.fecthMeasurements();
            const fetchedSpecies = await animalProduction.fetchSpecies();
            const fetchedHousing = await animalProduction.fetchHousing();

            const setMeasurmentsSubscription = () => {
                setSpecies(fetchedSpecies);
                setHousing(fetchedHousing);
                setRecentMeasurements(measurements);
                setFetching(false);
            }

            if (measurements.length !== 0) {
                const confortLevels = await animalProduction.fetchConfortLevel();

                if (confortLevels.length === 0) {

                    return () => {
                        setConfortLevels(confortLevels);
                        setMeasurmentsSubscription();
                    }
                }

                const avarageTHI = measurements.reduce((accumulator, currentvalue, index, numArray) => (accumulator + currentvalue.THI / numArray.length), 0);

                const mostRecentConfortLevel = confortLevels.filter(cl => avarageTHI > cl.MinimalTHI && avarageTHI < cl.MaximumTHI)[0]

                return () => {
                    setConfortLevels(confortLevels);
                    setCurrentConfortLevel(mostRecentConfortLevel.ConfortLevel);
                    setMeasurmentsSubscription();
                }
            }

            return () => {
                setMeasurmentsSubscription();
            }
        }

        fetchData().then(setStates => {
            if (isSubscribed)
                setStates();
        });

        return () => isSubscribed = false;
    }, [animalProduction]);

    function RecentChart() {
        if (isFetching) {
            return (<div style={{ width: '100%', height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </div>)
        }

        function ReferenceAreas() {
            return confortLevels.map((cl, index) => {
                const color = ConfortLevel.GetLevelFromValue(cl.ConfortLevel).color;

                return <ReferenceArea key={index} y1={cl.MinimalTHI} y2={cl.MaximumTHI} strokeOpacity={0.3} stroke={color} />
            });
        }

        const measurementData = recentMeasurements.map(m => { return { date: m.Date.valueOf(), THI: m.THI }; })


        return (<LineChart width={300} height={200} data={measurementData}>
            <Line type="basis" dataKey="THI" stroke="#8884d8" />
            <YAxis dataKey='THI' domain={yDomain} />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number"
                tickFormatter={dateTickFormatter}
                domain={xDomain}
                dataKey="date"
                interval='preserveStartEnd'
            />

            {ReferenceAreas()}
        </LineChart >);
    }

    function AdditionalInfo() {
        if (isFetching) return null;

        function ThermostatLevel() {
            const confortLevel = ConfortLevel.GetLevelFromValue(currentConfortLevel);

            if (confortLevel)
                return (<Stack direction='row' gap={0} justifyContent='center' alignItems='center'>
                    <ThermostatIcon sx={{ color: confortLevel.color }} />
                    {confortLevel.text}
                </Stack>);

            if (recentMeasurements.length === 0)
                return (<Stack direction='row' gap={0} justifyContent='center' alignItems='center'>
                    <ThermostatIcon sx={{ color: "#AEAEAE" }} />
                    Nenhuma leitura recente
                </Stack>);

            if (confortLevels.length === 0)
                return (<Stack direction='row' gap={0} justifyContent='center' alignItems='center'>
                    <ThermostatIcon sx={{ color: "#AEAEAE" }} />
                    Nenhum nivel de conforto registrado
                </Stack>);
        }

        return (<>
            <ThermostatLevel />
            Alojamento: {housing.Name} <br />
            Especie: {species.Name}
            {animalProduction.Equipament ? (<><br /> Equipamento: {animalProduction.Equipament}</>) : <></>}
        </>);
    }

    return (<Paper sx={{ padding: 1 }} style={{ width: '100%', height: '100%' }}>
        <Stack direction='column' gap={1} justifyContent='center' alignItems='center'>
            <Typography variant="h6" component="div">
                Produçao {animalProduction.Id}
            </Typography>
            <Divider variant="middle" flexItem />
            <RecentChart />
            <Divider variant="middle" flexItem />
            <AdditionalInfo />
        </Stack>
    </Paper>)

}
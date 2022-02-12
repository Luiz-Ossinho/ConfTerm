import styles from '../styles/modules/Navigator.module.css'
import LoginForm from './Login/Form';
import { Paper, List, Button, CircularProgress } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import useAuthentication from '../lib/hooks/useAuthentication'
import DashboardIcon from '@mui/icons-material/Dashboard';
import { pages } from '../lib/utils';
import ListButtonLink from './ListButtonLink';
import AssessmentIcon from '@mui/icons-material/Assessment';
import React from 'react'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material';

export default function Navigator() {
    const { currentUser, isLoading, isAuthenticated, logout } = useAuthentication();
    const [currentPage, setCurrentPage] = React.useState(null)
    const router = useRouter();
    const theme = useTheme();

    React.useEffect(() => {
        setCurrentPage(pages.getMatchingPage(router.asPath));

        if (currentPage?.requiresAuth) {
            if (!isAuthenticated) {
                router.push(pages.Login.route)
            }
        }


        if (currentPage === pages.Login) {
            if (!isLoading) {
                if (isAuthenticated) {
                    router.push(pages.Index.route)
                }
            }
        }
    }, [router, isLoading, isAuthenticated]);

    if (isLoading) {
        return <div className={styles.centered}>
            <CircularProgress />
        </div>
    }

    if (!isAuthenticated)
        return (<div className={styles.centered}>
            <LoginForm />
        </div>);

    async function onLogout() {
        await logout();
        router.push(pages.Login.route)
    }

    function UsernameCard() {
        return (<Paper className={styles.usernameCard}>
            <div className={styles.usernamePositioning}>
                <p className={styles.usernameWelcomeText}>Olá,</p>
                <p className={styles.usernameWelcome}>{currentUser.Name}</p>
            </div>
        </Paper>);
    }

    function NavigationCard() {

        function ManagementLink() {
            const options = {
                currentPageId: currentPage?.id,
                targetPageId: pages.Index.id,
                targetPageRoute: pages.Index.route,
                targetPageRouteAlias: pages.Index.route,
                Icon: <DashboardIcon sx={{ color: theme.palette.background.default }} />,
                Text: 'Gerenciamento'
            }

            return (<ListButtonLink options={options} />)
        }

        function ReportsLink() {
            const options = {
                currentPageId: currentPage?.id,
                targetPageId: pages.Reports.id,
                targetPageRoute: pages.Reports.route,
                targetPageRouteAlias: pages.Reports.route,
                Icon: <AssessmentIcon sx={{ color: theme.palette.background.default }} />,
                Text: 'Relátorios'
            }

            return (<ListButtonLink options={options} />)
        }

        return (<Paper className={styles.navigationCard}>
            <p className={styles.usernameWelcomeText}>Navegacoes</p>
            <List component="div" style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
                <ManagementLink />
                <ReportsLink />
            </List>
        </Paper>);
    }

    return (<aside className={styles.left}>
        <div className={styles.navigationContainer}>
            <div className={styles.navigation} >
                <UsernameCard />
                <NavigationCard />
            </div>
            <Button startIcon={<LogoutIcon />} onClick={onLogout} variant="contained" fullWidth sx={{
                color: theme.palette.background.default
            }}>
                Sair
            </Button>
        </div>
    </aside>);
}
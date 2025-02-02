import { ReactNode } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { PrivateMainSettingsArea, ThemesSection } from '@proton/components';
import { getSectionPath } from '@proton/components/containers/layout/helper';

import PassDownloadsSettingsPage from './pages/PassDownloadsSettingsPage';
import { getPassAppRoutes } from './routes';

const PassSettingsRouter = ({
    passAppRoutes,
    redirect,
}: {
    passAppRoutes: ReturnType<typeof getPassAppRoutes>;
    redirect: ReactNode;
}) => {
    const { path } = useRouteMatch();

    const {
        routes: { general, downloads },
    } = passAppRoutes;

    return (
        <Switch>
            <Route path={getSectionPath(path, general)}>
                <PrivateMainSettingsArea config={general}>
                    <ThemesSection />
                </PrivateMainSettingsArea>
            </Route>
            <Route path={getSectionPath(path, downloads)}>
                <PrivateMainSettingsArea config={downloads}>
                    <PassDownloadsSettingsPage />
                </PrivateMainSettingsArea>
            </Route>
            {redirect}
        </Switch>
    );
};

export default PassSettingsRouter;

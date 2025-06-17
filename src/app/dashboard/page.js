import { use } from 'react';
import { UserStatsTable } from './stats-table';
import UserClient from '@modules/users/client';
import styles from './styles.module.scss';
import { FactionPieChart } from './stats-faction';
import { ROOT_FACTIONS_MAP } from '@utils/constants';

export default function Dashboard() {
    const stats = use(UserClient.listGames());
    
  return (
    <div className={styles.page}>
        <UserStatsTable stats={stats} data={Object.keys(stats?.totalPointsByUser || {})}/>
        <FactionPieChart data={Object.keys(stats.totalGamesByFaction || {}).map(faction => {
            return {
                faction: ROOT_FACTIONS_MAP[faction],
                totalGames: stats.totalGamesByFaction[faction],
            }
        })}/>
    </div>
  );
}

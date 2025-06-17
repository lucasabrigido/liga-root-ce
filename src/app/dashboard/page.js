'use client';

import { useQuery } from '@tanstack/react-query';
import { UserStatsTable } from './stats-table';
import { FactionPieChart } from './stats-faction';
import CircularProgress from '@mui/material/CircularProgress';
import UserClient from '@modules/users/client';
import { ROOT_FACTIONS_MAP } from '@utils/constants';
import styles from './styles.module.scss';

export default function Dashboard() {
  const { data: stats, isLoading, isError } = useQuery({
    queryKey: ['userStats'],
    queryFn: () => UserClient.listGames(),
  });

  if (isLoading) {
    return (
      <div className={styles.loadingWrapper}>
        <CircularProgress />
      </div>
    );
  }

  if (isError || !stats) {
    return <p style={{ color: 'red' }}>Erro ao carregar estatísticas.</p>;
  }

  const userIds = Object.keys(stats.totalPointsByUser || {});
  const factionData = Object.keys(stats.totalGamesByFaction || {}).map((faction) => ({
    faction: ROOT_FACTIONS_MAP[faction],
    totalGames: stats.totalGamesByFaction[faction],
  }));

  return (
    <div className={styles.page}>
      <UserStatsTable stats={stats} data={userIds} />
      <FactionPieChart data={factionData} />
    </div>
  );
}

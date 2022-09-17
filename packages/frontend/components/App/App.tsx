import React, { useEffect } from 'react';
import useCurrentUserStore from '../../hooks/useCurrentUser';
import Layout from '../Layout';

const App: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, fetchUser } = useCurrentUserStore((state) => ({
    user: state.user,
    fetchUser: state.fetchUser,
  }));

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);

  return <Layout>{children}</Layout>;
};

export default App;

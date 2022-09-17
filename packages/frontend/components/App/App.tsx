import React, { PropsWithChildren, useEffect } from 'react';

import useCurrentUserStore from '../../hooks/useCurrentUser';
import Layout from '../Layout';

const App: React.FC<PropsWithChildren> = ({ children }) => {
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

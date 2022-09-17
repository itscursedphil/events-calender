import React, { useEffect } from 'react';
import useCurrentUserStore from '../../hooks/useCurrentUser';

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

  return <div>{children}</div>;
};

export default App;

import React, { useEffect } from 'react';
import { useCurrentUserLazyQuery } from '../../generated/graphql';
import useCurrentUserStore from '../../hooks/useCurrentUser';

const App: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUserQuery] = useCurrentUserLazyQuery();
  const { user, setUser } = useCurrentUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  useEffect(() => {
    if (!user) {
      currentUserQuery({
        onCompleted: (data) => {
          if (data && data.me)
            setUser({
              id: data.me.id,
              email: data.me.email || '',
              username: data.me.username,
            });
        },
      });
    }
  }, []);

  return <div>{children}</div>;
};

export default App;

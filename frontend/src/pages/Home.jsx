import React from 'react';
import { useNavigate } from 'react-router-dom';

// Deprecated: Use LandingPage instead
const Home = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate('/');
  }, [navigate]);

  return null;
};

export default Home;

          }}
        />
      )}
    </div>
  );
};

export default Home;

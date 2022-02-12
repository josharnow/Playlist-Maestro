import React, { useEffect, useState } from 'react';
import { accessToken, getCurrentUserProfile } from '../spotify';
import { catchErrors } from '../utils';

const User = () => {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken); // Sets token to the accessToken variable imported from the spotify.js file

    const fetchData = async () => { // Because the await operator can only be used inside of async functions, an async function is used here. This is better than making the whole useEffect hook async, as that can quickly create complicated problems.
        const { data } = await getCurrentUserProfile(); // getCurrentUserProfile() returns a promise, so we need to wait for the promise to be resolved using await. Destructuring is used to access the data property of the axios response.
        setProfile(data);
    };

    catchErrors(fetchData()); // Invokes the async function
    // console.dir(profile);
  }, [])


  return (
    <React.Fragment>
      { (token && profile) 
        && 
          <div>
            <h1>{ profile.display_name }</h1>
            <p>{ profile.followers.total } Followers</p>
            { profile.images.length && profile.images[0].url && (
              <img src={ profile.images[0].url } alt="Avatar" />
            )}
          </div>
      }

      { (!token) 
        && <h1>Please log in to view your profile</h1>
      }
    </React.Fragment>
  );
}
export default User;
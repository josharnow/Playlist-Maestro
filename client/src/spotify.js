import axios from 'axios';

// Map for localStorage keys
const localStorageKeys = { // Allows for easy referral to the keys to be used for each key/value pair in local storage
  accessToken: 'spotify_access_token',
  refreshToken: 'spotify_refresh_token',
  expireTime: 'spotify_token_expire_time',
  timestamp: 'spotify_token_timestamp',
}

// Map to retrieve localStorage values
const localStorageValues = { // Allows for easy referral to the values currently set in local storage
  accessToken: window.localStorage.getItem(localStorageKeys.accessToken),
  refreshToken: window.localStorage.getItem(localStorageKeys.refreshToken),
  expireTime: window.localStorage.getItem(localStorageKeys.expireTime),
  timestamp: window.localStorage.getItem(localStorageKeys.timestamp),
};

/**
 * Clear out all localStorage items we've set and reload the page
 * @returns {void}
 */
export const logout = () => {
  // Clear all localStorage items
  for (const property in localStorageKeys) {
    window.localStorage.removeItem(localStorageKeys[property]);
  }
  // Navigate to homepage
  window.location = window.location.origin;
};

/**
 * Use the refresh token in localStorage to hit the /refresh_token endpoint
 * in our Node app, then update values in localStorage with data from response.
 * @returns {void}
 */
const refreshToken = async () => { // Asynchronous due to the API call made to the /api/refresh_token endpoint
  try {
    // Logout if there's no refresh token stored or we've managed to get into a reload infinite loop
    if (!localStorageValues.refreshToken ||
      localStorageValues.refreshToken === 'undefined' ||
      (Date.now() - Number(localStorageValues.timestamp) / 1000) < 1000
    ) {
      console.error('No refresh token available');
      logout();
    }

    // Use `/api/refresh_token` endpoint from the Node app
    const { data } = await axios.get(`/api/refresh_token?refresh_token=${localStorageValues.refreshToken}`);

    // Update localStorage values
    window.localStorage.setItem(localStorageKeys.accessToken, data.access_token);
    window.localStorage.setItem(localStorageKeys.timestamp, Date.now());

    // Reload the page for localStorage updates to be reflected
    window.location.reload();

  } catch (e) {
    console.error(e);
  }
};

  /**
   * Checks if the amount of time that has elapsed between the timestamp in localStorage
   * and now is greater than the expiration time of 3600 seconds (1 hour).
   * @returns {boolean} Whether or not the access token in localStorage has expired
   */
  const hasTokenExpired = () => {
    const { accessToken, timestamp, expireTime } = localStorageValues;
    if (!accessToken || !timestamp) {
      return false;
    }
    const millisecondsElapsed = Date.now() - Number(timestamp);
    return (millisecondsElapsed / 1000) > Number(expireTime);
  };

/**
 * Handles logic for retrieving the Spotify access token from localStorage
 * or URL query params
 * @returns {string} A Spotify access token
 */
const getAccessToken = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString); // URLSearchParams exposes utility methods (e.g. .get()) to work with the query strings
  const queryParams = {
    [localStorageKeys.accessToken]: urlParams.get('access_token'), // Stores the value of access_token as the value of the key 'spotify_access_token'
    [localStorageKeys.refreshToken]: urlParams.get('refresh_token'),
    [localStorageKeys.expireTime]: urlParams.get('expires_in'),
  };
  const hasError = urlParams.get('error');

  // If there's an error OR the token in localStorage has expired, refresh the token
  if (hasError || hasTokenExpired() || localStorageValues.accessToken === 'undefined') {
    refreshToken();
  }

  // If there is a valid access token in localStorage, use that
  if (localStorageValues.accessToken && localStorageValues.accessToken !== 'undefined') {
    return localStorageValues.accessToken;
  }

  // If there is a token in the URL query params, user is logging in for the first time
  if (queryParams[localStorageKeys.accessToken]) {
    // Store the query params in localStorage
    for (const property in queryParams) {
      window.localStorage.setItem(property, queryParams[property]);
    }
    // Set timestamp
    window.localStorage.setItem(localStorageKeys.timestamp, Date.now());
    // Return access token from query params
    return queryParams[localStorageKeys.accessToken];
  }

  // We should never get here!
  return false;
}

/**
 * Handles logic for retrieving the Spotify access token from localStorage
 * or URL query params
 * @returns {string} A Spotify access token
 */
export const accessToken = getAccessToken();

/**
 * Axios global request headers
 * https://github.com/axios/axios#global-axios-defaults
 */
axios.defaults.baseURL = 'https://api.spotify.com/v1';
axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
axios.defaults.headers['Content-Type'] = 'application/json';

/**
 * Get Current User's Profile
 * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-current-users-profile
 * @returns {Promise}
 */
export const getCurrentUserProfile = () => axios.get('/me'); // Since the base URL was set globally, the URL being used for the axios request only needs to be "/me" rather than "https://api.spotify.com/v1/me"
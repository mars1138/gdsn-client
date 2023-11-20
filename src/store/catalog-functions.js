import { catalogActions } from './catalog-slice';

// retrieves catalog from backend server and updates redux state
export const fetchCatalog = (userId, userToken) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/products/user/${userId}`,
        {
          method: 'GET',
          body: null,
          headers: {
            'Content-Type': 'application-json',
            Authorization: 'Bearer ' + userToken,
          },
        }
      );

      if (!res.ok) throw new Error('Could not fetch product catalog');

      const data = await res.json();

      return data;
    };

    try {
      const catalogData = await fetchData();

      dispatch(
        catalogActions.replaceCatalog({
          products: [...catalogData] || [],
        })
      );
      dispatch(catalogActions.setCatalogStorage());
    } catch (err) {
      console.log(err);
    }
  };
};

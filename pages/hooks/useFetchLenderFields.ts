import { useRouter } from 'next/router';
import { LenderPageContext } from 'pages/context/LenderPageContext';
import { useContext, useEffect } from 'react';

export const useFetchLenderFields = () => {
  const router = useRouter();
  const { dispatch } = useContext(LenderPageContext);
  const lenderSlug = router.query.lenderName?.toString();
  useEffect(() => {
    if (lenderSlug) {
      fetch(`/api/lenders/${lenderSlug}`)
        .then((res) => res.json())
        .then((response) => {
          dispatch &&
            dispatch({
              type: 'SET_FORM_FIELDS',
              payload: response.fields,
            });
        });
    }
  }, [lenderSlug]);
};

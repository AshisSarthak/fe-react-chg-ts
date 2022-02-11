import { useRouter } from 'next/router';
import { LenderPageContext } from 'pages/context/LenderPageContext';
import { useContext } from 'react';

export const usePostValues = () => {
  const router = useRouter();
  const {
    state: { formValues },
    dispatch,
  } = useContext(LenderPageContext);
  const lenderSlug = router.query.lenderName?.toString();

  const handlePostValues = async () => {
    if (lenderSlug) {
      fetch(`/api/lenders/${lenderSlug}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      })
        .then((res) => res.json())
        .then((response) => {
          dispatch({
            type: 'SET_DECISION',
            payload: response.decision,
          });
        });
    }
  };

  return { handlePostValues };
};

import React from 'react';

import Error from '$root/components/error/component';

export default function ErrorPage(props) {
  return <Error statusCode={props.statusCode} />;
}

ErrorPage.getInitialProps = function (props) {
  const { res, error } = props;
  let statusCode = -1;
  if (res) {
    statusCode = res.statusCode;
  } else {
    if (err) {
      statusCode = error.statusCode;
    } else {
      statusCode = 404;
    }
  }
  return { statusCode };
};

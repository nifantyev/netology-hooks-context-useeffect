import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Details = ({ info }) => {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const result = await fetch(
          `https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${info.id}.json`
        );
        const data = await result.json();
        setDetails(data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [info.id]);

  return isLoading ? (
    <div>Загрузка...</div>
  ) : (
    details && (
      <div>
        <img src={details.avatar} alt={details.name} />
        <h2>{details.name}</h2>
        <div>City: {details.details.city}</div>
        <div>Company: {details.details.company}</div>
        <div>Position: {details.details.position}</div>
      </div>
    )
  );
};

Details.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Details;

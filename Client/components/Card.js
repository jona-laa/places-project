import React from 'react'
import { View, Text } from 'react-native';


const Card = ({ place }) => {

    const fetchImg = () => {
        fetch()
          .then(res => res.json())
          .then(data => setList(data))
          .catch(err => console.log(err))
      };

    return (
        <Text>{place.name}</Text>
    )
}

export default Card

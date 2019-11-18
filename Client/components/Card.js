import React from 'react'
import { View, Text, Image, StyleSheet, ImageBackground, Dimensions } from 'react-native';



const Card = ({ place, url }) => {
    const imgURL = url + place.imgURL;

    return (
        <ImageBackground source={{ uri: imgURL }} imageStyle={{ borderRadius: 12 }} style={styles.cardBackground}>
            <Text style={styles.hours}>Open {place.hours.opens.split(':')[0]}-{place.hours.closes.split(':')[0]}</Text>
            <Text style={styles.heading}>{place.name}</Text>
            <Text style={styles.address}>{place.address.street}</Text>
            <Text style={styles.membersHere}>Members here</Text>
            <Text style={styles.capacity}>{place.capacity}</Text>
            <Text style={styles.highlights}>{place.info.highlights.join(' · ')}</Text>
            <View style={styles.overlay} />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    cardBackground: {
        width: Dimensions.get('window').width - 100,
        height: Dimensions.get('window').width * 0.45,
        marginTop: 50,
        paddingTop: 10,
        paddingRight: 16,
        paddingBottom: 10,
        paddingLeft: 16,
        overlayColor: 'black'
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 12,
        zIndex: 0
    },
    hours: {
        color: 'white',
        zIndex: 1
    },
    heading: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        zIndex: 1
    },
    address: {
        color: 'white',
        zIndex: 1,
        fontSize: 11
   },
    membersHere: {
        color: 'white',
        zIndex: 1,
        textAlign: 'right',
        fontSize: 11,
        fontWeight: 'bold',
        paddingTop: 25
    },
    capacity: {
        color: 'white',
        zIndex: 1,
        textAlign: 'right',
        fontSize: 20,
        fontWeight: 'bold',
    },
    highlights: {
        color: 'white',
        zIndex: 1,
        fontSize: 8,
        textAlign: 'center',
        position: 'absolute',
        bottom: 13,
        left: 16,
        width: '100%'
    }
})

export default Card

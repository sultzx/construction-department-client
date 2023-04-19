import {Marker as GoogleMapMarker} from '@react-google-maps/api'

const Marker = ({position}) => {
    return <GoogleMapMarker position={position}  />
}
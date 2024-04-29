// Key	Type	Description
export interface Location {
  id: number //	The id of the location.
  name: string //	The name of the location.
  type: string //	The type of the location.
  dimension: string //	The dimension in which the location is located.
  residents: string[] //	List of character who have been last seen in the location.
  url: string // (url)	Link to the location's own endpo:number //.
  created: string //	Time at which the location was created in the database.
}

export const GET = async (url: string) => {
  const locationResponse = await fetch(url)
  if (locationResponse.ok) {
    const locationData = await locationResponse.json()
    console.log(locationData) // or use locationData as needed
    return locationData as Location
  } else {
    console.error('Failed to fetch location data:', locationResponse.statusText)
  }

  return {
    id: -1,
    name: '',
    type: '',
    created: '',
    dimension: '',
    residents: [],
    url: ''
  } as Location
}

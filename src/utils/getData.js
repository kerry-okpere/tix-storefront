// abstract API integration 
const getData = async url => {
  const request = await fetch(url)
  const response = await request.json()  
  return response.data
}

export {
  getData
}
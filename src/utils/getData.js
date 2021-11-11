// abstract API integration 
const getData = async url => {
  const request = await fetch(url)
  const response = await request.json()  
  return response.data
}
const  formatter = new Intl.NumberFormat('en-NG', {    style: 'currency', currency: 'NGN'})

export {
  getData,
  formatter
}
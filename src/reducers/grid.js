const MAXLAT = 90,
  MINLAT = -90,
  MAXLNG = 180,
  MINLNG = -180,
  buildGrid = latStep => {
    let startT = new Date()
    console.log('building grid')    

    // copy
    let latMax = MAXLAT,
      latMin = MINLAT,
      output = {}

    while(latMax >= latMin) {
      output[latMax] = {}

      let lngMax = MAXLNG,
        lngMin = MINLNG

      while(lngMax >= lngMin) {
        output[latMax][lngMax] = []
        lngMax -= latStep * 2
      }
      latMax -= latStep
    }

    let finT = new Date()
    console.log(`build complete in ${(finT-startT)}ms`)
    delete output[0]
    return output
  }

const initialState = buildGrid(10)

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

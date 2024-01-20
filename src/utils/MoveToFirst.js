export default function moveToFirst( stringToMove, arrayIn ){
    if ( arrayIn.includes(stringToMove) ){
      let currentIndex = arrayIn.indexOf(stringToMove);
      arrayIn.splice(currentIndex, 1);
      arrayIn.unshift(stringToMove);
      console.log(arrayIn)
    } 
}
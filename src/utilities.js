// Math science
 const utils = {
    // Sum an array
    sum: arr => arr.reduce((acc, curr) => acc + curr, 0),
  
    // create an array of numbers between min and max (edges included)
    range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),
  
    // pick a random number between min and max (edges included)
    random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),
  
    // Given an array of numbers and a max...
    // Pick a random sum (< max) from the set of all available sums in arr
    randomSumIn: (arr, max) => {
      const sets = [[]];
      const sums = [];
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0, len = sets.length; j < len; j++) {
          const candidateSet = sets[j].concat(arr[i]);
          const candidateSum = utils.sum(candidateSet);
          if (candidateSum <= max) {
            sets.push(candidateSet);
            sums.push(candidateSum);
          }
        }
      }
      return sums[utils.random(0, sums.length - 1)];
    },
  };
  export const getCandidates = (total) =>{
    
    const candidates = [];
    
    for(let i = 0;i<total.length;i++){
      if(total[i]===colors.candidate){
        candidates.push(i+1);
      }
    }
    return candidates;
  }
  
 export const getAvailableNumbers = (total) =>{
    
    const availableNumbers = [];
    
    for(let i = 0;i<total.length;i++){
      if(total[i]===colors.available){
        availableNumbers.push(i+1);
      }
    }
    return availableNumbers;
  }
  
 export const getWrongs = (total) =>{
    
    const wrongNumbers = [];
    
    for(let i = 0;i<total.length;i++){
      if(total[i]===colors.wrong){
        wrongNumbers.push(i+1);
      }
    }
    return wrongNumbers;
  }

export const isAllUsed = (total) =>{
    
    for(let i = 0;i<total.length;i++){
      if(total[i]===colors.used){
        continue;
      }
      else{
        return false;
      }
       
    }
    return true;
  }

  // Color Theme
export const colors = {
    available: 'darkgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
  };
  export default utils;


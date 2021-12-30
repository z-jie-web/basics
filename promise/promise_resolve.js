var original = Promise.resolve(33);

original.then((res)=>{
  console.log(res,'sss')
}).catch(res => {
  console.log('wwww')
  throw new Error('ssssssssss')
}).finally(() => {
  console.log('finally')

})

// console.log(original.the, 'originaloriginal')

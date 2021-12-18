const arr = [1, 2, 1, 5, 8, 6, 4, 5, 2, 8, 46, 94, 545, 12, 54, 854, 56, 4];

function uniqueSet(arr) {
  const result = new Set(arr);
  console.log(result, 'resultresult')

  return [...result];
  //使用扩展运算符将Set数据结构转为数组
}

// uniqueSet(arr);


const result = new Set(arr);


// result.forEach(item=>{
//   console.log(item,'ssss')
// })


function uniqueMap(arr) {
  let map = new Map();
  let uniqueArr = new Array();  // 数组用于返回结果
  for (let i = 0; i < arr.length; i++) {
    if(map.has(arr[i])) {  // 如果有该key值
      // console.log(arr[i], 'ii')
      map.set(arr[i], true); 
    } else { 
      map.set(arr[i], false);   // 如果没有该key值
      uniqueArr.push(arr[i]);
    }
  } 
  // console.log(map, 'mapmap')
  return uniqueArr ;
}

let map = new Map();


// console.log(map.has(1))

// console.log(uniqueMap(arr))


console.log('a' in {a:'1'})
// Bai 1
function print1To100 (){
    for (let i = 1; i<101; i++){
        console.log(i);
    }
}
// print1To100();

// Bai 2
function print100To1 (){
    for (let i = 100; i>0; i--){
        console.log(i);
    }
}
// print100To1();

// Bai 3
function DivisorOf5 (){
    for (let i = 5; i<71; i+=5){
        console.log(i);
    }
}
//DivisorOf5()

// Bai4
function countDivisor(n){
    let count = 0;
	//Your code here
	if(n> 0){
		for (let i = 1; i*i<=n; i++){
            if (n%i == 0){
                count += 2;
                if (n/i == i){
                    count-=1;
                }
            }
        }
	}
    console.log(count);
	
}

// console.log(countDivisor(10)) 
// console.log(countDivisor(128)) 
// console.log(countDivisor(2000)) 
// console.log(countDivisor(63)) 

// Bai5
function perfectNumber(n){
    let sum = 0;
	//Your code here
	if(n> 0){
		for (let i = 1; i<n; i++){
            if (n%i === 0){
                sum += i;
                
            }
        }
	}
    console.log(sum);
    if (sum !== n){
        console.log(`${n} KHONG phai so hoan hao`);
    }    
    else console.log(`${n} la so hoan hao`)
}
// perfectNumber(6);

//Bai 6:
function rightTriangle(n){
    for (let i = 1; i<n+1; i++){
        let result = "";
        for (let j = 1; j<i+1; j++){
            result += "#";
        }
        console.log(result);
    }
}
// rightTriangle(4);

//Bai 7:
function leftTriangle(n){
    for (let i = 1; i<n+1; i++){
        let result = "";
        for (let j = 1; j<=n-i; j++){
            result += " ";
        }
        for (let j = n-i; j<n; j++){
            result += "#";
        }
        console.log(result);
    }
}
// leftTriangle(6);


// Bai 8
function countAverageOfEvenDivisor (n){
    let sum = 0;
    let count = 0;
    for (let i = 1; i<=n; i++){
        if (i%2==0 && n%i == 0){
            sum += i;
            count++;
            
        }
    }
    
    console.log((sum/count).toFixed(2));
}
// countAverageOfEvenDivisor(18);

// Bai9:
function insert(arr, pos, value){
    
    for (let i = arr.length; i>pos; i--){
        arr[i] = arr[i-1];
    }
    arr[pos] = value;
    return arr;
}
//console.log(insert([2, 4, 6, 2, 1], 3, 1000));

// Bai10: 
function remove(arr, pos){
    for (let i = 0; i<arr.length-1; i++){
        if (i >= pos){
            arr[i] = arr[i+1];
        }
    }
    arr.pop();
    
    return arr;
}
// console.log(remove([2, 4, 6, 2, 1], 3));

// Bai11;
function sumOfEvenNumbers(arr){
    let product = 1;
    arr.forEach(element => {
        if (element%2 === 0){
            product *= element;
        }
    });
    console.log(product);
}

// (sumOfEvenNumbers([4,1, 2, 3]));

//Bai12:
function arrayValuesType(arr){
    let newArr = [];
    arr.forEach((ele)=>{
        newArr.push(typeof ele)
    })
    console.log(newArr);
}
// arrayValuesType([1, 2, "null", []]);

//Bai13:
function outlierNumber(arr){
    let even = [];
    let odd = [];
    for (let i = 0; i<arr.length; i++) {
        let element = arr[i];
        if (element%2 == 0){
            even.push(element);
        }
        else {
            odd.push(element);
        }
       if (even.length >=2){
        return odd[0];
       }
       else if (odd.length >= 2){
        return even[0];
       }
    }
}
// console.log(outlierNumber([2, 3, 4]));

// Bai 14:
function difference(arr1, arr2){
    let result = [...arr1, ...arr2];
    result.sort((a, b) => a-b);

    for (let i = 1; i<result.length; i++){
        if (result[i] === result[i-1]){
            result.splice(i, 1);
            i--;
        }
    }
    console.log(result);
}
//difference([1, 2, 3, 1, 1, 2, 1], [100, 2, 1, 10]);


// Bai 15:
function sumMinimums(arr){
    let sum = 0;
    arr.forEach((ele)=>{
        let min = ele[0];
        ele.forEach((temp)=>{
            if (temp < min){
                min = temp;
            }
        })
        sum += min;
    })
    console.log(sum);
}
/* sumMinimums([
    [1, 2, 3, 4, 5],
    [5, 6, 7, 8, 9],
    [20, 21, 34, 56, 100]
  ]);
  */

  // Bai16:
function findMinElement(arr){
    let min = arr[0];
    arr.forEach((temp)=>{
        if (temp < min){
            min = temp;
        }
    })
    console.log(min);
}
//findMinElement([1,2,-10,100,-8,7]) ;


function findMaxElement(arr){
    let max = arr[0];
    arr.forEach((temp)=>{
        if (temp > max){
            max = temp;
        }
    })
    console.log(max);
}
// findMaxElement([1,2,-10,100,-8,7]) ;

// Bai 17:
function oddArr(arr){
    let result = [];
    arr.forEach((ele)=>{
        if (ele%2 !== 0){
            result.push(ele);
        }
    })
    console.log(result);
}

function evenArr(arr){
    let result = [];
    arr.forEach((ele)=>{
        if (ele%2 === 0){
            result.push(ele);
        }
    })
    console.log(result);
}

function distinctArr(arr1, arr2){
    let result = [...arr1, ...arr2];
    result.sort((a, b) => a-b);

    for (let i = 1; i<result.length; i++){
        if (result[i] === result[i-1]){
            result.splice(i, 1);
            i--;
        }
    }
    console.log(result);
}

// Bai 18:
function getBudgets(employees){
    let sum = 0;
    employees.forEach((employ)=>{
        sum += employ["budget"];
    })
    console.log(sum);
}
/*getBudgets([
    { name: "John", age: 21, budget: 23000 },
    { name: "Steve",  age: 32, budget: 40000 },
    { name: "Martin",  age: 16, budget: 2700 }
  ])
    */

// Bai 19:
function getDistance(point1, point2){
    let x = Math.abs(point1["x"] - point2["x"]);
    let y = Math.abs(point1["y"] - point2["y"]);
    let distance = Math.sqrt(x*x + y*y);
    console.log(distance.toFixed(3));
}
// getDistance({x: 0, y: 0}, {x: 1, y: 1}) 

// Bai 20:
function keysAndValues(obj1){
    let key = [...Object.keys(obj1)];
    let value = [...Object.values(obj1)];
    console.log([key, value]); 
}
// keysAndValues({ a: 1, b: 2, c: 3 });

// Bai21:
function freeShipping(obj){
    let sum = 0;
    for (let key of Object.keys(obj)){
        sum += obj[key];
    }
    console.log(sum>=50)
}
// freeShipping({ "Shampoo": 5.99, "Rubber Ducks": 15.99 });

// Bai 22:

function greeting(stu){
    const GUEST_LIST = {
        Randy: "Germany",
        Karla: "France",
        Wendy: "Japan",
        Norman: "England",
        Sam: "Argentina"
    }
    if (GUEST_LIST[stu]){
        console.log(`Hi! I'm ${stu}, and I'm from ${GUEST_LIST[stu]}`)
    }
    else{
        console.log("Hi! I'm a guest");
    }
}
greeting("Van");
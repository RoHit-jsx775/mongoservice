let ram = {
  name: "ram",
  class: 10,
  age: 20,
  dob: "2020",
  family: ["dhanbhadur", "radhamaya"],
  marks: {
    name: "math",
    score: 55,
    subject: {
      id: 1,
      name: "maths",
    },
  },
};
let shyam = {
  name: "ram",
  age: 20,
  class: 10,
  dob: "2020",
  marks: {
    name: "math",
    score: 55,
    subject: {
      id: 1,
      name: "maths",
    },
  },
};

// const ramKeys = Object.keys(ram); // ['name', 'class', 'age']
// const shyamKeys = Object.keys(shyam); // ['name', 'grade', 'age']

function compareObject(obj1, obj2) {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

   function  compareArray(arr1, arr2){ 
    arr1.map((item, index) => {
      if (item !== arr2[index]) {
        return false;
      }
      return true
    })
     
   }
  let keysAreEqual = obj1Keys.length === obj2Keys.length;

  obj1Keys.map((obj1Key) => {
    if (!keysAreEqual) {
      keysAreEqual = false;
      return;
    }
    const isKeyExistsInBoth = obj2Keys.find((obj2Key) => {
      return obj1Key === obj2Key;
    });

    keysAreEqual = Boolean(isKeyExistsInBoth);
  });

  console.log("keys are equal", keysAreEqual);

  let valuesAreEqual = true;
  obj1Keys.map((obj1Key) => {
    if (!valuesAreEqual) {
      valuesAreEqual = false;
      return;
    }

    const obj1Value = obj1[obj1Key];
    const obj2Value = obj2[obj1Key];

    let isValuesEqual = false;
    if (
      typeof obj1Value === "string" ||
      typeof obj1Value === "number" ||
      typeof obj1Value === "boolean" 
    ) {
      isValuesEqual = obj1Value === obj2Value;
    } else if (typeof obj1Value === "object") {
      isValuesEqual = compareObject(obj1Value, obj2Value);
    }
    
    else if(typeof obj1Value === "array"){
      isValuesEqual = compareArray(obj1Value, obj2Value);
    }

    valuesAreEqual = isValuesEqual;
  });

  const isObjectEqual = keysAreEqual && valuesAreEqual;
  return isObjectEqual;
}

const isEqual = compareObject(ram, shyam);
console.log("isEqual", isEqual);
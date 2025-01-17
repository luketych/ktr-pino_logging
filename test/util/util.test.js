import assert from 'assert'
import chai from 'chai'
import { describe, it } from 'mocha'

// import { extractDeepObjects } from '#util'

const expect = chai.expect


function arraysAreEqual(arr1, arr2) {
  // Check if both arrays have the same length
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Check if each element in arr1 is also in arr2
  return arr1.every((elem) => arr2.includes(elem));
}


describe("Test", function() {
  it("returns true if 1+1=2", function() {
    expect(1+1).to.equal(2)
  })
})

// describe("Tests if extractDeepObjects() extract all types of embedded json.", function() {

//   it("returns empty array.", function() {
//     const output = extractDeepObjects("hello world")
//     expect( output ).to.deep.equal([])
//   })

//   it("returns array with 2 embedded objects.", function() {
//     this.timeout(30000)

//     const input = {
//       name: 'John',
//       age: 30,
//       address: {
//         street: '123 Main St',
//         city: 'Anytown',
//         state: 'CA'
//       }
//     }

//     const expectedOutput = [
//     {
//       name: 'John',
//       age: 30,
//       address: {
//         street: '123 Main St',
//         city: 'Anytown',
//         state: 'CA'
//       }
//     },
//     {
//       "city": "Anytown", 
//       "state": "CA", 
//       "street": "123 Main St" 
//     }]

//     const output = extractDeepObjects(input)

//     expect( output ).to.eql(expectedOutput)
//     //assert.deepStrictEqual(output, expectedOutput)
//     //chai.assert.deepEqual(output, expectedOutput)
//   })


//   it("returns array with 4 embedded objects.", function() {
//     this.timeout(30000)

//     const input = {
//       a: 1,
//       b: {
//         c: 2
//       },
//       c: {
//         hiddenObject: {
//           hello: 'world'
//         }
//       }
//     }

//     const expectedOutput = [
//       {
//         a: 1,
//         b: {
//           c: 2
//         },
//         c: {
//           hiddenObject: {
//             hello: 'world'
//           }
//         }
//       }, 
//       { c: 2 }, 
//       {
//         hiddenObject: {
//           hello: 'world'
//         }
//       }, 
//       { hello: 'world' }
//     ]

//     const output = extractDeepObjects(input)

//     expect( output ).to.eql(expectedOutput)
//   })
// })
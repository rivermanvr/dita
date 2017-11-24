import { isEmpty } from 'lodash'

export default function verifyEmptyState (state) {
  if (Array.isArray(state) && isEmpty(state)) return false
  if (typeof state == 'object') {
    return Object.keys(state).reduce((bool, k) => bool && verifyEmptyState(state[k]), true)
  } else {
    return Boolean(state)
  }
}

// *************** tests *************** //
/*
console.log('base case', verifyEmptyState({}) )
console.log('single depth false', verifyEmptyState({ hello: '' }) )
console.log('single depth true', verifyEmptyState({ hello: 'world' }) )
console.log('multi depth false', verifyEmptyState({ hello: 'world', cool: { empty: '' } }) )
console.log('multi depth true', verifyEmptyState({ hello: 'world', cool: { empty: 'true' } }) )
console.log('multi depth with arrays false', verifyEmptyState({ hello: 'world', cool: { empty: [] } }) )
console.log('multi depth with arrays true', verifyEmptyState({ hello: 'world', cool: { filled: [ 5 ] } }) )
console.log('multi depth with 2D arrays false', verifyEmptyState({ hello: 'world', cool: { twoD: [[]] } }) )
console.log('multi depth with 2D arrays true', verifyEmptyState({ hello: 'world', cool: { twoDfilled: [[ 5 ]] } }) )
*/

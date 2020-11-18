import logo from './logo.svg'
import './App.css'

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

firebase.initializeApp({
  apiKey: 'AIzaSyCBBUpAjz9_E6bmchDsRu-v2AkB8ccGkwg',
  authDomain: 'unkchat-byuiu.firebaseapp.com',
  databaseURL: 'https://unkchat-byuiu.firebaseio.com',
  projectId: 'unkchat-byuiu',
  storageBucket: 'unkchat-byuiu.appspot.com',
  messagingSenderId: '85909992147',
  appId: '1:85909992147:web:ceaf2af6e7f65b2e011a26',
})

function App() {
  const [user] = useAuthState(auth)
  return (
    <div className='App'>
      <header className='App-header'></header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  )
}

export default App

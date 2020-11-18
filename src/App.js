import React, { useRef, useState } from 'react'
import './App.css'

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

firebase.initializeApp({
  apiKey: 'AIzaSyCBBUpAjz9_E6bmchDsRu-v2AkB8ccGkwg',
  authDomain: 'unkchat-byuiu.firebaseapp.com',
  databaseURL: 'https://unkchat-byuiu.firebaseio.com',
  projectId: 'unkchat-byuiu',
  storageBucket: 'unkchat-byuiu.appspot.com',
  messagingSenderId: '85909992147',
  appId: '1:85909992147:web:f6fd52d5a8f26184011a26',
})

const auth = firebase.auth()
const firestore = firebase.firestore()
const analytics = firebase.analytics()

function App() {
  const [user] = useAuthState(auth)

  return (
    <div className='App'>
      <header>
        <img
          src='https://media1.tenor.com/images/321d2c7ca417df4853cbdac646d19b83/tenor.gif?itemid=7216186'
          alt=''
        />
        <SignOut />
      </header>

      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  )
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <>
      <button className='sign-in' onClick={signInWithGoogle}>
        Entre se quiser com Google :D <br />
        Se não quiser não entre :D
      </button>
      <p></p>
    </>
  )
}

function SignOut() {
  return (
    auth.currentUser && (
      <button className='sign-out' onClick={() => auth.signOut()}>
        Se saia
      </button>
    )
  )
}

function ChatRoom() {
  const dummy = useRef()
  const messagesRef = firestore.collection('messages')
  const query = messagesRef.orderBy('createdAt').limit(25)

  const [messages] = useCollectionData(query, { idField: 'id' })

  const [formValue, setFormValue] = useState('')

  const sendMessage = async (e) => {
    e.preventDefault()

    const { uid, photoURL } = auth.currentUser

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    })

    setFormValue('')
    dummy.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder='fale se quiser'
        />

        <button type='submit' disabled={!formValue}>
          🤟🏻
        </button>
      </form>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img src={photoURL} />
        <p>{text}</p>
      </div>
    </>
  )
}

export default App

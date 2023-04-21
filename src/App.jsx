import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import Message from "./components/Message";
import { app } from "./firebase";
import {
  onAuthStateChanged,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

const loginHandler = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};

const logoutHandler = () => signOut(auth);


function App() {
  const [user, setUser] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const divForScroll = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setMessage("");

      await addDoc(collection(db, "Messages"), {
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp(),
      });

      divForScroll.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "Messages"), orderBy("createdAt", "asc"));

    const unsubscribe = onAuthStateChanged(auth, (data) => {
      setUser(data);
    });

    const unsubscribeForMessage = onSnapshot(q, (snap) => {
      setMessages(
        snap.docs.map((item) => {
          const id = item.id;
          return { id, ...item.data() };
        })
      );
    });

    return () => {
      unsubscribe();
      unsubscribeForMessage();
    };
  }, []);
  return (
    <Box >
      {user ?
        <Container h={"100vh"}>
          <VStack h={"full"} p={4}>
            <Button w={"full"} colorScheme="red" bgColor={"red"} onClick={logoutHandler}>Logout</Button>
            <VStack w="full" h="full" overflowY={"auto"}>
              {messages.map((item) => (
                <Message
                  key={item.id}
                  user={item.uid === user.uid ? 0 : 1}
                  text={item.text}
                  uri={item.uri}
                />
              ))}
              <div ref={divForScroll}></div>
            </VStack>
            <form style={{ width: "100%" }} onSubmit={e => submitHandler(e)}>
              <HStack>
                <Input
                  placeholder="Enter a Message..."
                  onChange={e => setMessage(e.target.value)}
                  value={message}
                />
                <Button colorScheme={"green"} type="submit">
                  Send
                </Button>
              </HStack>
            </form>
          </VStack>
        </Container>
        :
        <VStack justifyContent={"center"} alignItems={"center"} h="100vh">
          <Button onClick={loginHandler} colorScheme="whatsapp">Sign in with Google</Button>
        </VStack>
      }
    </Box >
  )
}


export default App;

import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

import './App.css';
import { ChannelListContainer, ChannelContainer , Auth} from './components';

const apiKey = '72c52jp49kr6'
const cookies = new Cookies();

const authToken = cookies.get("token");
const client = StreamChat.getInstance(apiKey);


if (authToken) {
    client.connectUser({

      
        id: cookies.get('userId'),
        name: cookies.get('userName'),
        fullName: cookies.get('fullName'),
        image: cookies.get('avatarURL'),
        hashedPassword: cookies.get('hashedPassword'),
        phoneNumber: cookies.get('phoneNumber'),
    }, authToken)
}




function App() {

  if (!authToken) return <Auth />


  return (
    <div className="App app__wrapper">
    <Chat client={client} theme="team light">
      <ChannelListContainer/>
      <ChannelContainer/>
    </Chat>
    </div>
  );
}

export default App;

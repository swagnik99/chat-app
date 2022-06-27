import React from 'react'
import {ChannelList, useChatContext} from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChannelSearch, TeamChannelList, TeamChannelPreview, Auth } from "./";
import  HospitalIcon  from "../assets/hospital.png";
import  LogoutIcon  from "../assets/logout.png";

const cookies = new Cookies();

const Sidebar = ({logout}) => (
    <div className='channel-list__sidebar'>
        <div className='channel-list__sidebar__icon1'>
            <div className='icon1__inner'>
                <img src={HospitalIcon} alt="hospital" width="30" />
            </div>
        </div>
        <div className='channel-list__sidebar__icon2'>
            <div className='icon1__inner'>
                <img src={LogoutIcon} onClick={logout} alt="hospital" width="30" />
            </div>
        </div>
    </div>
);

const CompanyHeader = () => (
    <div className='channel-list__header'>
        <p className='channel-list__header__text'>Medical Pager</p>
    </div>
);


const ChannelListContainer = () => {

    const logout = () => {
        cookies.remove("token");
        cookies.remove('userId');
        cookies.remove('userName');
        cookies.remove('fullName');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');
        cookies.remove('phoneNumber');

        window.location.reload();
    }

  return (
   <>
     <Sidebar logout={logout}/>
     
       <div className="channel-list__list__wrapper">
        <CompanyHeader/>
        <ChannelSearch/>
        <ChannelList 
           filters={{}}
           channelRenderFilterFn={()=>{}}
           List={(listProps) => (
            <TeamChannelList 
                {...listProps}
                type="team"
              
            />
        )}
           preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              type="team"
              />
           )}
           />
        <ChannelList 
           filters={{}}
           channelRenderFilterFn={()=>{}}
           List={(listProps) => (<TeamChannelList {... listProps} type="messaging"/>)}
           preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              type="messaging"
              />
           )}
           />
       </div>
     
   </>
  )
}

export default ChannelListContainer
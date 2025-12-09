import arrow_icon from './arrow_icon.webp'
import avatar_icon from './avatar_icon.webp'
import help_icon from './help_icon.webp'
import pic1 from './pic1.webp'
import pic2 from './pic2.webp'
import pic3 from './pic3.webp'
import pic4 from './pic4.webp'
import profile_alison from './profile_alison.webp'
import profile_enrique from './profile_enrique.webp'
import profile_marco from './profile_marco.webp'
import profile_richard from './profile_richard.webp'
import profile_martin from './profile_martin.webp'
import bg_img from './bg_img.jpg'
import chatlogo from './chatlogo.webp'
import send_button from './send_button.webp'
import menu from './menu.webp'
import search_icon from './search_icon.webp'
import gallery_icon from './gallery_icon.webp'
const assets={
    arrow_icon,
    avatar_icon,
    help_icon,
    pic1,
    pic2,
    pic3,
    send_button,
    pic4,
    bg_img,
    chatlogo,
    gallery_icon,
    search_icon,
    menu,
    profile_martin,
    profile_alison,
    profile_enrique,
    profile_marco,
    profile_richard
}
export default assets;
export const imagesDummyData=[pic1, pic2, pic3, pic4, pic1, pic2]
export const userDummyData=[
    {
        "_id":"680f50aaf10f3cd28382ecf2",
        "email":"test1@greatstack.dev",
        "fullname":"Alison Martin",
        "profilePic": profile_alison,
        "bio":"Hi Everyone, I am using QuickChat"
    },
    {
        "_id":"680f50aaf10f3cd28382ecf9",
        "email":"test2@greatstack.dev",
        "fullname":"Macro",
        "profilePic": profile_marco,
        "bio":"Hi Everyone, I am using QuickChat"
    },
      {
        "_id":"680f50aaf10f3cd28382ed01",
        "email":"test3@greatstack.dev",
        "fullname":"Enrique Martinez",
        "profilePic": profile_enrique,
        "bio":"Hi Everyone, I am using QuickChat"
    },
      {
        "_id":"680f50aaf10f3cd28382ed10",
        "email":"test4@greatstack.dev",
        "fullname":"Martin Johnson",
        "profilePic": profile_martin,
        "bio":"Hi Everyone, I am using QuickChat"
    },
      {
        "_id":"680f50aaf10f3cd28382ed11",
        "email":"test5@greatstack.dev",
        "fullname":"Richard Smit",
        "profilePic": profile_richard,
        "bio":"Hi Everyone, I am using QuickChat"
    }
]
export const messagesDummyData=[
  {
    "_id":"680f571ff10f3cd28382f094",
    "senderId":"680f5116f10f3cd28382ed02",
    "receiverId":"680f50e4f10f3cd28382ecf9",
    "text":" Lorem ipsum dolor sit amet.",
    "seen":true,
    "createdAt":"2025-04-28T10:23:27.844Z",
   
  },
   {
    "_id":"680f5726f10f3cd28382f0b1",
    "senderId":"680f50e4f10f3cd28382ecf9",
    "receiverId":"680f5116f10f3cd28382ed02",
    "text":" Lorem ipsum dolor sit amet.",
    "seen":true,
    "createdAt":"2025-04-28T10:23:34.520Z",
   
  },
   {
    "_id":"680f5729f10f3cd28382f0b6",
    "senderId":"680f5116f10f3cd28382ed02",
    "receiverId":"680f50e4f10f3cd28382ecf9",
    "text":" Lorem ipsum dolor sit amet.",
    "seen":true,
    "createdAt":"2025-04-28T10:23:37.301Z",
   
  },
  {
    "_id":"680f572cf10f3cd28382g0bb",
    "senderId":"680f50e4f10f3cd28382ecf9",
    "receiverId":"680f5116f10f3cd28382ed02",
    "text":" Lorem ipsum dolor sit amet.",
    "seen":true,
    "createdAt":"2025-04-28T10:23:37.33fZ",
   
  },
  {
    "_id":"680f573cf10f3cd28382f0c0",
    "senderId":"680f50e4f10f3cd28382ecf9",
    "receiverId":"680f5116f10f3cd28382ed02",
    "image":pic1,
    "seen":true,
    "createdAt":"2025-04-28T10:23:56.265Z",
   
  },
  {
    "_id":"680f5745f10f3cd28382f0c5",
    "senderId":"680f5116f10f3cd28382ed02",
    "receiverId":"680f50e4f10f3cd28382ecf9",
    "image":pic2,
    "seen":true,
    "createdAt":"2025-04-28T10:24:56.164Z",
   
  },
  {
    "_id":"680f5748f10f3cd28382f0ca",
    "senderId":"680f5116f10f3cd28382ed02",
    "receiverId":"680f50e4f10f3cd28382ecf9",
    "image":"Lorem ipsum dolor sit amet.",
    "seen":true,
    "createdAt":"2025-04-28T10:24:57.164Z",
   
  },
]
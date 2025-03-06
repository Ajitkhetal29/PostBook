import logo from "./logo.png"
import profile from "./profile.png"
import logout from "./logout.png"
import like from "./like.png"
import like_fill from "./like_fill.png"
import comment from "./comment.png"
import save from "./save.png"
import saved from "./saved.png"
import addPost from "./addPost.png"
import friends from "./friends.png"
import send from './send.png'
import bin from './bin.png'


const posts = [
    {
      "id": "1",
      "user": {
        "id": "101",
        "name": "John Doe",
        "profilePic": "https://randomuser.me/api/portraits/men/1.jpg"
      },
      "description": "Just enjoyed a beautiful sunset at the beach! 🌅",
      "image": "https://source.unsplash.com/random/800x600/?nature,beach",
      "date": "2024-02-20T14:30:00Z",
      "likes": 120,
      "comments": [
        {
          "id": "201",
          "user": {
            "id": "102",
            "name": "Jane Smith",
            "profilePic": "https://randomuser.me/api/portraits/women/2.jpg"
          },
          "comment": "Wow! That looks amazing! 🌊",
          "date": "2024-02-20T15:00:00Z"
        },
        {
          "id": "202",
          "user": {
            "id": "103",
            "name": "Alex Brown",
            "profilePic": "https://randomuser.me/api/portraits/men/3.jpg"
          },
          "comment": "I need to visit this place!",
          "date": "2024-02-20T16:15:00Z"
        }
      ],
      "savedBy": ["103", "104"],
      "tags": ["#sunset", "#beach", "#relax"]
    },
    {
      "id": "2",
      "user": {
        "id": "102",
        "name": "Jane Smith",
        "profilePic": "https://randomuser.me/api/portraits/women/2.jpg"
      },
      "description": "Reading my favorite book on a rainy day ☕📖",
      "image": null,
      "date": "2024-02-19T12:00:00Z",
      "likes": 85,
      "comments": [
        {
          "id": "203",
          "user": {
            "id": "104",
            "name": "Emily Davis",
            "profilePic": "https://randomuser.me/api/portraits/women/4.jpg"
          },
          "comment": "That sounds so peaceful! What book are you reading?",
          "date": "2024-02-19T12:30:00Z"
        }
      ],
      "savedBy": ["101", "105"],
      "tags": ["#books", "#rainyday", "#cozy"]
    },
    {
      "id": "3",
      "user": {
        "id": "103",
        "name": "Alex Brown",
        "profilePic": "https://randomuser.me/api/portraits/men/3.jpg"
      },
      "description": "Completed my first 10K run today! 🏃💪",
      "image": "https://source.unsplash.com/random/800x600/?running,fitness",
      "date": "2024-02-18T08:45:00Z",
      "likes": 200,
      "comments": [
        {
          "id": "204",
          "user": {
            "id": "105",
            "name": "Michael Johnson",
            "profilePic": "https://randomuser.me/api/portraits/men/5.jpg"
          },
          "comment": "Congratulations! That's a great achievement! 🎉",
          "date": "2024-02-18T09:10:00Z"
        },
        {
          "id": "205",
          "user": {
            "id": "101",
            "name": "John Doe",
            "profilePic": "https://randomuser.me/api/portraits/men/1.jpg"
          },
          "comment": "You're an inspiration! Time for me to start running too!",
          "date": "2024-02-18T10:00:00Z"
        }
      ],
      "savedBy": ["102", "104", "105"],
      "tags": ["#running", "#fitness", "#goals"]
    },
    {
      "id": "4",
      "user": {
        "id": "104",
        "name": "Emily Davis",
        "profilePic": "https://randomuser.me/api/portraits/women/4.jpg"
      },
      "description": "Cooked a delicious homemade pasta today! 🍝",
      "image": "https://source.unsplash.com/random/800x600/?food,pasta",
      "date": "2024-02-17T19:00:00Z",
      "likes": 95,
      "comments": [
        {
          "id": "206",
          "user": {
            "id": "103",
            "name": "Alex Brown",
            "profilePic": "https://randomuser.me/api/portraits/men/3.jpg"
          },
          "comment": "That looks absolutely delicious! Recipe please? 😍",
          "date": "2024-02-17T19:30:00Z"
        },
        {
          "id": "207",
          "user": {
            "id": "102",
            "name": "Jane Smith",
            "profilePic": "https://randomuser.me/api/portraits/women/2.jpg"
          },
          "comment": "Yum! What kind of pasta is that?",
          "date": "2024-02-17T20:00:00Z"
        }
      ],
      "savedBy": ["101", "103"],
      "tags": ["#food", "#homemade", "#pasta"]
    }
  ]
  


export const assets = {
    logo,
    profile,
    logout,
    posts,
    like,
    like_fill,
    comment,
    save,
    saved,
    addPost,
    friends,
    send,
    bin
}
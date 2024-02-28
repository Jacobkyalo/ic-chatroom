import messageBox from "../assets/images/message-box.png";
import account from "../assets/images/account.png";
import mobile from "../assets/images/mobile.png";
import rooms from "../assets/images/rooms.png";
import members from "../assets/images/members.png";
import logout from "../assets/images/logout.png";
import deleteImage from "../assets/images/delete.png";
import forgot from "../assets/images/forgot.png";

export const helpStrings = [
  {
    image: forgot,
    title: "Getting Started",
    description:
      "To get started, you need to sign up or log in to your account. Once you are logged in, you can start chatting with other members.",
  },
  {
    title: "Creating a Room",
    description:
      "To create a room, click on the Create Room button. You will be asked to enter the room name and the room description. Once you have entered the room details, click on the Create button to create the room. This feature is only available to admin users.",
  },
  {
    image: rooms,
    title: "Joining a Room",
    description:
      "Joining a room is open to all users. Just select a room from the left sidebar and you will be redirected to the room where you can start chatting with other members.",
  },
  {
    image: messageBox,
    title: "Messaging",
    description:
      "To send a message, type your message in the input field at the bottom of the chatroom and press the Enter key on your keyboard or click the send button.",
  },
  {
    image: logout,
    title: "Logging Out",
    description:
      "To log out of your account, click on the profile icon in the header and click the Logout button.",
  },
  {
    title: "Deleting a Room",
    description:
      "To delete a room, click on the room settings and click the Delete Room button. This feature is only available to admin users.",
  },
  {
    image: account,
    title: "Changing Profile",
    description:
      "To change your profile details, click on the profile icon in the header and then edit profile details such as verify-account, name, email, password, and phone number",
  },

  {
    imag: forgot,
    title: "Forgot Password",
    description:
      "If you forgot your password, click on the Forgot Password button on the login page.",
  },
  {
    image: deleteImage,
    title: "Deleting Account",
    description:
      "To delete your account, click on the profile icon in the header and click the Delete Account button at the bottom.",
  },

  {
    image: members,
    title: "Viewing User Profile",
    description:
      "To view a user's profile, click on the user's profile picture or username at the right sidebar.",
  },
  {
    image: members,
    title: "Viewing Room Members",
    description: "To view room members, check the right sidebar or panel.",
  },
  {
    image: mobile,
    title: "Mobile View",
    description:
      "The app is responsive and can be viewed on mobile devices. You can use the icons on the header to navigate.",
  },
];

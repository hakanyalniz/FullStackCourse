const Notification = ({ notification }) => {
  console.log(notification);

  return notification ? <div>{notification}</div> : null;
};

export default Notification;

export const Notifier = ({notifications}) => {
  return <>
    {
      notifications.map((notification,index) => {
        <p key={index}>{notification.message}</p>
      })
    }
  </>;
}

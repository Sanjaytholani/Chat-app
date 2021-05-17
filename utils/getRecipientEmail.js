const getRecipientEmail = (users, user) =>
  users?.filter((userEmail) => userEmail !== user.email)[0];

export default getRecipientEmail;

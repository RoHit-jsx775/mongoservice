import User from "../user/user.mongodb-model";




type TCreateUserInput={
    username:string;
    user_email:string;
    user_password:string;
} ;

async function createUser(input:TCreateUserInput){
    const user =new User({
        username:input.username,
        email:input.user_email,
        password:input.user_password

    });
    await user.save();
}


type TUpdateUserInput = {
  username: string;
  email: string;
  password: string;
};

async function updateUser(toUpdateUserId: string, input: TUpdateUserInput) {
  const user = await User.findById(toUpdateUserId);

  if (!user) {
    throw new Error("User not found");
  }

  await User.replaceOne(
    { _id: toUpdateUserId },
    {
      username: input.username,
      email: input.email,
      password: input.password,
    }
  );
}



async function getUserByEmail(input: {user_email: string }) {
console.log("email",input.user_email)
  const user = await User.findOne({
    user_email: input.user_email,
  });
  
  console.log("user result",user)
  return user;
}


export const userMongoService = {
  createUser,
  updateUser,
  getUserByEmail,
};

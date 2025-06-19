import userSession from "../../sessionUsermodel/sessions";



type TCreateTokenInput = {
  userId: string;
  token: string;
};

async function createToken(input: TCreateTokenInput) {
  const token = new userSession({
    user_id: input.userId,
    token: input.token,
  });
  await token.save();
}

type TDeleteTokenInput = {
  token: string;
  userId: string;
};

async function deleteToken(input: TDeleteTokenInput) {
  await userSession.deleteOne({
    user_id: input.userId,
    token: input.token,
  });
}

export async function getToken(input: { id: string }) {
   console.log("token......",input.id)
  const token = await userSession.findOne({
    id: input.id,
  });
   console.log("token......",token)
  return token;
}

export const tokenService = {
 
  createToken,
  deleteToken
};

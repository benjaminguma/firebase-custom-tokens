import { NextApiRequest, NextApiResponse } from "next";
import * as admin from "firebase-admin";
import serviceAccount from "../../credentials.json";
import { FirebaseError } from "firebase/app";

function getApp() {
  let app;

  try {
    app = admin.initializeApp(
      {
        credential: admin.credential.cert(
          serviceAccount as admin.ServiceAccount
        )
      },
      "my-app"
    );
  } catch (error) {
    app = admin.app("my-app");
  }

  return app;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const auth = getApp().auth();
  type SignUpData = {
    email: string;
    password: string;
  };
  const body = req.body as SignUpData;
  try {
    const user = await auth.createUser(body);

    const token = await auth.createCustomToken(user.uid, {
      isAdmin: true
    });
    res.send({ token });
  } catch (error) {
    if (error instanceof FirebaseError)
      res.status(400).json({ message: error.message });
  }
};

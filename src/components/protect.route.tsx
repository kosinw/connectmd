import nookies from "nookies";
import { GetServerSidePropsContext } from "next";
import { admin } from "libs/firebase.admin";

export const redirectNoAuth = async (
  context: GetServerSidePropsContext,
  url: string = "/"
) => {
  try {
    const { authToken } = nookies.get(context);

    const { res } = context;

    const goodToken = await admin.auth().verifyIdToken(authToken, true);

    if (!!goodToken) {
      res.writeHead(301, {
        Location: url,
      });

      res.end();
    }
  } catch (err) {}
};

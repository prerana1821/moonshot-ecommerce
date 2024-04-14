import Head from "next/head";
import InterestMarker from "~/components/Category/InterestMarker";

import { api } from "~/utils/api";
import useGetUserCookie from "~/hooks/useGetUserCookie";

export default function Home() {
  const user = useGetUserCookie();

  const { data: interests } = api.category.getAll.useQuery({
    email: user.email,
  });

  return (
    <>
      <Head>
        <title>Ecommerce</title>
        <meta name="description" content="Ecommerce App for roc8 moonshot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="my-10 flex flex-col items-center justify-center">
        <InterestMarker data={interests || []} email={user.email} />
      </main>
    </>
  );
}

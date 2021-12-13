import { getProviders, signIn as SignIntoProvider } from "next-auth/react";
import Header from "../../components/Header";

function SignIn({ providers }) {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center px-14 py-2 mt-28 justify-center max-h-screen">
        <img className="w-80" src="/normal-header-logo.png" alt="" />
        <p className="font-xs italic">
          This is not a <span className="font-semibold">real app</span>, it is
          build for educational purposes only
        </p>
        <div className="mt-28">
          {Object.values(providers).map((provider) => {
            return (
              <div key={provider.name}>
                <button
                  className="p-3 bg-blue-500 rounded-lg text-white"
                  onClick={() =>
                    SignIntoProvider(provider.id, {
                      callbackUrl: "/",
                    })
                  }
                >
                  Sign in with {provider.name}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default SignIn;

import Nav from "@/components/nav";
import React, { useContext, useEffect, useState } from "react";
import { checkHost, getConfig } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Send } from "lucide-react";
import { UserContext } from "@/lib/user-context";
import { useRouter } from "next/router";
import { magic } from "@/lib/magic";
import { toast } from "@/components/ui/use-toast";

export default function Login({ config }: { config: any }) {
  const [isSent, setIsSent] = useState(false);
  const [user, setUser] = useContext(UserContext);
  const [email, setEmail] = useState("");

  const sendEmail = async () => {
    try {
      //@ts-ignore
      const didToken = await magic.auth.loginWithMagicLink({
        email,
      });

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${didToken}`,
        },
      });

      if (res.ok) {
        //@ts-ignore
        const userMetadata = await magic.user.getMetadata();
        const isAdmin = await checkHost(userMetadata.email);

        if (isAdmin) {
          setUser(userMetadata);
          localStorage.setItem("isHost", String(true));
          push("/");
        } else {
          toast({
            title: "Invalid user, please try again",
          });
          //@ts-ignore
          magic.user.logout().then(() => {
            //@ts-ignore
            setUser({ user: null });
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { push } = useRouter();

  useEffect(() => {
    user?.issuer && push("/");
  }, [user]);

  return (
    <div className="w-full ">
      <Nav config={config.fields} />
      <div className="flex items-center justify-center mt-20 flex-col">
        <h3 className="text-white text-3xl font-semibold">
          Sign in with email
        </h3>
        <p className="mt-4 text-gray-400/40">
          {isSent
            ? "An email with a magic link is sent to your email, please check your inbox"
            : "Please enter your email address to receive a magic link to sign in"}
        </p>
        {!isSent && (
          <div className="mt-8 w-[22rem] flex items-center ">
            <Input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="h-12 rounded-xl text-white"
            />
            <Button
              size={"icon"}
              onClick={sendEmail}
              variant={"secondary"}
              className="h-9 w-10 rounded-xl items-center flex justify-center bg-primary  ml-2 bg-opacity-80"
            >
              <Send className="w-5 h-5 mt-1 " />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const config = await getConfig(false);

  return {
    props: { config: config[0] },
  };
}

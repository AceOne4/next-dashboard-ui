import PusherServer from "pusher";
import Pusher from "pusher-js";

// Server-side Pusher instance (used in API routes, etc.)
export const pusherServer = new PusherServer({
  appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID as string,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY as string, // Use the Pusher key, not the secret
  secret: process.env.NEXT_PUBLIC_PUSHER_SECRET as string, // Only for server-side
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
  useTLS: true, // Ensure TLS for secure connections
});

// Client-side Pusher instance (used in React components)
export const pusherClient = new Pusher(
  process.env.NEXT_PUBLIC_PUSHER_KEY as string, // Use the key, not the secret
  {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
  }
);

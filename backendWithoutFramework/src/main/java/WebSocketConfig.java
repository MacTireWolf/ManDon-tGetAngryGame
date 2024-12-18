import org.glassfish.tyrus.server.Server;

public class WebSocketConfig {

    public static void main(String[] args) {
        Server server = new Server("localhost", 8081, "/", null, ChatServer.class);

        try {
            server.start();
            System.out.println("WebSocket server started at ws://localhost:8081/chat");

            synchronized (WebSocketConfig.class) {
                WebSocketConfig.class.wait();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

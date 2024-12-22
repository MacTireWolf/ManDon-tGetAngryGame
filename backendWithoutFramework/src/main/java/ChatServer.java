import com.google.gson.Gson;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

@ServerEndpoint("/chat")
public class ChatServer {
    private static final Set<Session> sessions = new CopyOnWriteArraySet<>();
    private static final Gson gson = new Gson();

    @OnOpen
    public void onOpen(Session session) {
        sessions.add(session);
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        try {
            Thread textLogger = new Thread(new Logger(message));
            textLogger.start();
            ChatMessage chatMessage = gson.fromJson(message, ChatMessage.class);
            for (Session s : sessions) {
                if(s != session){
                    s.getBasicRemote().sendText(gson.toJson(chatMessage));
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @OnClose
    public void onClose(Session session) {
        sessions.remove(session);
    }

}

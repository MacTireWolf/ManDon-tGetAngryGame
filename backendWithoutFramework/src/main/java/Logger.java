import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.RandomAccessFile;
import java.nio.channels.FileChannel;
import java.nio.channels.FileLock;
import java.time.LocalDate;

public class Logger implements Runnable {
    private String log;
    private String fileName = "logs.txt";

    public Logger(String log) {
        this.log = log;
    }

    @Override
    public void run() {
        try (RandomAccessFile file = new RandomAccessFile(fileName, "rw");
             FileChannel channel = file.getChannel();
             BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(fileName, true))) {

            FileLock lock = channel.lock();
            try {
                bufferedWriter.newLine();
                bufferedWriter.write(String.valueOf(LocalDate.now()));
                bufferedWriter.newLine();
                bufferedWriter.write(log);
            } finally {
                lock.release();
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }
}

import java.util.LinkedList;
import java.util.List;
import java.util.Locale;

public class Test {
    public static String format(String str) {
        String temp = new String();
        str.trim();
        for (int i = 0; i < str.length(); i++) {
            if (i == 0 || (i != 0 && str.charAt(i - 1) == ' ')) {
                temp += str.toUpperCase().charAt(i);
            } else {
                temp += str.toLowerCase().charAt(i);
            }
        }
        return temp;
    }

    public static void main(String[] args) {
        System.out.println(format("abc HHH abc"));
    }
}

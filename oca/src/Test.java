public class Test {
    public static String sort(String str) {
        char charArray[] = str.toCharArray();
        for (int i = 0; i < charArray.length - 1; i++) {
            for (int j = i + 1; j < charArray.length; j++) {
                if (charArray[i] > charArray[j]) {
                    char temp = charArray[i];
                    charArray[i] = charArray[j];
                    charArray[j] = temp;
                }
            }
        }
        return new String(charArray);
    }

    public static void main(String[] args) {
        String str = "aghssyujh";
        str = sort(str);
        System.out.println(str);
    }
}

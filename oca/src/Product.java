public class Product {
    public static void main(String[] args) {
        System.out.println(abc(4));
    }

    public static int abc(int a) {
        switch (a) {
            case 0:
                return 4;
            case 1:
                return 7;
            case 2:
                return 5;
            default: {
                int f0 = 4;
                int f1 = 7;
                int f2 = 5;
                int n = 2;
                int result = 0;
                while (n < a) {
                    result = f0 + f1 + f2;
                    f0 = f1;
                    f1 = f2;
                    f2 = result;
                    n++;
                }
                return result;
            }
        }

    }
}

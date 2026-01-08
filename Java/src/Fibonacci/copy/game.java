package Fibonacci.copy;

import java.util.Scanner;

public class game {

	public static void main(String[] args) {
		Scanner Scanner = new Scanner(System.in);
		System.out.print("Length?: ");
		long  len = Scanner.nextLong();
		boolean first = true;
		String ans = "0,1";
		long last = 1;
		long last2 = 0;
		long num;
		for(long i = 1; i<len-2; i++) {
			num = last+last2;
			ans += "," + num;
			last2 = last;
			last = num;
		}
		System.out.println(ans);
		Scanner.close();
	}

}